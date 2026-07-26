"use client";

import { useEffect, useState } from "react";

import { Emoji } from "@/components/ui/emoji";
import { useReducedMotion } from "motion/react";

// Apple draws the globe emoji from three angles — cycling them spins the
// planet, flip-book style. Clean cuts read better than crossfades here:
// the three drawings aren't true rotation frames, so blending them looks
// like morphing instead of spinning.
const GLOBES = ["🌍", "🌎", "🌏"] as const;

export function SpinningEarth({ className }: { className?: string }) {
  const [frame, setFrame] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setFrame(f => (f + 1) % GLOBES.length);
    }, 450);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return <Emoji symbol={GLOBES[frame]} className={className} />;
}
