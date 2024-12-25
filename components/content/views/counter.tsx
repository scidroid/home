"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { useInView, useReducedMotion } from "motion/react";

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
