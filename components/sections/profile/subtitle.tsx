"use client";

import {
  ComputerIcon,
  EarthIcon,
  MicroscopeIcon,
  Mortarboard02Icon,
  RocketIcon,
  StudentCardIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { easeOut, motion, useReducedMotion } from "motion/react";

const titlePills = [
  {
    icon: EarthIcon,
    label: "San Francisco, CA",
    tooltip: "I'm most of the time in SF",
    color: "#2563eb"
  },
  {
    icon: RocketIcon,
    label: "Founder",
    tooltip: "I worked founding companies before",
    color: "#dc2626"
  },
  {
    icon: MicroscopeIcon,
    label: "Researcher",
    tooltip: "I work on AI and Medical research",
    color: "#059669"
  },
  {
    icon: ComputerIcon,
    label: "Software Engineer",
    tooltip: "I have been coding for the last 5 years",
    color: "#7c3aed"
  },
  {
    icon: Mortarboard02Icon,
    label: "Minerva '29",
    tooltip:
      "I'm a student at Minerva University, Class of 2029, majoring in CS and Biology",
    color: "#c2410c"
  },
  {
    icon: StudentCardIcon,
    label: "RISE Fellow",
    tooltip: "Eric Schmidt pays me to study and do research",
    color: "#b91c1c"
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
          <span aria-hidden="true">
            <HugeiconsIcon
              icon={pill.icon}
              className="w-3 h-3 sm:w-4 sm:h-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-125 motion-safe:group-hover:-rotate-6 motion-safe:group-focus-within:scale-125 motion-safe:group-focus-within:-rotate-6"
              color={pill.color}
              strokeWidth={1.5}
            />
          </span>
          <span>{pill.label}</span>
          <span
            id={`tooltip-${idx}`}
            role="tooltip"
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xs px-3 py-2 rounded-lg text-white font-semibold shadow-lg border border-white/10 leading-relaxed bg-black/70 backdrop-blur-md text-xs opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none motion-safe:transition-opacity motion-safe:duration-200 whitespace-pre-line z-50"
          >
            {pill.tooltip}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
