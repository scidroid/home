import { Suspense } from "react";

import { addView, getReadingViews } from "@/lib/views";

async function ViewsFetcher({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  const number = trackView ? await addView(slug) : await getReadingViews(slug);

  return <span>{`${number} views`}</span>;
}

export function Views({
  slug,
  trackView
}: {
  slug: string;
  trackView?: boolean;
}) {
  return (
    <Suspense fallback={<span>... views</span>}>
      <ViewsFetcher slug={slug} trackView={trackView} />
    </Suspense>
  );
}
