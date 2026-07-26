"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// Formulas are MathML, which every current browser renders natively. This
// keeps real mathematical notation without a formula library.
export function Formula({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-1.5 overflow-x-auto rounded-md bg-gray-50 px-2.5 py-2 text-center text-[13px] text-gray-800">
      {children}
    </div>
  );
}

export function NoteHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1 mt-3 font-mono text-[9px] uppercase tracking-wider text-gray-400">
      {children}
    </p>
  );
}

export function InfoNote({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={label}
        className={`flex h-4 w-4 items-center justify-center rounded-full border font-mono text-[9px] leading-none transition-colors ${
          open
            ? "border-gray-500 bg-gray-900 text-white"
            : "border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600"
        }`}
      >
        i
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.99 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
            className="absolute bottom-full right-0 z-40 mb-2 max-h-[26rem] w-[21rem] max-w-[85vw] origin-bottom-right overflow-y-auto rounded-xl border border-gray-200 bg-white p-3.5 text-left shadow-xl ring-1 ring-gray-900/5"
          >
            <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-gray-400">
              How this works
            </p>

            <div className="space-y-2 text-[12px] leading-relaxed text-gray-600">
              {children}
            </div>

            <span className="absolute -bottom-1 right-1.5 h-2 w-2 rotate-45 border-b border-r border-gray-200 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
