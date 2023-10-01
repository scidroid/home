"use client";

import { motion } from "framer-motion";

export function StaticIcon() {
  return (
    <div className="h-[28px] flex items-end space-x-1">
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[12px] bg-slate-700" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[12px] bg-slate-700" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[6px] h-[12px] bg-slate-700" />
      </div>
    </div>
  );
}

export function Icon() {
  return (
    <div className="h-[28px] flex items-end space-x-1">
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: [12, 26, 12],
          }}
          transition={{ ease: "linear", duration: 2.2, repeat: Infinity }}
        />
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: [12, 26, 12],
          }}
          transition={{
            ease: "linear",
            duration: 2.2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <motion.div
          className="w-[6px] bg-slate-700"
          animate={{
            height: [12, 26, 12],
          }}
          transition={{
            ease: "linear",
            duration: 2.2,
            repeat: Infinity,
            delay: 0.6,
          }}
        />
      </div>
    </div>
  );
}
