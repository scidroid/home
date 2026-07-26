// One family per income bracket, from Dollar Street (Gapminder). Each has the
// same three photos so brackets can be compared directly.
//
// Every family is picked so that BOTH its country's World Bank income group
// and its own converted wage fall in the bracket it appears under.
//
// Dollar Street reports income per adult per month in PPP dollars, but the
// board's brackets are World Bank Atlas figures, which are not PPP. To make
// the two comparable, each income is converted:
//
//   nominal USD (visit year) = PPP income x (PPP factor / exchange rate)
//   2025 USD                 = nominal USD x (US CPI 2025 / US CPI visit year)
//
// The factor is the World Bank's private-consumption PPP (PA.NUS.PRVT.PP) for
// that country and year, not the GDP one, because these are household incomes.
// The exchange rate is the period average for the same year. `ppp` keeps the
// figure Dollar Street publishes.

export type DollarStreetFamily = {
  country: string;
  usd: number; // USD per month, 2025 prices
  ppp: number; // as published by Dollar Street
  year: number; // year the family was visited
  slug: string;
  things: { label: string; src: string }[];
};

const family = (
  country: string,
  usd: number,
  ppp: number,
  year: number,
  slug: string,
  prefix: string
): DollarStreetFamily => ({
  country,
  usd,
  ppp,
  year,
  slug,
  things: [
    { label: "Home", src: `/dollar-street/${prefix}-home.webp` },
    { label: "Kitchen", src: `/dollar-street/${prefix}-kitchen.webp` },
    { label: "Toilet", src: `/dollar-street/${prefix}-toilet.webp` }
  ]
});

export const DOLLAR_STREET: DollarStreetFamily[] = [
  family("Malawi", 32, 64, 2015, "family-101", "low"),
  family("Cambodia", 222, 437, 2015, "family-40", "lowermid"),
  family("Brazil", 563, 685, 2018, "family-266", "uppermid"),
  family("United States", 2771, 2041, 2015, "family-136", "high")
];

export const DOLLAR_STREET_URL = "https://www.gapminder.org/dollar-street";
