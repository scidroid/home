// Every source the story leans on, in APA order (author, year, title,
// description). The figures cite these inline; the list at the end of the
// story is the full bibliography.

export type Reference = {
  id: string;
  author: string;
  short?: string; // label when the citation is named inline
  year: string;
  title: string;
  note?: string;
  href: string;
};

export const REFERENCES: Reference[] = [
  {
    id: "gapminder",
    author: "Gapminder",
    year: "n.d.",
    title: "Dollar Street",
    note: "Photographs, CC BY 4.0",
    href: "https://www.gapminder.org/dollar-street"
  },
  {
    id: "worldbank",
    author: "World Bank",
    year: "2026",
    title: "FY27 country income classification for analytical purposes",
    href: "https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099063026190549947"
  },
  {
    id: "owid",
    author: "Our World in Data",
    short: "OWID",
    year: "2025",
    title: "Population by income classification",
    note: "Data set",
    href: "https://ourworldindata.org/grapher/population-by-income-classification"
  },
  {
    id: "ppp-consumption",
    author: "World Bank",
    short: "PPP factors",
    year: "2025",
    title:
      "PPP conversion factor, private consumption (LCU per international $)",
    note: "Data set",
    href: "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP"
  },
  {
    id: "exchange-rate",
    author: "World Bank",
    short: "Exchange rates",
    year: "2025",
    title: "Official exchange rate (LCU per US$, period average)",
    note: "Data set",
    href: "https://data.worldbank.org/indicator/PA.NUS.FCRF"
  },
  {
    id: "us-cpi",
    author: "U.S. Bureau of Labor Statistics",
    short: "US CPI",
    year: "2026",
    title: "Consumer Price Index (CPI-U)",
    note: "Data set",
    href: "https://www.bls.gov/cpi/"
  },
  {
    id: "pip-median",
    author: "World Bank",
    short: "World Bank PIP",
    year: "2026",
    title: "Median income or consumption per day",
    note: "Poverty and Inequality Platform, data set, processed by Our World in Data",
    href: "https://ourworldindata.org/grapher/daily-median-income"
  },
  {
    id: "pip-gini",
    author: "World Bank",
    short: "Gini",
    year: "2026",
    title: "Income inequality: Gini coefficient",
    note: "Poverty and Inequality Platform, data set, processed by Our World in Data",
    href: "https://ourworldindata.org/grapher/economic-inequality-gini-index"
  },
  {
    id: "ilo-hours",
    author: "International Labour Organization",
    short: "ILO hours",
    year: "2026",
    title: "Employment by sex and weekly hours actually worked",
    note: "ILOSTAT, data set",
    href: "https://ilostat.ilo.org/topics/working-time/"
  },
  {
    id: "unfpa",
    author: "UNFPA",
    year: "2025",
    title: "Trends in maternal mortality 2000 to 2023",
    href: "https://www.unfpa.org/publications/trends-maternal-mortality-2000-2023"
  },
  {
    id: "unicef",
    author: "UNICEF",
    year: "2025",
    title: "Under-five mortality",
    note: "Data set",
    href: "https://data.unicef.org/topic/child-survival/under-five-mortality"
  },
  {
    id: "who-tb",
    author: "World Health Organization",
    year: "2025",
    title: "Tuberculosis",
    note: "Fact sheet",
    href: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis"
  },
  {
    id: "unaids",
    author: "UNAIDS",
    year: "2025",
    title: "Global HIV statistics",
    note: "Fact sheet",
    href: "https://www.unaids.org/en/resources/fact-sheet"
  },
  {
    id: "who-ncd",
    author: "World Health Organization",
    year: "2025",
    title: "Noncommunicable diseases and mental health (SDG target 3.4)",
    note: "Data set",
    href: "https://www.who.int/data/gho/data/themes/topics/sdg-target-3_4-noncommunicable-diseases-and-mental-health"
  },
  {
    id: "who-sdh",
    author: "World Health Organization",
    year: "n.d.",
    title: "Social determinants of health",
    href: "https://www.who.int/health-topics/social-determinants-of-health"
  },
  {
    id: "farmer",
    author: "Farmer, P.",
    year: "1999",
    title: "Infections and inequalities: The modern plagues",
    note: "University of California Press",
    href: "https://www.ucpress.edu/books/infections-and-inequalities/paper"
  }
];

export const referenceById = (id: string) =>
  REFERENCES.find(reference => reference.id === id)!;

// What the pachinko board leans on, in the order its note explains it.
export const BOARD_SOURCES = [
  "worldbank",
  "owid",
  "gapminder",
  "ppp-consumption",
  "exchange-rate",
  "us-cpi"
];

// What the quadrant chart plots: one source per axis, the halo, and the index
// that carries every figure to 2025 prices.
export const CHART_SOURCES = ["pip-median", "ilo-hours", "pip-gini", "us-cpi"];
