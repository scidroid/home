"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "motion/react";

import { AnimatedNumber } from "@/components/ui/animated-number";

export function BPM({ bpm }: { bpm: number }) {
  const isReducedMotion = useReducedMotion();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(bpm);
  }, [bpm]);

  return (
    <p className="font-bold text-4xl xl:text-5xl">
      <AnimatedNumber
        springOptions={{
          bounce: 0,
          duration: isReducedMotion ? 0 : 2000
        }}
        value={value}
      />{" "}
      <span className="font-normal text-xl">BPM</span>
    </p>
  );
}
