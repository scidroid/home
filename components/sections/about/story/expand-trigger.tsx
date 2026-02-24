"use client";

import { motion } from "motion/react";

export function ExpandTrigger({
  isExpanded,
  caption
}: {
  isExpanded: boolean;
  caption: string;
}) {
  return (
    <div className="relative flex flex-col items-center pt-5 cursor-pointer group">
      {/* Partial dashed border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 2"
            className="text-amber-300 group-hover:text-amber-400 transition-colors"
          />
        </svg>
      </div>

      {/* Caption */}
      <span className="text-xs text-amber-600/70 group-hover:text-amber-700 transition-colors mb-1.5 mt-2">
        {caption}
      </span>

      {/* Animated arrow */}
      <motion.div
        animate={{
          y: isExpanded ? 0 : [0, 2, 0]
        }}
        transition={{
          duration: 1.2,
          repeat: isExpanded ? 0 : 3,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <motion.svg
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-4 h-4 text-amber-500/60 group-hover:text-amber-600 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>

        {/* Subtle pulse ring */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full border border-amber-400/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: 3,
              ease: "easeOut"
            }}
            style={{ margin: "-4px" }}
          />
        )}
      </motion.div>
    </div>
  );
}
