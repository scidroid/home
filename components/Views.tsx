import { Suspense } from "react";

import { addView, getReadingViews } from "@/lib/views";

export async function Views({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  const number = trackView ? await addView(slug) : await getReadingViews(slug);

  return (
    <span>
      <Suspense fallback="Loading views">{`${number} views`}</Suspense>
    </span>
  );
}
