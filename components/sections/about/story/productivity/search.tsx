"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Flag } from "@/components/ui/emoji";
import type { Country } from "@/data/productivity";
import { countries } from "@/data/productivity";
import { AnimatePresence, motion } from "motion/react";

// Accents are stripped so "cote" finds Cote d'Ivoire and "peru" finds Perú.
const fold = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const INDEX = countries.map(d => ({ d, key: fold(d.name) }));

export function CountrySearch({
  onPick,
  picked,
  onClear
}: {
  onPick: (d: Country) => void;
  picked: Country | null;
  onClear: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return [];
    return INDEX.filter(r => r.key.includes(q))
      .sort((a, b) => a.key.indexOf(q) - b.key.indexOf(q))
      .slice(0, 6)
      .map(r => r.d);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setQuery("");
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const choose = (d: Country) => {
    onPick(d);
    setQuery("");
  };

  return (
    <div ref={box} className="relative w-full sm:w-52">
      <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-2.5 py-1 focus-within:border-gray-400">
        {picked ? (
          <Flag iso2={picked.iso2} className="h-3.5 w-3.5" />
        ) : (
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3 shrink-0 text-gray-400"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10.5 10.5 14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === "ArrowDown")
              setActive(a => Math.min(a + 1, matches.length - 1));
            else if (e.key === "ArrowUp") setActive(a => Math.max(a - 1, 0));
            else if (e.key === "Enter" && matches[active])
              choose(matches[active]);
            else if (e.key === "Escape") setQuery("");
            else return;
            e.preventDefault();
          }}
          placeholder={picked ? picked.name : "Find your country"}
          aria-label="Find your country"
          className="w-full min-w-0 bg-transparent text-[11px] text-gray-700 outline-none placeholder:text-gray-400"
        />
        {picked && (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Clear ${picked.name}`}
            className="shrink-0 rounded-full px-1 text-[11px] leading-none text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {matches.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.13, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 top-full z-40 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ring-1 ring-gray-900/5"
          >
            {matches.map((d, i) => (
              <li key={d.iso}>
                <button
                  type="button"
                  onPointerDown={e => {
                    e.preventDefault();
                    choose(d);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[11px] ${
                    i === active ? "bg-gray-900/[0.05]" : ""
                  }`}
                >
                  <Flag iso2={d.iso2} />
                  <span className="min-w-0 flex-1 truncate text-gray-700">
                    {d.name}
                  </span>
                  <span className="shrink-0 tabular-nums text-gray-400">
                    ${d.income.toFixed(2)} · {d.hours}h
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
