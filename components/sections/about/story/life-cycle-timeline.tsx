"use client";

import { lifeCycleData } from "@/components/sections/about/story/data";
import { Emoji } from "@/components/ui/emoji";

export function LifeCycleTimeline() {
  return (
    <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-amber-200/40">
      <div className="mb-4 pb-3 border-b border-amber-200/40">
        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
          The Life Cycle of Preventable Death
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Global mortality at every stage of human life
        </p>
      </div>

      <div className="absolute left-[28px] sm:left-[38px] top-[88px] bottom-16 w-0.5 bg-linear-to-b from-amber-400 via-amber-300 to-amber-200" />
      <div className="space-y-0.5">
        {lifeCycleData.map((stage, index) => (
          <div
            key={index}
            className="relative flex items-center gap-3 sm:gap-4 py-3 pl-11 sm:pl-14"
          >
            <div className="absolute left-1.5 sm:left-3 w-5 h-5 rounded-full bg-amber-50 border-2 border-amber-400 flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <Emoji symbol={stage.icon} className="w-5 h-5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-gray-900">
                  {stage.stage}
                </span>
                <a
                  href={stage.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-600/80 hover:text-amber-700 underline decoration-amber-300 underline-offset-2 transition-colors"
                >
                  {stage.sourceName}
                </a>
              </div>
              <p className="text-sm text-amber-700 font-medium">
                {stage.deaths}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 border-t border-amber-200/40 pt-3 mt-3 ">
        Data from WHO, UNICEF, UNAIDS, UNFPA (2023–25)
      </p>
    </div>
  );
}
