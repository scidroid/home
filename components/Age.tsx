"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "framer-motion";

export function Age() {
  const prefersReducedMotion = useReducedMotion();

  const calcAge = () => {
    const birthday = +new Date("August 16, 2007");
    const ageWithDecimals = ((Date.now() - birthday) / 31557600000).toFixed(9);

    return ageWithDecimals;
  };

  const [age, setAge] = useState("16");

  useEffect(() => {
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setAge(calcAge());
      }, 100);

      return () => clearInterval(interval);
    } else {
      setAge(calcAge());
    }
  }, [prefersReducedMotion]);

  return <span className="tabular-nums">{age}</span>;
}
