"use client";

const ZURICH = 77;
const BUJUMBURA = 6;
const TOTAL = 100;

function PersonIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 20"
      className="w-full h-full"
      fill={color}
      aria-hidden="true"
    >
      <circle cx="8" cy="4.5" r="3.5" />
      <path d="M2 19v-3c0-3 2.7-5 6-5s6 2 6 5v3H2z" />
    </svg>
  );
}

function PersonGrid({ filled, color }: { filled: number; color: string }) {
  return (
    <div className="grid grid-cols-10 gap-[3px] sm:gap-1">
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div key={i} className="aspect-[4/5]">
          <PersonIcon color={i < filled ? color : "#e5e7eb"} />
        </div>
      ))}
    </div>
  );
}

export function EducationDivide() {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-amber-200/40">
      <div className="mb-6 pb-3 border-b border-amber-200/40">
        <h4 className="text-sm font-semibold text-gray-900 tracking-tight">
          100 kids, two cities
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          How many will set foot in a university
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* Zurich */}
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base shrink-0">🇨🇭</span>
              <span className="text-xs font-semibold text-gray-900 truncate">
                Zurich
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-700 leading-none tracking-tight tabular-nums">
              {ZURICH}
              <span className="text-xs text-gray-400 font-normal">/100</span>
            </p>
          </div>
          <PersonGrid filled={ZURICH} color="#059669" />
        </div>

        {/* Bujumbura */}
        <div className="flex flex-col">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-base shrink-0">🇧🇮</span>
              <span className="text-xs font-semibold text-gray-900 truncate">
                Bujumbura
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-red-600 leading-none tracking-tight tabular-nums">
              {BUJUMBURA}
              <span className="text-xs text-gray-400 font-normal">/100</span>
            </p>
          </div>
          <PersonGrid filled={BUJUMBURA} color="#dc2626" />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-amber-200/40 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-gray-900">71 lives apart.</span>{" "}
          <span className="text-gray-500">
            Same age, same planet, different birth.
          </span>
        </p>
      </div>

      <p className="text-[10px] text-gray-400 mt-3 text-center">
        Sources:{" "}
        <a
          href="https://www.unesco.org/gem-report"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          UNESCO GEM
        </a>
        {" · "}
        <a
          href="https://data.worldbank.org/topic/education"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          World Bank
        </a>
        {" (2023)"}
      </p>
    </div>
  );
}
