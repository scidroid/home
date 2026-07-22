"use client";

import Image, { StaticImageData } from "next/image";

import { useCallback, useEffect, useRef, useState } from "react";

import { galleryData } from "@/content/gallery";
import { useIsMobile } from "@/hooks/mobile";
import { motion, useReducedMotion } from "motion/react";

const TIMER_DURATION = 3000;
const SWIPE_THRESHOLD = 3000;

const CARD_POSITIONS = [
  { x: 0, y: 0, zIndex: 3, rotate: 0 },
  { x: 18, y: 6, zIndex: 2, rotate: 1.5 },
  { x: -12, y: 12, zIndex: 1, rotate: -1.5 },
  { x: 6, y: 18, zIndex: 0, rotate: 1 }
];

const MOBILE_CARD_POSITIONS = [
  { x: 0, y: 0, zIndex: 3, rotate: 0 },
  { x: 6, y: 2, zIndex: 2, rotate: 1.5 },
  { x: -4, y: 4, zIndex: 1, rotate: -1.5 },
  { x: 2, y: 6, zIndex: 0, rotate: 1 }
];

const REDUCED_MOTION_POSITIONS = [
  { x: 0, y: 0, zIndex: 3, rotate: 0 },
  { x: 10, y: 4, zIndex: 2, rotate: 0 },
  { x: -6, y: 8, zIndex: 1, rotate: 0 },
  { x: 4, y: 12, zIndex: 0, rotate: 0 }
];

const MOBILE_REDUCED_MOTION_POSITIONS = [
  { x: 0, y: 0, zIndex: 3, rotate: 0 },
  { x: 4, y: 2, zIndex: 2, rotate: 0 },
  { x: -2, y: 3, zIndex: 1, rotate: 0 },
  { x: 1, y: 4, zIndex: 0, rotate: 0 }
];

function ProfileCard({
  caption,
  src,
  alt,
  date,
  location,
  priority
}: {
  caption: string;
  src: StaticImageData;
  alt: string;
  date?: string;
  location?: string;
  priority?: boolean;
}) {
  return (
    <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-137.5 xl:h-137.5 rounded-xl overflow-hidden text-left shadow-md">
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        width={640}
        height={640}
        sizes="(min-width: 1280px) 550px, (min-width: 1024px) 24rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 12rem"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        draggable={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 hidden lg:block text-left">
        <div className="bg-black/30 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-white/10">
          <p className="text-white font-medium leading-relaxed">{caption}</p>
          {(date || location) && (
            <p className="text-white/70 text-sm mt-1">
              {[location, date].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const paginate = useCallback((direction: number) => {
    setCurrentIndex(
      i => (i + direction + galleryData.length) % galleryData.length
    );
  }, []);

  const pause = useCallback(() => setIsPlaying(false), []);
  const resume = useCallback(() => setIsPlaying(true), []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        paginate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Auto-play timer; the visual progress ring is a pure CSS animation
  // (see .gallery-progress-ring) kept in sync by sharing TIMER_DURATION.
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const timer = setTimeout(() => paginate(1), TIMER_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, paginate, prefersReducedMotion]);

  const getPosition = (index: number) => {
    let positions: typeof CARD_POSITIONS;
    if (prefersReducedMotion) {
      positions = isMobile
        ? MOBILE_REDUCED_MOTION_POSITIONS
        : REDUCED_MOTION_POSITIONS;
    } else {
      positions = isMobile ? MOBILE_CARD_POSITIONS : CARD_POSITIONS;
    }
    const pos =
      (index - currentIndex + galleryData.length) % galleryData.length;
    return positions[Math.min(pos, positions.length - 1)];
  };

  const currentItem = galleryData[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-fit mx-auto"
      onMouseEnter={pause}
      onMouseLeave={resume}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
    >
      <div
        className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-137.5 xl:h-137.5"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="sr-only">
          Showing image {currentIndex + 1} of {galleryData.length}:{" "}
          {currentItem.alt}
        </p>
        {galleryData.map((item, index) => {
          const position = getPosition(index);
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              animate={position}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 18, mass: 0.9 }
              }
              drag={isActive && !prefersReducedMotion ? "x" : false}
              dragConstraints={
                isMobile ? { left: -10, right: 10 } : { left: -25, right: 25 }
              }
              dragElastic={0.1}
              onDragStart={pause}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -SWIPE_THRESHOLD) paginate(1);
                else if (swipe > SWIPE_THRESHOLD) paginate(-1);
                resume();
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ zIndex: position.zIndex }}
              aria-hidden={!isActive}
            >
              <ProfileCard
                caption={item.caption}
                src={item.src}
                alt={item.alt}
                date={item.date}
                location={item.location}
                priority={index === 0}
              />
            </motion.div>
          );
        })}
      </div>

      <div
        className="flex justify-end items-center gap-2 sm:gap-3 mt-4 sm:mt-8"
        role="group"
        aria-label="Gallery controls"
      >
        <div
          key={`${currentIndex}-${isPlaying}`}
          className="gallery-progress-ring relative bg-gray-50 rounded-full px-4 py-2"
          style={{
            animation:
              isPlaying && !prefersReducedMotion
                ? `gallery-progress ${TIMER_DURATION}ms linear forwards`
                : "none"
          }}
          aria-live="polite"
        >
          <span className="text-gray-600 text-sm font-medium tabular-nums">
            {currentIndex + 1}/{galleryData.length}
          </span>
        </div>

        <button
          onClick={() => paginate(-1)}
          className="bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-gray-600 rounded-full p-3 sm:p-2 motion-safe:transition-colors shadow-lg"
          aria-label="Previous image"
        >
          <span
            className="block h-4 w-4 leading-4 text-center"
            aria-hidden="true"
          >
            ‹
          </span>
        </button>

        <button
          onClick={() => paginate(1)}
          className="bg-gray-50 border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-gray-600 rounded-full p-3 sm:p-2 motion-safe:transition-colors shadow-lg"
          aria-label="Next image"
        >
          <span
            className="block h-4 w-4 leading-4 text-center"
            aria-hidden="true"
          >
            ›
          </span>
        </button>
      </div>
    </div>
  );
}
