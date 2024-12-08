"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "motion/react";

import { AnimatedNumber } from "../ui/animated-number";

export function ViewsCounter({ views }: { views: number }) {
  const isReduced = useReducedMotion();

  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(views);
  }, [views]);

  return (
    <AnimatedNumber
      springOptions={{
        bounce: 0,
        duration: isReduced ? 0 : 2000
      }}
      value={value}
    />
  );
}
