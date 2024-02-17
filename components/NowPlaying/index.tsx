import { Suspense } from "react";

import { getNowPlaying } from "@/lib/music";

import { Icon } from "./icons";

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function BaseComponent({
  song
}: {
  song?: {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    url?: string;
  };
}) {
  const isLoading = !song;
  const { isPlaying = false, title = "...", artist = "..." } = song || {};
  const notPlaying = !isLoading && !isPlaying;

  let message = `Playing ${truncate(title, 17)} by ${truncate(artist, 17)}`;
  if (notPlaying) message = "Not playing anything";

  return (
    <div className="flex items-center gap-x-2">
      <Icon isPlaying={isPlaying} />
      <p className="text-lg text-left">{message}</p>
    </div>
  );
}

async function AsyncNowPlaying() {
  const song = await getNowPlaying();

  return <BaseComponent song={song} />;
}

export function NowPlaying() {
  return (
    <Suspense fallback={<BaseComponent />}>
      <AsyncNowPlaying />
    </Suspense>
  );
}
