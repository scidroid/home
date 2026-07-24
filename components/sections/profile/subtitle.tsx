"use client";

import { useState } from "react";

import { Emoji } from "@/components/ui/emoji";
import { motion, useReducedMotion } from "motion/react";

const mainLocation = { icon: "🇯🇵", label: "Tokyo, JP" };

// Stacked geometry is deliberately uneven — tilted and shifted like the
// gallery's photo deck — and straightens out when the pills fly down.
const otherLocations = [
  {
    icon: "🇺🇸",
    label: "San Francisco, CA",
    rotate: -2.5,
    stack: { left: 11, right: 4, top: 5 }
  },
  {
    icon: "🇨🇴",
    label: "Barranquilla, CO",
    rotate: 3,
    stack: { left: 5, right: 14, top: 10 }
  }
];

const titlePills = [
  { icon: "🚀", label: "Founder" },
  { icon: "🔬", label: "Researcher" },
  { icon: "💻", label: "Software Engineer" },
  { icon: "🎓", label: "Minerva '29" },
  { icon: "🪪", label: "RISE Fellow" }
];

function LocationStack() {
  const [spread, setSpread] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      className="relative list-none cursor-default select-none rounded-full pb-2 hover:z-50 focus-within:z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
      tabIndex={0}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 380, damping: 24 }
      }}
      onHoverStart={() => setSpread(true)}
      onHoverEnd={() => setSpread(false)}
      onFocus={() => setSpread(true)}
      onBlur={() => setSpread(false)}
      onKeyDown={e => {
        if (e.key === "Escape") setSpread(false);
      }}
    >
      {/* Screen readers get the full list regardless of visual state. */}
      <span className="sr-only">
        Also based in San Francisco, CA and Barranquilla, CO
      </span>

      <span className="relative inline-block">
        {/* One persistent element per city — never unmounted. It lives as a
            clean card edge tucked under the pill and FLIP-animates into its
            full pill on hover. It stays z-behind the main pill the whole
            time, so it slides out of the deck instead of appearing over it. */}
        {otherLocations.map((loc, i) => {
          const depth = i + 1;
          return (
            <motion.span
              key={loc.label}
              aria-hidden="true"
              layout
              layoutDependency={spread}
              className="absolute inline-flex items-center justify-start gap-1 text-xs sm:text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap overflow-hidden"
              style={
                spread
                  ? {
                      left: 0,
                      top: `calc(${depth * 100}% + ${depth * 7}px)`,
                      width: "max-content",
                      zIndex: -depth
                    }
                  : {
                      left: loc.stack.left,
                      top: loc.stack.top,
                      width: `calc(100% - ${loc.stack.left + loc.stack.right}px)`,
                      zIndex: -depth
                    }
              }
              animate={{
                rotate: spread || prefersReducedMotion ? 0 : loc.rotate,
                boxShadow: spread
                  ? "0 5px 14px -4px rgba(0, 0, 0, 0.14), 0 2px 6px -2px rgba(0, 0, 0, 0.08)"
                  : "0 1px 2px 0 rgba(0, 0, 0, 0.04)"
              }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      layout: {
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        delay: spread ? i * 0.04 : (1 - i) * 0.04
                      },
                      rotate: {
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        delay: spread ? i * 0.04 : (1 - i) * 0.04
                      },
                      boxShadow: { type: "tween", duration: 0.2 }
                    }
              }
            >
              {/* Left-anchored so the label never re-centers while the
                  width springs; it materializes in place with a soft
                  blur instead of popping. */}
              <motion.span
                layout="position"
                className="inline-flex items-center gap-1"
                animate={{
                  opacity: spread ? 1 : 0,
                  x: spread ? 0 : -6,
                  filter: spread ? "blur(0px)" : "blur(3px)",
                  transition: prefersReducedMotion
                    ? { duration: 0 }
                    : spread
                      ? {
                          delay: 0.1 + i * 0.05,
                          duration: 0.22,
                          ease: [0.23, 1, 0.32, 1]
                        }
                      : { duration: 0.1 }
                }}
              >
                <Emoji symbol={loc.icon} className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{loc.label}</span>
              </motion.span>
            </motion.span>
          );
        })}

        <motion.span
          className="relative z-10 inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap"
          animate={{
            boxShadow: spread
              ? "0 5px 14px -4px rgba(0, 0, 0, 0.14), 0 2px 6px -2px rgba(0, 0, 0, 0.08)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.07)",
            transition: { duration: prefersReducedMotion ? 0 : 0.2 }
          }}
        >
          <Emoji symbol={mainLocation.icon} className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{mainLocation.label}</span>
        </motion.span>
      </span>
    </motion.li>
  );
}

function RolePill({
  pill,
  index
}: {
  pill: (typeof titlePills)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const lift = hovered && !prefersReducedMotion;

  return (
    <motion.li
      className="relative list-none cursor-default select-none rounded-full"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : {
              delay: index * 0.06,
              type: "spring",
              stiffness: 380,
              damping: 24
            }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.span
        className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap"
        animate={{
          y: lift ? -1 : 0,
          boxShadow: lift
            ? "0 3px 8px -2px rgba(0, 0, 0, 0.1)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.07)",
          transition: prefersReducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 500,
                damping: 30,
                boxShadow: { type: "tween", duration: 0.15 }
              }
        }}
      >
        <Emoji symbol={pill.icon} className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>{pill.label}</span>
      </motion.span>
    </motion.li>
  );
}

export function Subtitle() {
  return (
    <ul
      className="flex flex-wrap items-start gap-1.5 sm:gap-2 justify-center xl:justify-start mt-2 list-none p-0 m-0"
      role="list"
      aria-label="Professional roles and affiliations"
    >
      <LocationStack />
      {titlePills.map((pill, idx) => (
        <RolePill key={pill.label} pill={pill} index={idx + 1} />
      ))}
    </ul>
  );
}
