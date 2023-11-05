import { getNowPlaying } from "@/lib/music";

import { Icon, StaticIcon } from "./icons";

export async function NowPlaying() {
  const song = await getNowPlaying();

  if (!song.isPlaying) {
    return (
      <div className="flex items-center gap-x-2">
        <StaticIcon />
        <p className="text-lg lg:text-xl">Not playing anything</p>
      </div>
    );
  }

  function truncate(text: string, maxLength: number) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const truncatedTitle = truncate(song.title, 20);
  const truncatedArtist = truncate(song.artist, 20);

  return (
    <div className="flex items-center gap-x-2">
      <Icon />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={song.url}
        className="text-lg lg:text-xl"
      >
        Playing {truncatedTitle} by {truncatedArtist}
      </a>
    </div>
  );
}
