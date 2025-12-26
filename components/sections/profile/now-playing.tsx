"use client";

import { useEffect, useState } from "react";

import { type Music } from "@/lib/music";

/* eslint-disable @next/next/no-img-element */

function StatusBadge({
  isPlaying,
  hasContent
}: {
  isPlaying: boolean;
  hasContent: boolean;
}) {
  const status = isPlaying
    ? { text: "Now Playing", color: "bg-green-500" }
    : hasContent
      ? { text: "Last Played", color: "bg-orange-500" }
      : { text: "Offline", color: "bg-gray-500" };

  return (
    <div className="absolute top-2 right-2 rounded-full px-1.5 py-0.5 bg-black/50 z-20 flex items-center gap-1">
      <div className={`w-1.5 h-1.5 rounded-full ${status.color}`} />
      <p className="text-gray-200 text-[10px]">{status.text}</p>
    </div>
  );
}

function SongCard({
  children,
  className = "",
  ariaLabel
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <article
      className={`relative h-auto min-h-32 xl:h-52 rounded-xl shadow-lg w-full overflow-hidden bg-red-200 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </article>
  );
}

export function NowPlayingWidget({ song }: { song: Music }) {
  if (!song.artwork || !song.title) {
    return (
      <SongCard ariaLabel="Music player loading">
        <StatusBadge isPlaying={song.isPlaying} hasContent={false} />
        <div
          className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-700 to-gray-900 motion-safe:animate-pulse"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="block bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-white/10">
            <div className="h-4 w-32 bg-white/20 rounded mb-2 motion-safe:animate-pulse" aria-hidden="true" />
            <div className="h-3 w-24 bg-white/10 rounded motion-safe:animate-pulse" aria-hidden="true" />
          </div>
        </div>
      </SongCard>
    );
  }

  const statusText = song.isPlaying ? "Now playing" : "Last played";

  return (
    <SongCard ariaLabel={`${statusText}: ${song.title} by ${song.artist}`}>
      <StatusBadge isPlaying={song.isPlaying} hasContent={!!song.title} />
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={song.artwork}
          alt=""
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable="false"
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <a
          href={song.url ?? "/"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Listen to ${song.title} by ${song.artist} (opens in new tab)`}
          className="block bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg text-white shadow-lg border border-white/10 text-left max-w-full focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <div className="w-full overflow-hidden">
            <p className="font-semibold text-base truncate">{song.title}</p>
            <p className="text-zinc-300 text-sm truncate">{song.artist}</p>
          </div>
        </a>
      </div>
    </SongCard>
  );
}

export function NowPlaying() {
  const [song, setSong] = useState<Music>({ isPlaying: false });

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch("/api/music");

        if (!response.ok) throw new Error("Failed to fetch song");

        setSong(await response.json());
      } catch (error) {
        setSong({ isPlaying: false });
      }
    }

    fetchSong();
    const interval = setInterval(fetchSong, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <NowPlayingWidget song={song} />;
}
