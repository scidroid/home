"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

import { motion, useMotionValue } from "framer-motion";

export function DragSlider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);
  const [sliderConstraints, setSliderConstraints] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    function calcSliderChildrenWidth() {
      setSliderChildrenWidth(ref.current?.scrollWidth || 0);
    }

    function calcSliderWidth() {
      setSliderWidth(ref.current?.clientWidth || 0);
    }

    function calcSliderConstraints() {
      setSliderConstraints(sliderChildrenWidth - sliderWidth);
    }

    calcSliderChildrenWidth();

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    calcSliderConstraints();
    window.addEventListener("resize", calcSliderConstraints);
  }, [ref, sliderChildrenWidth, sliderWidth]);

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <motion.div
        ref={ref}
        drag="x"
        initial={{ x: 0 }}
        style={{ x }}
        dragConstraints={{
          left: -sliderConstraints,
          right: 0
        }}
        className="flex cursor-grab flex-nowrap justify-between"
      >
        {children}
      </motion.div>
    </div>
  );
}
