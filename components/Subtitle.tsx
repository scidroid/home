"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const titles = [
  {
    title: "Founder @ ASOFI",
    link: "https://asofi.us",
  },
  {
    title: "Informatics Gold Medal",
    link: "https://oc.uan.edu.co",
  },
  {
    title: "Research @ Stanford",
    link: "https://stanford.edu",
  },
  {
    title: "High School Junior",
    link: null,
  },
];

export function Subtitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isHovered && !prefersReducedMotion) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isHovered, prefersReducedMotion]);

  return (
    <h2
      className="text-2xl font-semibold lg:text-4xl"
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
