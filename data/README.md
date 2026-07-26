# data

Everything the site knows about the world, and the scripts that fetch it.

The split with `content/` is by origin, not by shape. `content/` is what Juan
writes: project blurbs, gallery captions, copy. `data/` is what someone else
measured, pulled from a source that can be cited and re-fetched.

## Datasets

| File | What it is | Where it comes from |
| --- | --- | --- |
| `productivity.ts` | 129 countries: median income a day, median hours a week, Gini | Generated. See below. |
| `dollar-street.ts` | One family per income bracket, with photos | Hand-picked from Gapminder's Dollar Street, incomes converted to 2025 USD |
| `life-cycle.ts` | Global mortality at each stage of life | WHO, UNICEF, UNAIDS, UNFPA |
| `references.ts` | The bibliography every figure cites | Written by hand, in APA |

Anything with a number in it should be traceable to a row in `references.ts`.

## Regenerating

```sh
python3 data/scripts/build_productivity.py
bunx prettier --write data/productivity.ts
```

Downloads are cached in `data/scripts/.cache/` (gitignored), so a second run is
offline. Delete that folder to pull fresh source data.

The script prints the counts it derives. If they move a long way from what is
committed, that is worth understanding before accepting the diff: the crosshair
in the chart is the median of whatever countries clear the filters, so dropping
or adding a country moves the quadrant boundaries for everyone.

## The three corrections in `productivity.ts`

Each one exists because the raw numbers would otherwise say something false.
The full reasoning lives in the header of the generated file and in the chart's
own info panel; the short version:

1. **Medians, not means.** A mean wage is pulled up by a few large salaries. A
   mean of hours is pulled *down* by part-time work, which is common in rich
   countries and rare in poor ones, so a mean would flatter exactly the
   countries the chart is asking about.
2. **One reference year.** Countries survey on their own schedules. Taking each
   one's latest reading paired a 1992 income with 2024 hours. Income is the
   World Bank's lineup estimate for a single year instead.
3. **One currency.** Source figures are 2021 international dollars, already
   PPP-converted. They are carried to 2025 prices with US CPI so this dataset
   and the pachinko brackets are in the same money.

Only income is filtered for recency. Hours are structurally persistent, which
was measured rather than assumed: across every pair of years a country reports,
a median taken 6 to 8 years earlier predicts the later one to within about half
an hour. Two attempts to do better than "use the newest reading" both scored
worse, and are documented in the script so nobody repeats them.
