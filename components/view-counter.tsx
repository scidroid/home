"use client";

import { useEffect } from "react";
import { increment } from "@/actions/views";
import { Views } from "@/types/views";

export function ViewCounter({
  slug,
  allViews,
  trackView,
}: {
  slug: string;
  allViews: Views[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug);
  const number = new Number(viewsForSlug?.count || 0);

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (trackView) {
      increment(slug);
    }
  }, []);

  return <span>{`${number.toLocaleString()} views`}</span>;
}
