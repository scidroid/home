"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const titles = [
  {
    title: "High School Junior",
    link: null
  },
  {
    title: "Founder @ ASOFI",
    link: "https://asofi.us"
  },
  {
    title: "Informatics Gold Medal",
    link: "https://oc.uan.edu.co"
  },
  {
    title: "CS Researcher",
    link: "https://theinformaticists.com/2023/10/09/unveiling-the-orchestra-a-novel-system-for-audio-separation-and-instrument-identification-in-musical-recordings/"
  }
];

export function Subtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const handleVisibilityChange = () => {
    if (document.hidden && intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    } else {
      intervalId.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % titles.length);
      }, 2000);
    }
  };

  useEffect(() => {
    if (!isHovered && !prefersReducedMotion) {
      handleVisibilityChange();
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        if (intervalId.current) clearInterval(intervalId.current);
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [isHovered, prefersReducedMotion]);

  return (
    <h2
      className="text-2xl xl:text-4xl font-semibold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[currentIndex].title}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {titles[currentIndex].link ? (
            <a
              href={titles[currentIndex].link as string}
              target="_blank"
              rel="noopener noreferrer"
            >
              {titles[currentIndex].title}
            </a>
          ) : (
            titles[currentIndex].title
          )}
        </motion.span>
      </AnimatePresence>
    </h2>
  );
}
