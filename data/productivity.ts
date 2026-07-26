// Two medians, at one moment, in one currency. Getting there takes three
// corrections, and each one exists because the raw data would otherwise say
// something false.
//
// MEDIAN, NOT MEAN. A mean wage is pulled up by a few very large salaries, and
// a mean of hours is pulled DOWN by part-time work, which is common in rich
// countries and rare in poor ones. A mean on either axis would flatter exactly
// the countries this chart is asking about.
//
// ONE YEAR, NOT WHENEVER. Countries survey on their own schedules, so pairing
// each country's latest readings put a 1992 income next to 2024 hours. Income
// is instead the World Bank's lineup estimate for 2024: every country carried
// to the same reference year with national accounts growth. `modelled` marks
// the ones that are a projection rather than a survey year.
//
// ONE CURRENCY. The source publishes 2021 international dollars, already
// deflated by each country's own inflation and converted at purchasing power
// parity. Every figure here is carried on to 2025 prices with US inflation,
// x1.18889, so this chart and the pachinko above are in the same money. The
// PPP basket is still the 2021 one; only the price level moves. US CPI-U annual
// average 270.97 (2021) to 322.153 (2025), BLS. October 2025 was never
// published, because of that year's lapse in appropriations, so it is
// interpolated between September and November; leaving it out moves the factor
// by 0.065%.
//
//   income      median income or consumption per day, 2024, 2025 prices
//   hours       median hours actually worked in a week, from the ILO banded
//               distribution of employment by hours
//   gini        income inequality, 0 to 1, from the latest actual survey,
//               because a distribution's shape cannot be projected the way a
//               level can
//
// Only income carries a recency rule: the survey behind its 2024 estimate has
// to be within 8 years. Income grows, so an old reading really is a different
// number, and the further the lineup reaches the more of the value is
// projection rather than measurement.
//
// Hours carry no such rule, and that is a measured decision rather than a
// lenient one. Median weekly hours barely move. Tested every country against
// itself across every pair of years it reports, a median taken 6 to 8 years
// earlier predicts the later one to within 0.54 hours, half of them inside
// that, 90% inside 2.0. Two attempts to do better both made it worse: scaling
// the ILO modelled mean by each country's own median-to-mean ratio inherits a
// level offset between the two series, which is 3.8 hours for Germany alone,
// and carrying a country's median forward on the modelled series as a time
// index lost to simply leaving it alone at every gap length we could test.
// Hours are a structural fact about a country, so the newest reading is used
// whatever year it comes from, and the card names that year.
//
// The 8 year rule on income has to be loose. Poor countries survey far less
// often, so a strict cut quietly deletes them: at 3 years it keeps 88% of high
// income countries and 57% of low income ones. Deleting the poor from a chart
// about poverty is a worse error than an old reading. At 8 years every income
// bracket is fully represented. 129 of the 166 countries with a
// computable median of hours also have an income estimate that recent.
import type { IncomeGroup } from "@/data/income-brackets";

export type Country = {
  iso: string;
  iso2: string; // ISO 3166-1 alpha-2, which the flag file name is built from
  group: IncomeGroup;
  name: string;
  income: number;
  hours: number;
  gini: number;
  region: string;
  surveyYear: number; // the survey the 2024 income estimate rests on
  hoursYear: number;
  modelled?: boolean; // income projected to 2024 rather than surveyed in it
  highlight?: boolean;
};

export const REFERENCE_YEAR = 2024;

export const countries: Country[] = [
  {
    iso: "ALB",
    iso2: "AL",
    group: "uppermid",
    name: "Albania",
    income: 17.92,
    hours: 44.1,
    gini: 0.294,
    region: "Europe",
    surveyYear: 2020,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "AGO",
    iso2: "AO",
    group: "lowermid",
    name: "Angola",
    income: 4.27,
    hours: 44.3,
    gini: 0.513,
    region: "Africa",
    surveyYear: 2018,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ARM",
    iso2: "AM",
    group: "uppermid",
    name: "Armenia",
    income: 10.16,
    hours: 43.2,
    gini: 0.274,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2018
  },
  {
    iso: "AUS",
    iso2: "AU",
    group: "high",
    name: "Australia",
    income: 75.48,
    hours: 36.4,
    gini: 0.338,
    region: "Oceania",
    surveyYear: 2020,
    hoursYear: 2015,
    modelled: true
  },
  {
    iso: "AUT",
    iso2: "AT",
    group: "high",
    name: "Austria",
    income: 83.94,
    hours: 34.9,
    gini: 0.312,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "BGD",
    iso2: "BD",
    group: "lowermid",
    name: "Bangladesh",
    income: 7.7,
    hours: 47.6,
    gini: 0.309,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "BLR",
    iso2: "BY",
    group: "uppermid",
    name: "Belarus",
    income: 26.38,
    hours: 43.6,
    gini: 0.244,
    region: "Europe",
    surveyYear: 2020,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "BEL",
    iso2: "BE",
    group: "high",
    name: "Belgium",
    income: 75.06,
    hours: 35.5,
    gini: 0.268,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "BLZ",
    iso2: "BZ",
    group: "uppermid",
    name: "Belize",
    income: 19.14,
    hours: 42.9,
    gini: 0.4,
    region: "North America",
    surveyYear: 2018,
    hoursYear: 2019,
    modelled: true
  },
  {
    iso: "BTN",
    iso2: "BT",
    group: "lowermid",
    name: "Bhutan",
    income: 20.64,
    hours: 52.9,
    gini: 0.284,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2022,
    modelled: true
  },
  {
    iso: "BOL",
    iso2: "BO",
    group: "lowermid",
    name: "Bolivia",
    income: 20.0,
    hours: 41.3,
    gini: 0.409,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2024
  },
  {
    iso: "BIH",
    iso2: "BA",
    group: "uppermid",
    name: "Bosnia",
    income: 21.0,
    hours: 44.5,
    gini: 0.303,
    region: "Europe",
    surveyYear: 2021,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "BRA",
    iso2: "BR",
    group: "uppermid",
    name: "Brazil",
    income: 20.1,
    hours: 43.1,
    gini: 0.503,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "BGR",
    iso2: "BG",
    group: "high",
    name: "Bulgaria",
    income: 37.69,
    hours: 43.7,
    gini: 0.395,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "BFA",
    iso2: "BF",
    group: "low",
    name: "Burkina Faso",
    income: 4.09,
    hours: 46.7,
    gini: 0.374,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "CAN",
    iso2: "CA",
    group: "high",
    name: "Canada",
    income: 75.02,
    hours: 37.3,
    gini: 0.315,
    region: "North America",
    surveyYear: 2022,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "CHL",
    iso2: "CL",
    group: "high",
    name: "Chile",
    income: 29.21,
    hours: 42.5,
    gini: 0.43,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "COL",
    iso2: "CO",
    group: "uppermid",
    name: "Colombia",
    income: 13.41,
    hours: 44.1,
    gini: 0.544,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025,
    highlight: true
  },
  {
    iso: "COM",
    iso2: "KM",
    group: "lowermid",
    name: "Comoros",
    income: 7.7,
    hours: 38.2,
    gini: 0.303,
    region: "Africa",
    surveyYear: 2024,
    hoursYear: 2021
  },
  {
    iso: "CRI",
    iso2: "CR",
    group: "high",
    name: "Costa Rica",
    income: 24.86,
    hours: 44.0,
    gini: 0.455,
    region: "North America",
    surveyYear: 2025,
    hoursYear: 2025
  },
  {
    iso: "CIV",
    iso2: "CI",
    group: "lowermid",
    name: "Cote d'Ivoire",
    income: 5.99,
    hours: 43.2,
    gini: 0.353,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2019,
    modelled: true
  },
  {
    iso: "HRV",
    iso2: "HR",
    group: "high",
    name: "Croatia",
    income: 46.22,
    hours: 39.9,
    gini: 0.301,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "CYP",
    iso2: "CY",
    group: "high",
    name: "Cyprus",
    income: 63.44,
    hours: 39.9,
    gini: 0.318,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "CZE",
    iso2: "CZ",
    group: "high",
    name: "Czechia",
    income: 46.84,
    hours: 41.5,
    gini: 0.257,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "COD",
    iso2: "CD",
    group: "low",
    name: "DR Congo",
    income: 1.76,
    hours: 36.7,
    gini: 0.447,
    region: "Africa",
    surveyYear: 2020,
    hoursYear: 2020,
    modelled: true
  },
  {
    iso: "DNK",
    iso2: "DK",
    group: "high",
    name: "Denmark",
    income: 74.33,
    hours: 35.4,
    gini: 0.299,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "DJI",
    iso2: "DJ",
    group: "lowermid",
    name: "Djibouti",
    income: 6.61,
    hours: 44.7,
    gini: 0.416,
    region: "Africa",
    surveyYear: 2017,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "DOM",
    iso2: "DO",
    group: "uppermid",
    name: "Dominican Rep.",
    income: 20.78,
    hours: 42.8,
    gini: 0.39,
    region: "North America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "ECU",
    iso2: "EC",
    group: "uppermid",
    name: "Ecuador",
    income: 14.38,
    hours: 40.7,
    gini: 0.459,
    region: "South America",
    surveyYear: 2025,
    hoursYear: 2025
  },
  {
    iso: "EGY",
    iso2: "EG",
    group: "lowermid",
    name: "Egypt",
    income: 9.21,
    hours: 45.6,
    gini: 0.285,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "SLV",
    iso2: "SV",
    group: "uppermid",
    name: "El Salvador",
    income: 14.51,
    hours: 44.5,
    gini: 0.398,
    region: "North America",
    surveyYear: 2023,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "EST",
    iso2: "EE",
    group: "high",
    name: "Estonia",
    income: 43.32,
    hours: 41.6,
    gini: 0.307,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "SWZ",
    iso2: "SZ",
    group: "lowermid",
    name: "Eswatini",
    income: 4.3,
    hours: 44.2,
    gini: 0.546,
    region: "Africa",
    surveyYear: 2016,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "ETH",
    iso2: "ET",
    group: "low",
    name: "Ethiopia",
    income: 4.53,
    hours: 28.7,
    gini: 0.311,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "FJI",
    iso2: "FJ",
    group: "uppermid",
    name: "Fiji",
    income: 8.99,
    hours: 41.9,
    gini: 0.307,
    region: "Oceania",
    surveyYear: 2019,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "FIN",
    iso2: "FI",
    group: "high",
    name: "Finland",
    income: 66.99,
    hours: 35.2,
    gini: 0.274,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "FRA",
    iso2: "FR",
    group: "high",
    name: "France",
    income: 68.65,
    hours: 36.5,
    gini: 0.318,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "GAB",
    iso2: "GA",
    group: "uppermid",
    name: "Gabon",
    income: 12.19,
    hours: 45.6,
    gini: 0.38,
    region: "Africa",
    surveyYear: 2017,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "GMB",
    iso2: "GM",
    group: "low",
    name: "Gambia",
    income: 6.29,
    hours: 39.6,
    gini: 0.388,
    region: "Africa",
    surveyYear: 2020,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "GEO",
    iso2: "GE",
    group: "uppermid",
    name: "Georgia",
    income: 10.43,
    hours: 43.2,
    gini: 0.339,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2024
  },
  {
    iso: "DEU",
    iso2: "DE",
    group: "high",
    name: "Germany",
    income: 75.15,
    hours: 36.5,
    gini: 0.337,
    region: "Europe",
    surveyYear: 2022,
    hoursYear: 2025,
    modelled: true,
    highlight: true
  },
  {
    iso: "GHA",
    iso2: "GH",
    group: "lowermid",
    name: "Ghana",
    income: 5.01,
    hours: 35.0,
    gini: 0.435,
    region: "Africa",
    surveyYear: 2016,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "GRC",
    iso2: "GR",
    group: "high",
    name: "Greece",
    income: 35.1,
    hours: 43.4,
    gini: 0.334,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "GRD",
    iso2: "GD",
    group: "uppermid",
    name: "Grenada",
    income: 17.13,
    hours: 44.1,
    gini: 0.438,
    region: "North America",
    surveyYear: 2018,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "GTM",
    iso2: "GT",
    group: "uppermid",
    name: "Guatemala",
    income: 10.79,
    hours: 43.3,
    gini: 0.452,
    region: "North America",
    surveyYear: 2023,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "GNB",
    iso2: "GW",
    group: "low",
    name: "Guinea-Bissau",
    income: 4.28,
    hours: 44.3,
    gini: 0.334,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2018,
    modelled: true
  },
  {
    iso: "HND",
    iso2: "HN",
    group: "lowermid",
    name: "Honduras",
    income: 9.93,
    hours: 43.5,
    gini: 0.457,
    region: "North America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "HUN",
    iso2: "HU",
    group: "high",
    name: "Hungary",
    income: 32.22,
    hours: 42.7,
    gini: 0.306,
    region: "Europe",
    surveyYear: 2017,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ISL",
    iso2: "IS",
    group: "high",
    name: "Iceland",
    income: 75.07,
    hours: 35.3,
    gini: 0.268,
    region: "Europe",
    surveyYear: 2019,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "IND",
    iso2: "IN",
    group: "lowermid",
    name: "India",
    income: 7.02,
    hours: 48.4,
    gini: 0.255,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2025,
    modelled: true,
    highlight: true
  },
  {
    iso: "IDN",
    iso2: "ID",
    group: "uppermid",
    name: "Indonesia",
    income: 7.54,
    hours: 40.6,
    gini: 0.344,
    region: "Asia",
    surveyYear: 2025,
    hoursYear: 2023
  },
  {
    iso: "IRN",
    iso2: "IR",
    group: "uppermid",
    name: "Iran",
    income: 12.24,
    hours: 46.0,
    gini: 0.359,
    region: "Asia",
    surveyYear: 2023,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "IRQ",
    iso2: "IQ",
    group: "uppermid",
    name: "Iraq",
    income: 12.62,
    hours: 30.6,
    gini: 0.298,
    region: "Asia",
    surveyYear: 2023,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "IRL",
    iso2: "IE",
    group: "high",
    name: "Ireland",
    income: 60.62,
    hours: 36.1,
    gini: 0.29,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ISR",
    iso2: "IL",
    group: "high",
    name: "Israel",
    income: 42.83,
    hours: 41.7,
    gini: 0.383,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "ITA",
    iso2: "IT",
    group: "high",
    name: "Italy",
    income: 58.44,
    hours: 41.0,
    gini: 0.343,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "JAM",
    iso2: "JM",
    group: "uppermid",
    name: "Jamaica",
    income: 18.03,
    hours: 45.1,
    gini: 0.399,
    region: "North America",
    surveyYear: 2021,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "KAZ",
    iso2: "KZ",
    group: "uppermid",
    name: "Kazakhstan",
    income: 16.0,
    hours: 37.4,
    gini: 0.292,
    region: "Asia",
    surveyYear: 2021,
    hoursYear: 2022,
    modelled: true
  },
  {
    iso: "KEN",
    iso2: "KE",
    group: "lowermid",
    name: "Kenya",
    income: 3.93,
    hours: 40.1,
    gini: 0.385,
    region: "Africa",
    surveyYear: 2022,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "KIR",
    iso2: "KI",
    group: "lowermid",
    name: "Kiribati",
    income: 9.71,
    hours: 26.1,
    gini: 0.247,
    region: "Oceania",
    surveyYear: 2023,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "KGZ",
    iso2: "KG",
    group: "lowermid",
    name: "Kyrgyzstan",
    income: 8.15,
    hours: 43.7,
    gini: 0.276,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2023
  },
  {
    iso: "LAO",
    iso2: "LA",
    group: "lowermid",
    name: "Laos",
    income: 7.34,
    hours: 44.5,
    gini: 0.347,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2022
  },
  {
    iso: "LVA",
    iso2: "LV",
    group: "high",
    name: "Latvia",
    income: 39.52,
    hours: 43.3,
    gini: 0.34,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "LBN",
    iso2: "LB",
    group: "lowermid",
    name: "Lebanon",
    income: 9.21,
    hours: 46.3,
    gini: 0.355,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2019,
    modelled: true
  },
  {
    iso: "LSO",
    iso2: "LS",
    group: "lowermid",
    name: "Lesotho",
    income: 3.98,
    hours: 47.7,
    gini: 0.449,
    region: "Africa",
    surveyYear: 2017,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "LBR",
    iso2: "LR",
    group: "low",
    name: "Liberia",
    income: 4.59,
    hours: 47.1,
    gini: 0.353,
    region: "Africa",
    surveyYear: 2016,
    hoursYear: 2017,
    modelled: true
  },
  {
    iso: "LTU",
    iso2: "LT",
    group: "high",
    name: "Lithuania",
    income: 45.67,
    hours: 43.3,
    gini: 0.36,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "LUX",
    iso2: "LU",
    group: "high",
    name: "Luxembourg",
    income: 105.1,
    hours: 41.1,
    gini: 0.336,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "MDG",
    iso2: "MG",
    group: "low",
    name: "Madagascar",
    income: 2.73,
    hours: 35.3,
    gini: 0.368,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2022,
    modelled: true
  },
  {
    iso: "MWI",
    iso2: "MW",
    group: "low",
    name: "Malawi",
    income: 2.24,
    hours: 23.0,
    gini: 0.385,
    region: "Africa",
    surveyYear: 2019,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "MYS",
    iso2: "MY",
    group: "uppermid",
    name: "Malaysia",
    income: 39.66,
    hours: 44.4,
    gini: 0.407,
    region: "Asia",
    surveyYear: 2021,
    hoursYear: 2022,
    modelled: true
  },
  {
    iso: "MDV",
    iso2: "MV",
    group: "uppermid",
    name: "Maldives",
    income: 21.75,
    hours: 45.1,
    gini: 0.293,
    region: "Asia",
    surveyYear: 2019,
    hoursYear: 2019,
    modelled: true
  },
  {
    iso: "MLI",
    iso2: "ML",
    group: "low",
    name: "Mali",
    income: 4.48,
    hours: 42.6,
    gini: 0.356,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "MLT",
    iso2: "MT",
    group: "high",
    name: "Malta",
    income: 68.73,
    hours: 42.0,
    gini: 0.318,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "MHL",
    iso2: "MH",
    group: "uppermid",
    name: "Marshall Is.",
    income: 13.1,
    hours: 43.3,
    gini: 0.355,
    region: "Oceania",
    surveyYear: 2019,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "MRT",
    iso2: "MR",
    group: "lowermid",
    name: "Mauritania",
    income: 7.57,
    hours: 47.5,
    gini: 0.32,
    region: "Africa",
    surveyYear: 2019,
    hoursYear: 2019,
    modelled: true
  },
  {
    iso: "MUS",
    iso2: "MU",
    group: "uppermid",
    name: "Mauritius",
    income: 16.61,
    hours: 40.7,
    gini: 0.368,
    region: "Africa",
    surveyYear: 2017,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "MEX",
    iso2: "MX",
    group: "uppermid",
    name: "Mexico",
    income: 16.99,
    hours: 43.3,
    gini: 0.426,
    region: "North America",
    surveyYear: 2024,
    hoursYear: 2026,
    highlight: true
  },
  {
    iso: "MDA",
    iso2: "MD",
    group: "uppermid",
    name: "Moldova",
    income: 14.58,
    hours: 43.4,
    gini: 0.268,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "MNG",
    iso2: "MN",
    group: "uppermid",
    name: "Mongolia",
    income: 16.37,
    hours: 46.3,
    gini: 0.314,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "MNE",
    iso2: "ME",
    group: "uppermid",
    name: "Montenegro",
    income: 28.41,
    hours: 44.7,
    gini: 0.343,
    region: "Europe",
    surveyYear: 2021,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "MOZ",
    iso2: "MZ",
    group: "low",
    name: "Mozambique",
    income: 1.77,
    hours: 35.0,
    gini: 0.496,
    region: "Africa",
    surveyYear: 2022,
    hoursYear: 2022,
    modelled: true
  },
  {
    iso: "MMR",
    iso2: "MM",
    group: "lowermid",
    name: "Myanmar",
    income: 5.94,
    hours: 46.0,
    gini: 0.307,
    region: "Asia",
    surveyYear: 2017,
    hoursYear: 2020,
    modelled: true
  },
  {
    iso: "NPL",
    iso2: "NP",
    group: "lowermid",
    name: "Nepal",
    income: 9.9,
    hours: 42.9,
    gini: 0.3,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2017,
    modelled: true
  },
  {
    iso: "NLD",
    iso2: "NL",
    group: "high",
    name: "Netherlands",
    income: 86.55,
    hours: 30.1,
    gini: 0.257,
    region: "Europe",
    surveyYear: 2021,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "NER",
    iso2: "NE",
    group: "low",
    name: "Niger",
    income: 3.37,
    hours: 42.2,
    gini: 0.329,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2017,
    modelled: true
  },
  {
    iso: "NGA",
    iso2: "NG",
    group: "lowermid",
    name: "Nigeria",
    income: 4.09,
    hours: 34.8,
    gini: 0.339,
    region: "Africa",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "MKD",
    iso2: "MK",
    group: "uppermid",
    name: "North Macedonia",
    income: 21.77,
    hours: 43.5,
    gini: 0.335,
    region: "Europe",
    surveyYear: 2019,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "NOR",
    iso2: "NO",
    group: "high",
    name: "Norway",
    income: 93.49,
    hours: 34.1,
    gini: 0.265,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "PAK",
    iso2: "PK",
    group: "lowermid",
    name: "Pakistan",
    income: 5.15,
    hours: 46.1,
    gini: 0.335,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "PSE",
    iso2: "PS",
    group: "lowermid",
    name: "Palestine",
    income: 11.49,
    hours: 42.4,
    gini: 0.364,
    region: "Asia",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "PAN",
    iso2: "PA",
    group: "high",
    name: "Panama",
    income: 22.09,
    hours: 42.5,
    gini: 0.497,
    region: "North America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "PRY",
    iso2: "PY",
    group: "uppermid",
    name: "Paraguay",
    income: 17.74,
    hours: 43.3,
    gini: 0.443,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "PER",
    iso2: "PE",
    group: "uppermid",
    name: "Peru",
    income: 12.68,
    hours: 41.9,
    gini: 0.401,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "PHL",
    iso2: "PH",
    group: "uppermid",
    name: "Philippines",
    income: 6.97,
    hours: 42.8,
    gini: 0.352,
    region: "Asia",
    surveyYear: 2023,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "POL",
    iso2: "PL",
    group: "high",
    name: "Poland",
    income: 47.73,
    hours: 43.3,
    gini: 0.285,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "PRT",
    iso2: "PT",
    group: "high",
    name: "Portugal",
    income: 40.45,
    hours: 40.7,
    gini: 0.339,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "QAT",
    iso2: "QA",
    group: "high",
    name: "Qatar",
    income: 84.11,
    hours: 46.1,
    gini: 0.351,
    region: "Asia",
    surveyYear: 2017,
    hoursYear: 2020,
    modelled: true
  },
  {
    iso: "ROU",
    iso2: "RO",
    group: "high",
    name: "Romania",
    income: 37.54,
    hours: 43.5,
    gini: 0.298,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "RUS",
    iso2: "RU",
    group: "high",
    name: "Russia",
    income: 42.21,
    hours: 43.6,
    gini: 0.33,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "RWA",
    iso2: "RW",
    group: "low",
    name: "Rwanda",
    income: 4.22,
    hours: 27.1,
    gini: 0.394,
    region: "Africa",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "SEN",
    iso2: "SN",
    group: "lowermid",
    name: "Senegal",
    income: 6.23,
    hours: 46.5,
    gini: 0.362,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "SRB",
    iso2: "RS",
    group: "uppermid",
    name: "Serbia",
    income: 26.48,
    hours: 43.7,
    gini: 0.328,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "SYC",
    iso2: "SC",
    group: "high",
    name: "Seychelles",
    income: 25.1,
    hours: 41.7,
    gini: 0.321,
    region: "Africa",
    surveyYear: 2018,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "SLE",
    iso2: "SL",
    group: "low",
    name: "Sierra Leone",
    income: 4.32,
    hours: 42.1,
    gini: 0.357,
    region: "Africa",
    surveyYear: 2018,
    hoursYear: 2018,
    modelled: true
  },
  {
    iso: "SVK",
    iso2: "SK",
    group: "high",
    name: "Slovakia",
    income: 29.67,
    hours: 40.8,
    gini: 0.238,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "SVN",
    iso2: "SI",
    group: "high",
    name: "Slovenia",
    income: 59.36,
    hours: 42.7,
    gini: 0.247,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ZAF",
    iso2: "ZA",
    group: "uppermid",
    name: "South Africa",
    income: 7.77,
    hours: 44.4,
    gini: 0.54,
    region: "Africa",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true,
    highlight: true
  },
  {
    iso: "KOR",
    iso2: "KR",
    group: "high",
    name: "South Korea",
    income: 69.38,
    hours: 43.1,
    gini: 0.329,
    region: "Asia",
    surveyYear: 2021,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ESP",
    iso2: "ES",
    group: "high",
    name: "Spain",
    income: 57.59,
    hours: 39.6,
    gini: 0.334,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "LKA",
    iso2: "LK",
    group: "uppermid",
    name: "Sri Lanka",
    income: 9.01,
    hours: 44.3,
    gini: 0.377,
    region: "Asia",
    surveyYear: 2019,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "SWE",
    iso2: "SE",
    group: "high",
    name: "Sweden",
    income: 66.44,
    hours: 35.7,
    gini: 0.293,
    region: "Europe",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "CHE",
    iso2: "CH",
    group: "high",
    name: "Switzerland",
    income: 86.63,
    hours: 40.9,
    gini: 0.338,
    region: "Europe",
    surveyYear: 2022,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "TJK",
    iso2: "TJ",
    group: "lowermid",
    name: "Tajikistan",
    income: 9.05,
    hours: 43.7,
    gini: 0.361,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2016
  },
  {
    iso: "TZA",
    iso2: "TZ",
    group: "lowermid",
    name: "Tanzania",
    income: 3.75,
    hours: 39.7,
    gini: 0.405,
    region: "Africa",
    surveyYear: 2018,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "THA",
    iso2: "TH",
    group: "uppermid",
    name: "Thailand",
    income: 18.69,
    hours: 43.3,
    gini: 0.333,
    region: "Asia",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "TON",
    iso2: "TO",
    group: "uppermid",
    name: "Tonga",
    income: 14.23,
    hours: 36.0,
    gini: 0.271,
    region: "Oceania",
    surveyYear: 2021,
    hoursYear: 2023,
    modelled: true
  },
  {
    iso: "TUN",
    iso2: "TN",
    group: "lowermid",
    name: "Tunisia",
    income: 15.74,
    hours: 44.1,
    gini: 0.337,
    region: "Africa",
    surveyYear: 2021,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "TUR",
    iso2: "TR",
    group: "uppermid",
    name: "Turkey",
    income: 34.33,
    hours: 44.0,
    gini: 0.437,
    region: "Asia",
    surveyYear: 2023,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "ARE",
    iso2: "AE",
    group: "high",
    name: "UAE",
    income: 118.37,
    hours: 48.1,
    gini: 0.264,
    region: "Asia",
    surveyYear: 2018,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "GBR",
    iso2: "GB",
    group: "high",
    name: "UK",
    income: 66.86,
    hours: 36.9,
    gini: 0.324,
    region: "Europe",
    surveyYear: 2021,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "USA",
    iso2: "US",
    group: "high",
    name: "USA",
    income: 85.75,
    hours: 42.7,
    gini: 0.418,
    region: "North America",
    surveyYear: 2024,
    hoursYear: 2025,
    highlight: true
  },
  {
    iso: "UGA",
    iso2: "UG",
    group: "low",
    name: "Uganda",
    income: 3.23,
    hours: 40.8,
    gini: 0.427,
    region: "Africa",
    surveyYear: 2019,
    hoursYear: 2021,
    modelled: true
  },
  {
    iso: "UKR",
    iso2: "UA",
    group: "uppermid",
    name: "Ukraine",
    income: 16.2,
    hours: 43.7,
    gini: 0.256,
    region: "Europe",
    surveyYear: 2020,
    hoursYear: 2017,
    modelled: true
  },
  {
    iso: "URY",
    iso2: "UY",
    group: "high",
    name: "Uruguay",
    income: 31.91,
    hours: 39.6,
    gini: 0.4,
    region: "South America",
    surveyYear: 2024,
    hoursYear: 2025
  },
  {
    iso: "VUT",
    iso2: "VU",
    group: "lowermid",
    name: "Vanuatu",
    income: 5.79,
    hours: 22.2,
    gini: 0.323,
    region: "Oceania",
    surveyYear: 2019,
    hoursYear: 2025,
    modelled: true
  },
  {
    iso: "VNM",
    iso2: "VN",
    group: "uppermid",
    name: "Vietnam",
    income: 17.05,
    hours: 44.3,
    gini: 0.361,
    region: "Asia",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "ZMB",
    iso2: "ZM",
    group: "lowermid",
    name: "Zambia",
    income: 2.04,
    hours: 44.0,
    gini: 0.515,
    region: "Africa",
    surveyYear: 2022,
    hoursYear: 2024,
    modelled: true
  },
  {
    iso: "ZWE",
    iso2: "ZW",
    group: "lowermid",
    name: "Zimbabwe",
    income: 3.74,
    hours: 45.5,
    gini: 0.503,
    region: "Africa",
    surveyYear: 2019,
    hoursYear: 2024,
    modelled: true
  }
];

// The crosshair is the middle country on each axis, so half the dots fall on
// either side of each line. Both are medians of these 129 countries, not
// population-weighted world figures.
export const MEDIAN_INCOME = 16.61;
export const MEDIAN_HOURS = 42.9;

// For scale, in the same units and the same year: the world population median,
// the level half of humanity lives below. It sits well under the country
// median because the countries below the line hold most of the people.
export const WORLD_MEDIAN_INCOME = 10.99;

// A few countries sit so far along the hours axis that they stretch it until
// the rest are a smudge. Which ones count as far out is Tukey's rule, 1.5
// interquartile ranges past the quartiles, rather than a judgement by eye. The
// chart opens without them and says so in its count; nothing is deleted.
function fence(values: number[]) {
  const a = [...values].sort((x, y) => x - y);
  const at = (p: number) => {
    const k = (a.length - 1) * p;
    const lo = Math.floor(k);
    const hi = Math.ceil(k);
    return lo === hi ? a[lo] : a[lo] + (a[hi] - a[lo]) * (k - lo);
  };
  const q1 = at(0.25);
  const q3 = at(0.75);
  const iqr = q3 - q1;
  return { lo: q1 - 1.5 * iqr, hi: q3 + 1.5 * iqr };
}

// Income is fenced in log space, the scale it is read on, and nothing falls
// outside it: every outlier here is an hours outlier.
const HOURS_FENCE = fence(countries.map(d => d.hours));

export const isOutlier = (d: Country) =>
  d.hours < HOURS_FENCE.lo || d.hours > HOURS_FENCE.hi;

export const OUTLIERS = countries.filter(isOutlier);

// The window holding everything else, with room for the axis labels.
const kept = countries.filter(d => !isOutlier(d));
export const TRIMMED_HOURS = {
  lo: Math.floor(Math.min(...kept.map(d => d.hours))) - 1,
  hi: Math.ceil(Math.max(...kept.map(d => d.hours))) + 2
};
