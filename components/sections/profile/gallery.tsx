"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import { galleryData } from "@/content/gallery";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProfileCardProps {
  caption: string;
  src: any;
  alt: string;
  id: string;
}

function ProfileCard({ caption, src, alt }: ProfileCardProps) {
  return (
    <div className="relative w-60 h-60 xl:w-[550px] xl:h-[550px] rounded-lg overflow-hidden text-left">
      <Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        width={640}
        height={640}
        priority
        draggable={false}
      />

      <div className="absolute bottom-4 left-4 hidden xl:block text-left max-w-[420px]">
        <p className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-lg text-white  font-semibold shadow-lg border border-white/10 leading-relaxed">
          {caption}
        </p>
      </div>
    </div>
  );
}

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const TIMER_DURATION = 3 * 1000;

  const SWIPE_CONFIDENCE_THRESHOLD = 3000;

  function swipePower(offset: number, velocity: number) {
    return Math.abs(offset) * velocity;
  }

  function resetTimer() {
    setProgress(0);
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function startTimer() {
    if (!isPlaying) return;

    resetTimer();

    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 100 / (TIMER_DURATION / 8);
      });
    }, 8);

    intervalRef.current = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % galleryData.length);
    }, TIMER_DURATION);
  }

  function paginate(newDirection: number) {
    setCurrentIndex(prevIndex => {
      if (newDirection === 1) {
        return prevIndex === galleryData.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? galleryData.length - 1 : prevIndex - 1;
      }
    });

    resetTimer();
  }

  function pauseAutoPlay() {
    setIsPlaying(false);
    resetTimer();
  }

  function resumeAutoPlay() {
    setIsPlaying(true);
  }

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    }

    return () => {
      resetTimer();
    };
  }, [currentIndex, isPlaying]);

  function getCardPosition(cardIndex: number) {
    const position =
      (cardIndex - currentIndex + galleryData.length) % galleryData.length;

    if (position === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 3,
        opacity: 1,
        rotate: 0
      };
    } else if (position === 1) {
      return {
        x: 10,
        y: 5,
        scale: 0.993,
        zIndex: 2,
        opacity: 0.96,
        rotate: 0.8
      };
    } else if (position === 2) {
      return {
        x: -6,
        y: 10,
        scale: 0.987,
        zIndex: 1,
        opacity: 0.91,
        rotate: -0.8
      };
    } else {
      return {
        x: 3,
        y: 15,
        scale: 0.983,
        zIndex: 0,
        opacity: 0.7,
        rotate: 0.4
      };
    }
  }

  return (
    <div
      className="relative w-fit mx-auto"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      <div className="relative w-60 h-60 xl:w-[550px] xl:h-[550px]">
        {galleryData.map((item, index) => {
          const position = getCardPosition(index);
          const isActive = index === currentIndex;

          return (
            <motion.div
              key={item.id}
              animate={position}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 40,
                mass: 1,
                bounce: 0.08
              }}
              whileHover={isActive ? { scale: 1.004, rotate: 0 } : {}}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: -8, right: 8 }}
              dragElastic={0.8}
              onDragStart={pauseAutoPlay}
              onDragEnd={(e, { offset, velocity }) => {
                if (isActive) {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
                    paginate(1);
                  } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
                    paginate(-1);
                  }
                }
                resumeAutoPlay();
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ zIndex: position.zIndex }}
            >
              <ProfileCard
                caption={item.caption}
                src={item.src}
                alt={item.alt}
                id={item.id}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-end items-center gap-3 mt-4">
        <div
          className="relative bg-gray-50 border border-gray-200 rounded-full px-4 py-2"
          style={{
            border: "2px solid transparent",
            backgroundImage: `conic-gradient(from 0deg, rgba(0,0,0,0.3) 0deg, rgba(0,0,0,0.3) ${progress * 3.6}deg, rgba(0,0,0,0.05) ${progress * 3.6}deg, rgba(0,0,0,0.05) 360deg)`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box"
          }}
        >
          <span className="relative text-gray-600 text-sm font-medium tabular-nums">
            {currentIndex + 1}/{galleryData.length}
          </span>
        </div>

        <button
          onClick={() => paginate(-1)}
          className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-full p-2 transition-colors shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-full p-2 transition-colors shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
