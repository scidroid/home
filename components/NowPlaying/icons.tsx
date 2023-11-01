"use client";

import { usePrefersReducedMotion } from "@/hooks/motion";
import { motion } from "framer-motion";

export function StaticIcon() {
  return (
    <div className="h-[30px] w-[30px] flex items-end space-x-1">
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[4px] bg-slate-700" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[4px] bg-slate-700" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[4px] bg-slate-700" />
      </div>
    </div>
  );
}

export function Icon() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="h-[30px] w-[30px] flex items-end space-x-1">
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: prefersReducedMotion ? [4, 22] : [4, 30, 4],
          }}
          transition={{
            ease: "linear",
            duration: prefersReducedMotion ? 0.5 : 2.2,
            repeat: prefersReducedMotion ? 0 : Infinity,
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: prefersReducedMotion ? [4, 30] : [4, 30, 4],
          }}
          transition={{
            ease: "linear",
            duration: prefersReducedMotion ? 0.5 : 2.2,
            repeat: prefersReducedMotion ? 0 : Infinity,
            delay: prefersReducedMotion ? 0 : 1,
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: prefersReducedMotion ? [4, 18] : [4, 30, 4],
          }}
          transition={{
            ease: "linear",
            duration: prefersReducedMotion ? 0.5 : 2.2,
            repeat: prefersReducedMotion ? 0 : Infinity,
            delay: prefersReducedMotion ? 0 : 0.6,
          }}
        />
      </div>
    </div>
  );
}
