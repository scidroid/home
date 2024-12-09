/* eslint-disable @next/next/no-img-element */

import { Suspense } from "react";

import { type NowPlaying, getNowPlaying } from "@/lib/music";

import { Player } from "./player";

export function NowPlayingWidget({ song }: { song: NowPlaying }) {
  return (
    <div className="h-auto xl:h-52 rounded-xl border-2 border-gray-900 w-full flex flex-row xl:flex-col items-center justify-center gap-4 p-4 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
      {song.artwork ? (
        song.preview ? (
          <Player artwork={song.artwork} preview={song.preview} />
        ) : (
          <img
            src={song.artwork}
            alt=""
            className="rounded-full h-24 w-24 object-cover"
          />
        )
      ) : (
        <div className="rounded-full h-24 w-24 bg-gray-700 animate-pulse" />
      )}

      <a
        href={song.url ?? "/"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-left xl:text-center text-gray-200 flex flex-col items-start xl:items-center"
      >
        {song.title ? (
          <p className="font-bold text-lg line-clamp-1">{song.title}</p>
        ) : (
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
        )}
        {song.artist ? (
          <p className="line-clamp-1">{song.artist}</p>
        ) : (
          <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mt-1" />
        )}
      </a>
    </div>
  );
}

async function AsyncNowPlaying() {
  const song = await getNowPlaying();

  return <NowPlayingWidget song={song} />;
}

export function NowPlaying() {
  return (
    <Suspense fallback={<NowPlayingWidget song={{ isPlaying: false }} />}>
      <AsyncNowPlaying />
    </Suspense>
  );
}
