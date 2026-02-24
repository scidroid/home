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
          Every human comes to earth with nothing. No skills, no money, no
          guarantees. Just the gift of life. But{" "}
          <span className="text-gray-900 font-semibold">
            a lottery decides almost everything that follows
          </span>
          , where you&apos;re born, who your parents are, and what countries you
          can visit with your passport. Whether you get to hug your mother
          goodbye before she leaves for work, or bury her before you turn ten.
          Whether your first kiss happens at a school dance, or never happens
          because you didn&apos;t survive childhood. Whether you walk across a
          graduation stage or never see the inside of a classroom.
        </p>

        <p className="text-gray-600 leading-relaxed text-[15px]">
          This lottery affects every aspect of your life.{" "}
          <span className="text-gray-900 font-semibold">
            How much you work
          </span>
          , for example.
        </p>

        <ProductivityChart />

        <p className="text-gray-600 leading-relaxed text-[15px]">
          Colombians work 30% more hours than the OECD average but earn 53%
          less. Swiss workers work 12% fewer hours and earn 43% more. This
          isn&apos;t unique to Colombia. Across low and middle-income countries,
          workers put in longer hours for lower wages. The difference isn&apos;t
          effort. It&apos;s that limited education, poor infrastructure, and
          economic and social instability{" "}
          <span className="text-gray-900 font-semibold">
            make each hour worth less
          </span>
          . Low and middle-income nations sit in the trap, more hours for less
          pay, while high-income nations sit in the ideal, fewer hours for more.
          The problem isn&apos;t that people don&apos;t work hard enough.{" "}
          <span className="text-gray-900 font-semibold">
            It&apos;s that the systems around them devalue every hour they give
          </span>
          .
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
                At the root sits education. During COVID,{" "}
                <span className="text-gray-900 font-semibold">
                  463 million kids had zero access
                </span>{" "}
                to remote learning. Entire villages share one internet
                connection. Brilliant minds never reach their potential because
                of where they were born.{" "}
                <span className="text-gray-900 font-semibold">
                  Fix education
                </span>
                , and the other crises start to heal.
              </p>

              <EducationDivide />

              <p className="text-gray-600 leading-relaxed text-[15px]">
                These aren&apos;t separate problems — they&apos;re{" "}
                <span className="text-gray-900 font-semibold">
                  one crisis with three faces
                </span>
                . Health, work, and education form a cycle: poor health limits
                productivity, limited income blocks education, and lack of
                education perpetuates poor health. Breaking this cycle is why I
                build.
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
