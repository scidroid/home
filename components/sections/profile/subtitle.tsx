"use client";

import { InfiniteSlider } from "@/components/ui/slider";
import { useReducedMotion } from "motion/react";

const titles = [
  "Founder",
  "Software Engineer",
  "Minerva '29",
  "Researcher",
  "Olympic Medallist",
  "RISE Global Winner"
];

export function Subtitle() {
  const isReducedMotion = useReducedMotion();

  return (
    <InfiniteSlider
      duration={isReducedMotion ? 0 : 40}
      className="max-w-[290px] xl:max-w-none"
    >
      {titles.map((title, key) => (
        <p className="text-xl xl:text-3xl font-heading" key={key}>
          {title}
          <span className="pl-4">•</span>
        </p>
      ))}
    </InfiniteSlider>
  );
}
