"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import {
  BURST_SIZE,
  ROWS
} from "@/components/sections/about/story/pachinko/board";
import { AnimatePresence, motion } from "motion/react";

// Formulas are MathML, which every current browser renders natively. This
// keeps real mathematical notation without a formula library.

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

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-1.5 overflow-x-auto rounded-md bg-gray-50 px-2.5 py-2 text-center text-[13px] text-gray-800">
      {children}
    </div>
  );
}

export function MathNote() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Show the mathematics of the board"
        className={`flex h-4 w-4 items-center justify-center rounded-full border font-mono text-[9px] leading-none transition-colors ${
          open
            ? "border-gray-500 bg-gray-900 text-white"
            : "border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600"
        }`}
      >
        i
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.99 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-full right-0 z-40 mb-2 max-h-[26rem] w-[21rem] max-w-[85vw] origin-bottom-right overflow-y-auto rounded-xl border border-gray-200 bg-white p-3.5 text-left shadow-xl ring-1 ring-gray-900/5"
          >
            <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-gray-400">
              How this works
            </p>

            <div className="space-y-2 text-[12px] leading-relaxed text-gray-600">
              <p className="mb-1 mt-3 font-mono text-[9px] uppercase tracking-wider text-gray-400">
                The board
              </p>

              <p>
                Each ball makes {ROWS} bounces that could drive the ball left or
                right at random, which is what we call a random walk. A fair
                version of this setup would follow a normal distribution, like a
                Galton board, where most of the balls pile up in the middle, and
                only a few of them ever reach the edges, but the world
                doesn&apos;t look like that.
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
                which reads as the chance of going right being the weight on the
                right divided by the weight below it. Here, the function{" "}
                <math>
                  <mi>V</mi>
                </math>{" "}
                holds the weights assigned to each slot using the Doob
                h-transform method, allowing us to change the odds while keeping
                it a stochastic coin flip, so no ball ever knows where it will
                end up.
              </p>

              <p>
                We build those weights backward, from the bins up to the chute,
                adding the two weights that a peg can send a ball into:
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
                and the last row starts the whole thing off, where <QkInline />{" "}
                is the share we want a slot to end up with, divided by the
                number of different paths that can reach it:
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
                This division gives every path to a slot the same weight, so
                once we add them all back up, the slot ends up with <QkInline />
                .
              </p>

              <p>
                We then pick each <QkInline /> to be as large as the strip of
                board that slot covers, and we let the last bounce push the ball
                anywhere inside that strip, which is what finally makes the
                landing uniform over the whole board.
              </p>

              <p>
                So the boxes below have a share of the total width that
                represents the percentage of the world population that lives in
                countries in that bracket, which means that the width of a box
                is its probability.
              </p>

              <p>
                Because every drop is random, small samples tend not to be
                representative, so try taking shots {BURST_SIZE} at a time.
              </p>

              <p>
                MATCH tells you how close your balls already are to the real
                world, measuring the gap that is left between both bars:
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
                Comparing your bar against the world&apos;s, where an exact
                match gives 100%, and more balls usually give a higher MATCH.
              </p>

              <p className="mb-1 mt-3 font-mono text-[9px] uppercase tracking-wider text-gray-400">
                The incomes
              </p>

              <p>
                The families you see when hovering over a bracket come from
                Dollar Street, which reports income in PPP dollars, while the
                brackets come from the World Bank Atlas method, which is not
                PPP. So we convert each family with the price level of its
                country in the year it was visited:
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
                using the private consumption factor rather than the GDP one,
                because these are household incomes, and then we carry that
                number to 2025 prices with US inflation, because the brackets
                themselves are built on 2025 income, which leaves both figures
                on the same scale. Each family is picked so that its country and
                its converted wage both belong to the bracket it appears under.
              </p>
            </div>

            <span className="absolute -bottom-1 right-1.5 h-2 w-2 rotate-45 border-b border-r border-gray-200 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
