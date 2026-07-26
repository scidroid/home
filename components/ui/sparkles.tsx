"use client";

import { Emoji } from "@/components/ui/emoji";
import { motion, useReducedMotion } from "motion/react";

function Spark({
  left,
  top,
  size,
  delay,
  duration
}: {
  left: string;
  top: string;
  size: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute select-none"
      // Behind the text: letters cover the sparks, so they peek out from
      // behind the words instead of sitting on top of them.
      style={{ left, top, width: size, height: size, zIndex: -1 }}
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.4, 1, 0.4],
        rotate: [-20, 15, -20]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 0.4,
        ease: "easeInOut"
      }}
    >
      <Emoji symbol="✨" className="h-full w-full" />
    </motion.span>
  );
}

// Zero-width inline anchor: lets sparks position against a point in the
// text without interrupting line wrapping.
function Anchor({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block w-0 h-0 align-baseline"
    >
      {children}
    </span>
  );
}

// Wrap a phrase to make it twinkle: little ✨ pop in and out around its
// start and end. Text flow and wrapping are untouched.
export function Sparkles({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <>
      <Anchor>
        <Spark
          left="-0.35em"
          top="-0.7em"
          size="0.9em"
          delay={0}
          duration={2.1}
        />
        <Spark
          left="-0.55em"
          top="-0.05em"
          size="0.55em"
          delay={1.1}
          duration={2.3}
        />
      </Anchor>
      {children}
      <Anchor>
        <Spark
          left="-0.5em"
          top="-0.75em"
          size="0.8em"
          delay={0.6}
          duration={2.4}
        />
        <Spark
          left="-0.9em"
          top="-0.05em"
          size="0.6em"
          delay={1.6}
          duration={2.2}
        />
      </Anchor>
    </>
  );
}
