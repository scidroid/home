"use client";

import { useEffect, useState } from "react";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { useReducedMotion } from "motion/react";

export function BPM({ bpm }: { bpm: number }) {
  const isReducedMotion = useReducedMotion();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(bpm);
  }, [bpm]);

  return (
    <p className="font-bold text-4xl text-red-600">
      <AnimatedNumber
        springOptions={{
          bounce: 0,
          duration: isReducedMotion ? 0 : 2000
        }}
        value={value}
      />
      <span className="m-1 font-normal text-xl text-red-600">BPM</span>
    </p>
  );
}
