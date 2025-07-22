"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedHeart({ bpm }: { bpm: number }) {
  const timePerBeat = 60 / bpm;
  const prefersReducedMotion = useReducedMotion();

  const scaleKeyframes = prefersReducedMotion ? [1] : [1, 1.06, 0.99, 1];
  const filterKeyframes = prefersReducedMotion
    ? ["brightness(1) drop-shadow(0 0 0px #FF6B6B)"]
    : [
        "brightness(1) drop-shadow(0 0 0px #FF6B6B)",
        "brightness(1.03) drop-shadow(0 0 3px #FF6B6B)",
        "brightness(0.99) drop-shadow(0 0 1px #FF6B6B)",
        "brightness(1) drop-shadow(0 0 0px #FF6B6B)"
      ];

  return (
    <motion.svg
      key={bpm}
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      style={{ display: "block" }}
      initial={{
        scale: scaleKeyframes[0],
        filter: filterKeyframes[0]
      }}
      animate={{
        scale: scaleKeyframes,
        filter: filterKeyframes
      }}
      transition={{
        duration: timePerBeat,
        times: [0, 0.3, 0.7, 1],
        repeat: prefersReducedMotion ? 0 : Infinity,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      <motion.path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heartGradient)"
      />
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FFC3C3" />
        </linearGradient>
        <radialGradient
          id="heartShade"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </radialGradient>
      </defs>
      <motion.path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heartShade)"
        fillOpacity="0.5"
      />
    </motion.svg>
  );
}
