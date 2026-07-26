// Shared by both story figures, so a bracket keeps its word and its colour
// across them.
//
// Thresholds are the FY27 classification, converted from GNI per capita a year
// to dollars a month. Shares are the percentage of humanity living in countries
// in each bracket. See references.ts for both.

export type IncomeGroup = "low" | "lowermid" | "uppermid" | "high";

export type Bracket = {
  id: IncomeGroup;
  label: string;
  share: number; // % of humanity born into it
  tint: string; // pale fill, for a bin or a quadrant
  spark: string; // the saturated version, for a dot or a ball
  income: string;
  message: string;
};

export const BRACKETS: readonly Bracket[] = [
  {
    id: "low",
    label: "Low",
    share: 9,
    tint: "#fee2e2",
    spark: "#f87171",
    income: "<$98 USD/mo",
    message: "low income. Less than $98 a month. 9% of humanity starts here."
  },
  {
    id: "lowermid",
    label: "Lower-mid",
    share: 36,
    tint: "#ffedd5",
    spark: "#fb923c",
    income: "$98-386 USD/mo",
    message:
      "lower-middle income. $98-386 a month. More than a third of us start here."
  },
  {
    id: "uppermid",
    label: "Upper-mid",
    share: 38,
    tint: "#fef3c7",
    spark: "#fbbf24",
    income: "$386-1,198 USD/mo",
    message: "upper-middle income. $386-1,198 a month. Colombia sits here."
  },
  {
    id: "high",
    label: "High",
    share: 17,
    tint: "#d1fae5",
    spark: "#34d399",
    income: ">$1,198 USD/mo",
    message: "high income. More than $1,198 a month. The luckiest 17%."
  }
] as const;
