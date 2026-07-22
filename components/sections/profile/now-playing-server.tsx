import { Suspense } from "react";

import { NowPlaying } from "@/components/sections/profile/now-playing";

import { getNowPlaying } from "@/lib/music";

async function NowPlayingFetcher() {
  const song = await getNowPlaying();

  return <NowPlaying initial={song} />;
}

// Server-renders the current song into the (revalidated) static HTML so the
// first paint shows real content; the client then polls for live updates.
export function NowPlayingSection() {
  return (
    <Suspense fallback={<NowPlaying />}>
      <NowPlayingFetcher />
    </Suspense>
  );
}
