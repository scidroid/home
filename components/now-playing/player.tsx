/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useRef, useState } from "react";

import { PauseIcon, PlayIcon } from "lucide-react";

export function Player({
  artwork,
  preview
}: {
  artwork: string;
  preview: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => {
        setIsPlaying(false);
        audioElement.currentTime = 0;
      };
      audioElement.addEventListener("ended", handleEnded);
      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  return (
    <div
      className="relative rounded-full h-24 w-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* @ts-ignore */}
      <img
        src={artwork}
        alt=""
        className="rounded-full h-24 w-24 object-cover"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full backdrop-blur-sm cursor-pointer transition-opacity duration-300 ${
          isHovered || isPlaying ? "opacity-100" : "opacity-0"
        }`}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseIcon size={32} color="white" fill="white" />
        ) : (
          <PlayIcon size={32} color="white" fill="white" />
        )}
      </div>
      <audio ref={audioRef} src={preview} />
    </div>
  );
}
