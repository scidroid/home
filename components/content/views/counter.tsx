"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { useInView, useReducedMotion } from "motion/react";

export function ViewsCounter({
  views,
  slug,
  track
}: {
  views: number;
  slug?: string;
  track?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const isReduced = useReducedMotion();

  const [value, setValue] = useState(0);
  const [fresh, setFresh] = useState<number | null>(null);

  // Pages are statically generated, so the server-rendered count is from
  // build time. Sync with the live count (and register the view) on mount.
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/views/${slug}`, { method: track ? "POST" : "GET" })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (typeof data?.views === "number") setFresh(data.views);
      })
      .catch(() => {});
  }, [slug, track]);

  const target = fresh ?? views;

  useEffect(() => {
    if (isInView) {
      setValue(target);
    }
  }, [target, isInView]);

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
