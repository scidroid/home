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
import { easeOut, motion } from "motion/react";

const titlePills = [
  {
    icon: EarthIcon,
    label: "Barranquilla, soon in SF",
    tooltip:
      "I'm currently in Colombia, but moving to San Francisco in August.",
    color: "#2563eb" // Blue for earth/location
  },
  {
    icon: RocketIcon,
    label: "Founder",
    tooltip: "I'm the CTO at Pulpoo.com",
    color: "#dc2626" // Red for startup/rocket
  },
  {
    icon: MicroscopeIcon,
    label: "Researcher",
    tooltip: "I work on AI and Medical research.",
    color: "#059669" // Green for science/research
  },
  {
    icon: ComputerIcon,
    label: "Software Engineer",
    tooltip: "I have been coding for the last 5 years.",
    color: "#7c3aed" // Purple for technology
  },
  {
    icon: Mortarboard02Icon,
    label: "Minerva '29",
    tooltip:
      "I'm a student at Minerva University, Class of 2029, majoring in CS and Biology.",
    color: "#c2410c" // Orange for education
  },
  {
    icon: StudentCardIcon,
    label: "RISE Fellow",
    tooltip: "Eric Schmidt pays me to study and do research.",
    color: "#b91c1c" // Dark red for fellowship
  }
];

export function Subtitle() {
  const pillVariants = {
    hidden: { opacity: 0.4, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.06,
        duration: 0.35,
        ease: easeOut
      }
    })
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center xl:justify-start mt-2">
      {titlePills.map((pill, idx) => (
        <motion.span
          key={idx}
          className="relative group inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 shadow-sm cursor-default"
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={pillVariants}
        >
          <span
            role="img"
            aria-label={pill.label}
            className="transition-transform duration-200 group-hover:scale-125 group-hover:-rotate-6"
          >
            <HugeiconsIcon
              icon={pill.icon}
              className="w-4 h-4"
              color={pill.color}
              strokeWidth={1.5}
            />
          </span>
          {pill.label}
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 w-max max-w-xs px-3 py-2 rounded-lg text-white font-semibold shadow-lg border border-white/10 leading-relaxed bg-black/70 backdrop-blur-md text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-pre-line"
            role="tooltip"
          >
            {pill.tooltip}
          </span>
        </motion.span>
      ))}
    </div>
  );
}
