"use client";

import Image from "next/image";

import { useRef, useState } from "react";

import asofi from "@/components/sections/about/images/asofi.png";
import pulpoo from "@/components/sections/about/images/pulpoo.webp";
import { AnimatePresence, motion } from "motion/react";

import { EducationDivide } from "./education-divide";
import { ExpandTrigger } from "./expand-trigger";
import { LifeCycleTimeline } from "./life-cycle-timeline";
import { ProductivityChart } from "./productivity-chart";

export function Story() {
  const [isExpanded, setIsExpanded] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  const handleToggle = () => {
    const willExpand = !isExpanded;
    setIsExpanded(willExpand);
    if (willExpand && articleRef.current) {
      setTimeout(() => {
        const headerOffset = 80;
        const elementPosition =
          articleRef.current!.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth"
        });
      }, 50);
    }
  };

  return (
    <article
      ref={articleRef}
      className="w-full h-full rounded-2xl bg-linear-to-br from-amber-50/90 via-yellow-50/80 to-orange-50/70 p-4 sm:p-6 md:p-8 flex flex-col border border-amber-200/50 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">
        Why I Build
      </h3>

      <div className="space-y-5">
        {/* Always visible */}
        <p className="text-gray-600 leading-relaxed text-[15px]">
          I was born in Colombia. The schools I got into, the people I met, the
          fact that I&apos;m typing this right now,{" "}
          <span className="text-gray-900 font-semibold">
            I didn&apos;t really earn most of it. I got lucky
          </span>
          . Where you&apos;re born does most of the work. Your parents, your
          passport, whether you make it to ten.
        </p>

        <p className="text-gray-600 leading-relaxed text-[15px]">
          That luck shows up in three places:{" "}
          <span className="text-gray-900 font-semibold">
            how long you live, what your work is worth, and what you get to
            learn
          </span>
          . They look like three separate problems but they&apos;re not. They
          feed each other. Work is the easiest one to see.
        </p>

        <ProductivityChart />

        <p className="text-gray-600 leading-relaxed text-[15px]">
          Colombians work{" "}
          <span className="text-gray-900 font-semibold">
            30% more hours than the OECD average and bring home 53% less
          </span>
          . It&apos;s not that people somewhere else are lazier, or that we work
          harder at home. The hours just count differently. When the schools are
          broken, the roads are broken, and nothing around you is stable, every
          hour you put in is worth less. You can&apos;t out-grind the math. And
          work is only one piece of it.
        </p>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden space-y-5"
            >
              <LifeCycleTimeline />

              <p className="text-gray-600 leading-relaxed text-[15px]">
                It starts the second you&apos;re born.{" "}
                <span className="text-gray-900 font-semibold">
                  4.8 million kids die before they turn five every year
                </span>
                , mostly from things rich countries fixed decades ago. Whether
                you&apos;re reading this, and whether I&apos;m the one writing
                it, comes down partly to where our moms happened to be.
              </p>

              <EducationDivide />

              <p className="text-gray-600 leading-relaxed text-[15px]">
                Underneath all of it is education. A kid born in Bujumbura has
                about a{" "}
                <span className="text-gray-900 font-semibold">
                  6% shot at university
                </span>
                . In Zurich, it&apos;s 77%. Same planet. Brilliant kids never
                sit in a classroom because of where they were born.
              </p>

              <p className="text-gray-600 leading-relaxed text-[15px]">
                Health, work, education. Pull on any of them and the other two
                start to come loose, but{" "}
                <span className="text-gray-900 font-semibold">
                  education is where you get the most back
                </span>
                . Teach a kid, and over a generation the rest start fixing
                themselves.
              </p>

              <p className="text-gray-600 leading-relaxed text-[15px]">
                That&apos;s why I build.{" "}
                <span className="text-gray-900 font-semibold">ASOFI</span>{" "}
                teaches girls in rural Colombia how to code. Most of them
                haven&apos;t sat in front of a keyboard before.{" "}
                <span className="text-gray-900 font-semibold">Pulpoo</span>{" "}
                helps companies get back the hours bad systems steal from their
                teams. Different angles, same cycle. They&apos;re small.
                They&apos;re mine. I&apos;m working on it.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/asofiorg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-amber-200/60 hover:border-amber-400 hover:bg-white/80 transition-all"
                >
                  <Image
                    src={asofi}
                    alt=""
                    className="h-7 w-7 rounded-md object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    ASOFI
                  </span>
                </a>
                <a
                  href="https://pulpoo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2 border border-amber-200/60 hover:border-amber-400 hover:bg-white/80 transition-all"
                >
                  <Image
                    src={pulpoo}
                    alt=""
                    className="h-7 w-7 rounded-md object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Pulpoo
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expand Trigger */}
      <div
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && handleToggle()}
        className="focus:outline-none"
      >
        <ExpandTrigger
          isExpanded={isExpanded}
          caption={isExpanded ? "That's enough" : "Tell me more"}
        />
      </div>
    </article>
  );
}
