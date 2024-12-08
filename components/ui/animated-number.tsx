"use client";

import { useEffect } from "react";

import { cn } from "@/utils/classnames";
import { SpringOptions, motion, useSpring, useTransform } from "motion/react";

export function AnimatedNumber({
  value,
  className,
  springOptions
}: {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
}) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, current =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
