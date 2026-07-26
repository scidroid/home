"use client";

import {
  Formula,
  InfoNote,
  NoteHeading
} from "@/components/sections/about/story/shared/info-note";
import {
  MEDIAN_HOURS,
  MEDIAN_INCOME,
  OUTLIERS,
  REFERENCE_YEAR,
  WORLD_MEDIAN_INCOME,
  countries
} from "@/data/productivity";
import type { Country } from "@/data/productivity";

// A single italic variable, inline in a sentence.
const Var = ({ v }: { v: string }) => (
  <math>
    <mi>{v}</mi>
  </math>
);

// Read out as a sentence, so the note never disagrees with the data.
const names = (list: Country[]) =>
  list
    .map(d => d.name)
    .sort()
    .reduce(
      (acc, n, i, all) =>
        i === 0 ? n : i === all.length - 1 ? `${acc} and ${n}` : `${acc}, ${n}`,
      ""
    );

const MODELLED = countries.filter(d => d.modelled).length;

export function ChartNote() {
  return (
    <InfoNote label="Show how this chart is built">
      <NoteHeading>Median, not average</NoteHeading>

      <p>
        An average is the wrong tool for both axes here, and it fails in
        opposite directions. An average wage is pulled up by a few very large
        salaries, so it describes a person who does not exist. An average of
        working hours is pulled down by part-time jobs, which are common in rich
        countries and rare in poor ones.
      </p>

      <p>
        Germany shows how large that gap gets. Around a third of German workers
        put in less than 30 hours in a given week, between part-time contracts
        and paid leave, which drags the average down to about 26 hours. The
        median German worker works 36.5. In Colombia only a sixth of workers are
        below 30 hours, so its average and its median sit close together. An
        average would therefore have made rich countries look far more rested
        than they are, on the axis that carries the whole argument. Both axes
        here are medians instead, and every dot is the person in the middle of
        their country.
      </p>

      <NoteHeading>The hours</NoteHeading>

      <p>
        Nobody publishes a median of working hours, so we compute one. The
        International Labour Organization reports how many workers fall inside
        each band of hours actually worked in a week: none, 1 to 14, 15 to 29,
        30 to 34, 35 to 39, 40 to 48, and 49 or more. We add the bands up until
        we pass half the workers, then find where inside that band the halfway
        point falls:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <mi>m</mi>
            <mo>=</mo>
            <mi>L</mi>
            <mo>+</mo>
            <mfrac>
              <mrow>
                <mfrac>
                  <mi>N</mi>
                  <mn>2</mn>
                </mfrac>
                <mo>−</mo>
                <mi>F</mi>
              </mrow>
              <mi>f</mi>
            </mfrac>
            <mo>×</mo>
            <mi>w</mi>
          </mrow>
        </math>
      </Formula>

      <p>
        where <Var v="L" /> is the lower edge of the band that contains the
        halfway point, <Var v="N" /> is every worker, <Var v="F" /> is everyone
        in the bands below it, <Var v="f" /> is the band itself, and{" "}
        <Var v="w" /> is how wide the band is. This assumes workers are spread
        evenly inside their band, which is the one estimate the chart makes.
        Workers who worked no hours at all that week stay in the count, because
        paid leave is real time off and a country that grants plenty of it
        should show it.
      </p>

      <NoteHeading>The income</NoteHeading>

      <p>
        Income is already a true median at the source: the amount half the
        country lives below, per person and per day, counting what people
        actually spend as well as what they earn.
      </p>

      <p>
        Money is corrected three times before any of it can be compared. Each
        survey is deflated by its own country&apos;s inflation, so a reading
        taken in 2015 and one taken in 2024 are in the same money. It is then
        converted at purchasing power parity, so that money buys the same basket
        everywhere. Finally the whole set is carried forward to 2025 prices with
        US inflation, which is what puts this chart and the pachinko above in
        the same dollars.
      </p>

      <p>
        One caveat on the last step. The published figures are 2021
        international dollars, and moving them to 2025 shifts the price level
        but not the basket, which is still the one priced in 2021. The factor is
        1.19, from a US consumer price index of 270.97 to 322.15. October 2025
        was never published, because of that year&apos;s lapse in
        appropriations, so it is interpolated between September and November.
        Leaving it out entirely moves the factor by 0.065%.
      </p>

      <NoteHeading>The crosshair</NoteHeading>

      <p>
        The two lines are the middle country on each axis, {MEDIAN_HOURS} hours
        and ${MEDIAN_INCOME} a day, so half the dots sit on either side of each
        line. They are medians of the countries shown, not of the world&apos;s
        people. Weighted by population the world median income is much lower, at
        ${WORLD_MEDIAN_INCOME} a day, because the countries below the line hold
        most of humanity.
      </p>

      <NoteHeading>What the opening view leaves out</NoteHeading>

      <p>
        {OUTLIERS.length} countries sit so far along the hours axis that they
        stretch it until the other {countries.length - OUTLIERS.length} are a
        smudge, so the chart opens without them: {names(OUTLIERS)}. Which ones
        count as far out is decided by Tukey&apos;s rule, more than one and a
        half interquartile ranges past the quartiles, rather than by eye. They
        are one control away, the count above the chart always says how many
        countries you are actually looking at, and no country is ever dropped
        from the data.
      </p>

      <NoteHeading>One year, not whenever</NoteHeading>

      <p>
        Countries survey on their own schedules. Taking each one&apos;s latest
        reading put a 1992 income next to 2024 hours, which is not a country at
        a moment, it is two countries stapled together. So income is not a
        survey here. It is the World Bank&apos;s lineup estimate for{" "}
        {REFERENCE_YEAR}, every country carried to the same reference year with
        growth from its national accounts. {MODELLED} of the {countries.length}{" "}
        are a projection rather than a survey taken that year, and every card
        says which survey its estimate rests on.
      </p>

      <p>
        A country appears only if that survey is within eight years of{" "}
        {REFERENCE_YEAR}. Eight is loose on purpose. Poor countries survey far
        less often than rich ones, so a strict cut quietly deletes them: at
        three years it keeps 88% of high income countries and 57% of low income
        ones. Deleting the poor from a chart about poverty is a worse error than
        an old reading. At eight years every income bracket is fully
        represented, and {countries.length} countries clear it.
      </p>

      <p>
        Hours get no such rule, which is a measured decision rather than a
        lenient one. Median weekly hours barely move. Checking every country
        against itself across every pair of years it reports, a median taken six
        to eight years earlier predicts the later one to within 0.54 hours, and
        90% of them land inside two hours. Two attempts to improve on that both
        made it worse, so the newest reading is used whatever year it comes
        from, and the card names that year.
      </p>

      <NoteHeading>What is missing</NoteHeading>

      <p>
        China and Japan report no banded hours at all, so neither can appear,
        and China alone is close to a fifth of the world&apos;s workers. The
        Gini is the one figure still taken from a country&apos;s own latest
        survey rather than {REFERENCE_YEAR}, because the shape of a distribution
        cannot be projected the way its level can.
      </p>
    </InfoNote>
  );
}
