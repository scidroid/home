import { Suspense } from "react";

import { ViewsCounter } from "@/components/content/views/counter";

import { getReadingViews } from "@/lib/views";

async function ViewsFetcher({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  const number = await getReadingViews(slug);

  return (
    <span>
      <ViewsCounter views={number} slug={slug} track={trackView} /> views
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
