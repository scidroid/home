"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <h2
      className="text-4xl font-semibold max-w-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={titles[currentIndex].title}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
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
