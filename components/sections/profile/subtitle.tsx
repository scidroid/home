"use client";

import { Emoji } from "@/components/ui/emoji";
import { easeOut, motion, useReducedMotion } from "motion/react";

const titlePills = [
  {
    icon: "🌍",
    label: "San Francisco, CA",
    tooltip: "I'm most of the time in SF"
  },
  {
    icon: "🚀",
    label: "Founder",
    tooltip: "I worked founding companies before"
  },
  {
    icon: "🔬",
    label: "Researcher",
    tooltip: "I work on AI and Medical research"
  },
  {
    icon: "💻",
    label: "Software Engineer",
    tooltip: "I have been coding for the last 5 years"
  },
  {
    icon: "🎓",
    label: "Minerva '29",
    tooltip:
      "I'm a student at Minerva University, Class of 2029, majoring in CS and Biology"
  },
  {
    icon: "🪪",
    label: "RISE Fellow",
    tooltip: "Eric Schmidt pays me to study and do research"
  }
];

export function Subtitle() {
  const prefersReducedMotion = useReducedMotion();

  const pillVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0.4, scale: 1 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { delay: i * 0.06, duration: 0.35, ease: easeOut }
    })
  };

  return (
    <ul
      className="flex flex-wrap gap-1.5 sm:gap-2 justify-center xl:justify-start mt-2 list-none p-0 m-0"
      role="list"
      aria-label="Professional roles and affiliations"
    >
      {titlePills.map((pill, idx) => (
        <motion.li
          key={idx}
          className="relative group inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 shadow-sm cursor-default hover:z-50 focus-within:z-50"
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={pillVariants}
          tabIndex={0}
          aria-describedby={`tooltip-${idx}`}
        >
          <span
            aria-hidden="true"
            className="inline-block motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-125 motion-safe:group-hover:-rotate-6 motion-safe:group-focus-within:scale-125 motion-safe:group-focus-within:-rotate-6"
          >
            <Emoji symbol={pill.icon} className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
          <span>{pill.label}</span>
          <span
            id={`tooltip-${idx}`}
            role="tooltip"
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xs px-3 py-2 rounded-lg text-white font-semibold shadow-lg border border-white/10 leading-relaxed bg-black/70 backdrop-blur-md text-xs pointer-events-none motion-safe:transition-opacity motion-safe:duration-200 whitespace-pre-line z-50 hidden sm:block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {pill.tooltip}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
