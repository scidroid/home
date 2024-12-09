"use client";

import { useEffect, useRef, useState } from "react";

import { useInView, useReducedMotion } from "motion/react";

import { AnimatedNumber } from "../ui/animated-number";

export function ViewsCounter({ views }: { views: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const isReduced = useReducedMotion();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setValue(views);
    }
  }, [views, isInView]);

  return (
    <span ref={ref}>
      <AnimatedNumber
        springOptions={{
          bounce: 0,
          duration: isReduced ? 0 : 2000
        }}
        value={value}
      />
    </span>
  );
}
