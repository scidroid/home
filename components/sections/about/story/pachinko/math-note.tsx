"use client";

import { Fragment } from "react";

import {
  BURST_SIZE,
  ROWS
} from "@/components/sections/about/story/pachinko/board";
import {
  Formula,
  InfoNote,
  NoteHeading
} from "@/components/sections/about/story/shared/info-note";

// V(...) and q_k appear throughout the note, so build them once.
function V({ args }: { args: string[] }) {
  return (
    <>
      <mi>V</mi>
      <mo>(</mo>
      {args.map((arg, i) => (
        <Fragment key={i}>
          {i > 0 && <mo>,</mo>}
          {[...arg].map((ch, j) =>
            /[0-9]/.test(ch) ? (
              <mn key={j}>{ch}</mn>
            ) : /[+\u2212]/.test(ch) ? (
              <mo key={j}>{ch}</mo>
            ) : (
              <mi key={j}>{ch}</mi>
            )
          )}
        </Fragment>
      ))}
      <mo>)</mo>
    </>
  );
}

const Qk = () => (
  <msub>
    <mi>q</mi>
    <mi>k</mi>
  </msub>
);

// q_k written inline in a sentence.
const QkInline = () => (
  <math>
    <Qk />
  </math>
);

export function MathNote() {
  return (
    <InfoNote label="Show the mathematics of the board">
      <NoteHeading>The board</NoteHeading>

      <p>
        Each ball makes {ROWS} bounces that could drive the ball left or right
        at random, which is what we call a random walk. A fair version of this
        setup would follow a normal distribution, like a Galton board, where
        most of the balls pile up in the middle, and only a few of them ever
        reach the edges, but the world doesn&apos;t look like that.
      </p>

      <p>
        To represent the real distribution of the world, we modify the
        probability at each peg:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <mi>p</mi>
            <mo>=</mo>
            <mfrac>
              <mrow>
                <V args={["r+1", "s+1"]} />
              </mrow>
              <mrow>
                <V args={["r", "s"]} />
              </mrow>
            </mfrac>
          </mrow>
        </math>
      </Formula>

      <p>
        which reads as the chance of going right being the weight on the right
        divided by the weight below it. Here, the function{" "}
        <math>
          <mi>V</mi>
        </math>{" "}
        holds the weights assigned to each slot using the Doob h-transform
        method, allowing us to change the odds while keeping it a stochastic
        coin flip, so no ball ever knows where it will end up.
      </p>

      <p>
        We build those weights backward, from the bins up to the chute, adding
        the two weights that a peg can send a ball into:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <V args={["r", "s"]} />
            <mo>=</mo>
            <V args={["r+1", "s−" + "1"]} />
            <mo>+</mo>
            <V args={["r+1", "s+1"]} />
          </mrow>
        </math>
      </Formula>

      <p>
        and the last row starts the whole thing off, where <QkInline /> is the
        share we want a slot to end up with, divided by the number of different
        paths that can reach it:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <V args={["n", "s"]} />
            <mo>=</mo>
            <mfrac>
              <Qk />
              <mrow>
                <mo>(</mo>
                <mfrac linethickness="0">
                  <mi>n</mi>
                  <mi>k</mi>
                </mfrac>
                <mo>)</mo>
              </mrow>
            </mfrac>
          </mrow>
        </math>
      </Formula>

      <p>
        This division gives every path to a slot the same weight, so once we add
        them all back up, the slot ends up with <QkInline />.
      </p>

      <p>
        We then pick each <QkInline /> to be as large as the strip of board that
        slot covers, and we let the last bounce push the ball anywhere inside
        that strip, which is what finally makes the landing uniform over the
        whole board.
      </p>

      <p>
        So the boxes below have a share of the total width that represents the
        percentage of the world population that lives in countries in that
        bracket, which means that the width of a box is its probability.
      </p>

      <p>
        Because every drop is random, small samples tend not to be
        representative, so try taking shots {BURST_SIZE} at a time.
      </p>

      <p>
        MATCH tells you how close your balls already are to the real world,
        measuring the gap that is left between both bars:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <mi>M</mi>
            <mo>=</mo>
            <mn>1</mn>
            <mo>−</mo>
            <mfrac>
              <mn>1</mn>
              <mn>2</mn>
            </mfrac>
            <munder>
              <mo>∑</mo>
              <mi>i</mi>
            </munder>
            <mrow>
              <mo stretchy="false">|</mo>
              <msub>
                <mover accent="true">
                  <mi>p</mi>
                  <mo stretchy="false">^</mo>
                </mover>
                <mi>i</mi>
              </msub>
              <mo>−</mo>
              <msub>
                <mi>p</mi>
                <mi>i</mi>
              </msub>
              <mo stretchy="false">|</mo>
            </mrow>
          </mrow>
        </math>
      </Formula>

      <p>
        Comparing your bar against the world&apos;s, where an exact match gives
        100%, and more balls usually give a higher MATCH.
      </p>

      <NoteHeading>The incomes</NoteHeading>

      <p>
        The families you see when hovering over a bracket come from Dollar
        Street, which reports income in PPP dollars, while the brackets come
        from the World Bank Atlas method, which is not PPP. So we convert each
        family with the price level of its country in the year it was visited:
      </p>

      <Formula>
        <math display="block">
          <mrow>
            <mi>USD</mi>
            <mo>=</mo>
            <mi>PPP</mi>
            <mo>×</mo>
            <mfrac>
              <mrow>
                <mi>PPP</mi>
                <mspace width="0.15em" />
                <mi>factor</mi>
              </mrow>
              <mrow>
                <mi>exchange</mi>
                <mspace width="0.15em" />
                <mi>rate</mi>
              </mrow>
            </mfrac>
          </mrow>
        </math>
      </Formula>

      <p>
        using the private consumption factor rather than the GDP one, because
        these are household incomes, and then we carry that number to 2025
        prices with US inflation, because the brackets themselves are built on
        2025 income, which leaves both figures on the same scale. Each family is
        picked so that its country and its converted wage both belong to the
        bracket it appears under.
      </p>
    </InfoNote>
  );
}
