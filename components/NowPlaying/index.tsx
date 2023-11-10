import { ReactNode, Suspense } from "react";

import { getNowPlaying } from "@/lib/music";

import { Icon, StaticIcon } from "./icons";

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-x-2">
      <StaticIcon />
      <p className="text-lg lg:text-xl">{children}</p>
    </div>
  );
}

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export async function NowPlaying() {
  const song = await getNowPlaying();

  return (
    <Suspense fallback={<EmptyState>Loading playing</EmptyState>}>
      {!song.isPlaying ? (
        <EmptyState>Not playing anything</EmptyState>
      ) : (
        <div className="flex items-center gap-x-2">
          <Icon />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={song.url}
            className="text-lg lg:text-xl"
          >
            Playing {truncate(song.title, 20)} by {truncate(song.artist, 20)}
          </a>
        </div>
      )}
    </Suspense>
  );
}
