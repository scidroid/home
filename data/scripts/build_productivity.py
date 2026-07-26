#!/usr/bin/env python3
"""Rebuild data/productivity.ts, the dataset behind the quadrant chart.

Run:  python3 data/scripts/build_productivity.py

Every download is cached under data/scripts/.cache so a rerun is offline and
fast. Delete that folder to refresh from source.

What the chart needs, and why each piece comes from where it does:

  hours   Nobody publishes a median of working hours. The ILO does publish the
          distribution of employment across bands of hours actually worked, so
          the median is computed from it by interpolating inside the band that
          crosses the halfway point. A mean would not do: part-time work drags
          it down, and part-time work is common in rich countries and rare in
          poor ones, so a mean flatters exactly the countries the chart asks
          about.

  income  Countries survey on their own schedules, so each one's latest reading
          would put a 1992 income next to 2024 hours. Instead this uses the
          World Bank's lineup estimate for REFERENCE_YEAR: every country carried
          to one year with growth from its national accounts.

  gini    From the country's own latest survey, because the shape of a
          distribution cannot be projected forward the way its level can.

Only income carries a recency rule. Hours are structurally persistent: tested
across every pair of years a country reports, a median taken 6 to 8 years
earlier predicts the later one to within about half an hour, so the newest
reading is used whatever year it is from.
"""

import csv
import json
import math
import pathlib
import statistics
import urllib.request

REFERENCE_YEAR = 2024
# How far the lineup estimate may reach from a real survey. Loose on purpose:
# poor countries survey far less often, so a tight cut deletes them. At 3 years
# it keeps 88% of high income countries and 57% of low income ones; at 8 every
# bracket is fully represented.
INCOME_SURVEY_MAX_AGE = 8

# US CPI-U annual averages, BLS. October 2025 was never published because of
# that year's lapse in appropriations, so it is interpolated between September
# and November; using the 11 published months instead moves the factor by 0.065%.
CPI_2021 = 270.970
CPI_2025 = 322.153
TO_2025 = CPI_2025 / CPI_2021

ROOT = pathlib.Path(__file__).resolve().parents[2]
CACHE = ROOT / "data" / "scripts" / ".cache"
OUT = ROOT / "data" / "productivity.ts"

SOURCES = {
    "ilo_hours_bands": (
        "https://sdmx.ilo.org/rest/data/ILO,DF_EMP_TEMP_SEX_HOW_NB/all"
        "?format=csv&startPeriod=2015"
    ),
    "pip_lineup": (
        "https://api.worldbank.org/pip/v1/pip?country=all&year="
        f"{REFERENCE_YEAR}&povline=3.00&fill_gaps=true&format=json"
    ),
    "pip_surveys": (
        "https://api.worldbank.org/pip/v1/pip?country=all&year=all"
        "&povline=3.00&fill_gaps=false&format=json"
    ),
    "wb_countries": "https://api.worldbank.org/v2/country?format=json&per_page=400",
    "owid_regions": (
        "https://ourworldindata.org/grapher/economic-inequality-gini-index.csv"
        "?csvType=full&useColumnShortNames=true"
    ),
}

# Bands of weekly hours actually worked, as [lower, upper). The top band is open
# ended; 70 is the assumed ceiling, and it only matters when the median lands
# inside it, which it never does in this data.
BANDS = [
    ("HOW_BANDS_H00", 0, 1),
    ("HOW_BANDS_H01-14", 1, 15),
    ("HOW_BANDS_H15-29", 15, 30),
    ("HOW_BANDS_H30-34", 30, 35),
    ("HOW_BANDS_H35-39", 35, 40),
    ("HOW_BANDS_H40-48", 40, 49),
    ("HOW_BANDS_HGE49", 49, 70),
]
# The zero hours band is sometimes absent and is then taken as zero. Every other
# band must be present or the distribution is not complete enough to cut.
REQUIRED = {code for code, _, _ in BANDS if code != "HOW_BANDS_H00"}

SHORT_NAMES = {
    "United States": "USA",
    "United Kingdom": "UK",
    "United Arab Emirates": "UAE",
    "Democratic Republic of Congo": "DR Congo",
    "Bosnia and Herzegovina": "Bosnia",
    "Dominican Republic": "Dominican Rep.",
    "Central African Republic": "CAR",
    "Trinidad and Tobago": "Trinidad",
    "Sao Tome and Principe": "Sao Tome",
    "Papua New Guinea": "Papua N.G.",
    "Solomon Islands": "Solomon Is.",
    "Marshall Islands": "Marshall Is.",
    "Saint Lucia": "St. Lucia",
    "Micronesia (country)": "Micronesia",
}
INCOME_GROUP = {"LIC": "low", "LMC": "lowermid", "UMC": "uppermid", "HIC": "high"}
HIGHLIGHT = {"COL", "MEX", "USA", "DEU", "IND", "ZAF"}


def fetch(name: str) -> pathlib.Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    url = SOURCES[name]
    path = CACHE / (name + (".csv" if "csv" in url else ".json"))
    if not path.exists():
        print(f"  fetching {name} ...")
        req = urllib.request.Request(url, headers={"User-Agent": "almanza.cc/data"})
        with urllib.request.urlopen(req, timeout=300) as r:
            path.write_bytes(r.read())
    return path


def median_weekly_hours() -> dict[str, dict]:
    """Latest median hours actually worked per week, per country."""
    rows: dict[tuple[str, int], dict[str, float]] = {}
    with fetch("ilo_hours_bands").open() as f:
        for r in csv.DictReader(f):
            # Both sexes, annual only, and only the banded series.
            if r["SEX"] != "SEX_T" or r["FREQ"] != "A":
                continue
            if not r["HOW"].startswith("HOW_BANDS_H"):
                continue
            try:
                value, year = float(r["OBS_VALUE"]), int(r["TIME_PERIOD"])
            except ValueError:
                continue
            rows.setdefault((r["REF_AREA"], year), {})[r["HOW"]] = value

    latest: dict[str, dict] = {}
    for (iso, year), bands in sorted(rows.items()):
        if not REQUIRED <= set(bands):
            continue
        total = sum(bands.get(code, 0.0) for code, _, _ in BANDS)
        if total <= 0:
            continue
        cumulative = 0.0
        median = None
        for code, low, high in BANDS:
            share = bands.get(code, 0.0) / total
            if cumulative + share >= 0.5:
                median = low if share == 0 else low + (0.5 - cumulative) / share * (high - low)
                break
            cumulative += share
        if median is None:
            continue
        if iso not in latest or year > latest[iso]["year"]:
            latest[iso] = {"year": year, "hours": round(median, 1)}
    return latest


def quantile(values: list[float], p: float) -> float:
    ordered = sorted(values)
    k = (len(ordered) - 1) * p
    low, high = math.floor(k), math.ceil(k)
    if low == high:
        return ordered[low]
    return ordered[low] + (ordered[high] - ordered[low]) * (k - low)


def median(values: list[float]) -> float:
    ordered = sorted(values)
    n = len(ordered)
    if n % 2:
        return ordered[n // 2]
    return round((ordered[n // 2 - 1] + ordered[n // 2]) / 2, 2)


def main() -> None:
    print("building data/productivity.ts")
    hours = median_weekly_hours()
    print(f"  {len(hours)} countries with a computable median of hours")

    lineup = {
        r["country_code"]: r
        for r in json.loads(fetch("pip_lineup").read_text())
        if r.get("reporting_level") == "national"
    }
    surveys: dict[str, dict] = {}
    for r in json.loads(fetch("pip_surveys").read_text()):
        if r.get("reporting_level") != "national" or r.get("gini") is None:
            continue
        iso, year = r["country_code"], r.get("reporting_year")
        if year and (iso not in surveys or year > surveys[iso]["reporting_year"]):
            surveys[iso] = r

    wb = json.loads(fetch("wb_countries").read_text())[1]
    iso2 = {c["id"]: c["iso2Code"] for c in wb if len(c.get("iso2Code") or "") == 2}
    groups = {
        c["id"]: INCOME_GROUP[c["incomeLevel"]["id"]]
        for c in wb
        if c["incomeLevel"]["id"] in INCOME_GROUP
    }

    names: dict[str, str] = {}
    regions: dict[str, str] = {}
    with fetch("owid_regions").open() as f:
        for r in csv.DictReader(f):
            if r.get("code") and r.get("owid_region"):
                names[r["code"]] = r["entity"]
                regions[r["code"]] = r["owid_region"]

    rows = []
    for iso, h in hours.items():
        estimate, survey = lineup.get(iso), surveys.get(iso)
        if not estimate or not survey or estimate.get("median") is None:
            continue
        if iso not in iso2 or iso not in groups or iso not in regions:
            continue
        if REFERENCE_YEAR - survey["reporting_year"] > INCOME_SURVEY_MAX_AGE:
            continue
        name = names[iso]
        rows.append(
            {
                "iso": iso,
                "iso2": iso2[iso],
                "group": groups[iso],
                "name": SHORT_NAMES.get(name, name),
                "income": round(estimate["median"] * TO_2025, 2),
                "hours": h["hours"],
                "gini": round(survey["gini"], 3),
                "region": regions[iso],
                "surveyYear": survey["reporting_year"],
                "hoursYear": h["year"],
                "modelled": estimate.get("estimate_type") != "actual",
            }
        )
    rows.sort(key=lambda r: r["name"])
    print(f"  {len(rows)} countries clear every requirement")

    median_income = median([r["income"] for r in rows])
    median_hours = median([r["hours"] for r in rows])
    print(f"  crosshair: {median_hours} hrs, ${median_income} a day")

    write(rows, median_income, median_hours, len(hours))
    print(f"  wrote {OUT.relative_to(ROOT)}")
    print("  now run: bunx prettier --write data/productivity.ts")


def write(
    rows: list[dict],
    median_income: float,
    median_hours: float,
    hours_universe: int,
) -> None:
    entries = []
    for r in rows:
        lines = [
            f'    iso: "{r["iso"]}"',
            f'    iso2: "{r["iso2"]}"',
            f'    group: "{r["group"]}"',
            f'    name: "{r["name"]}"',
            f'    income: {r["income"]}',
            f'    hours: {r["hours"]}',
            f'    gini: {r["gini"]}',
            f'    region: "{r["region"]}"',
            f'    surveyYear: {r["surveyYear"]}',
            f'    hoursYear: {r["hoursYear"]}',
        ]
        if r["modelled"]:
            lines.append("    modelled: true")
        if r["iso"] in HIGHLIGHT:
            lines.append("    highlight: true")
        entries.append("  {\n" + ",\n".join(lines) + "\n  }")

    # Token replacement rather than str.format, because the header carries a
    # TypeScript type declaration and its braces would be read as fields.
    header = pathlib.Path(__file__).with_name("productivity_header.txt").read_text()
    for token, value in {
        "REFERENCE_YEAR": REFERENCE_YEAR,
        "MAX_AGE": INCOME_SURVEY_MAX_AGE,
        "FACTOR": round(TO_2025, 5),
        "CPI_2021": CPI_2021,
        "CPI_2025": CPI_2025,
        "COUNT": len(rows),
        "HOURS_UNIVERSE": hours_universe,
    }.items():
        header = header.replace("{{" + token + "}}", str(value))
    OUT.write_text(
        header
        + "export const countries: Country[] = [\n"
        + ",\n".join(entries)
        + "\n];\n\n"
        + "// The crosshair is the middle country on each axis, so half the dots fall on\n"
        + f"// either side of each line. Both are medians of these {len(rows)} countries, not\n"
        + "// population-weighted world figures.\n"
        + f"export const MEDIAN_INCOME = {median_income};\n"
        + f"export const MEDIAN_HOURS = {median_hours};\n"
        + pathlib.Path(__file__).with_name("productivity_footer.txt").read_text()
    )


if __name__ == "__main__":
    main()
