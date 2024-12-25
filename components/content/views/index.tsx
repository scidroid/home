import { Suspense } from "react";

import { ViewsCounter } from "@/components/content/views/counter";

import { addView, getReadingViews } from "@/lib/views";

async function ViewsFetcher({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  const number = (
    trackView ? await addView(slug) : await getReadingViews(slug)
  ) as number;

  return (
    <span>
      <ViewsCounter views={number} /> views
    </span>
  );
}

export function Views({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  return (
    <Suspense
      fallback={
        <span>
          <ViewsCounter views={0} /> views
        </span>
      }
    >
      <ViewsFetcher slug={slug} trackView={trackView} />
    </Suspense>
  );
}
