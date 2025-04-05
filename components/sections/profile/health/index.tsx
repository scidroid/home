import { Suspense } from "react";

import { BPM } from "@/components/sections/profile/health/bpm";
import { AnimatedHeart } from "@/components/sections/profile/health/hearth";
import { kv } from "@vercel/kv";

import { formatDate } from "@/utils/dates";

function BaseComponent({ bpm, date }: { bpm: number; date?: string }) {
  const formattedDate = date ? formatDate(date) : "Unknown";

  return (
    <div className="relative h-auto xl:h-52 rounded-xl border-2 border-red-50 w-full flex flex-row xl:flex-col items-center justify-center gap-4 p-4 bg-gradient-to-bl from-red-50 via-red-100 to-red-50">
      <div className="absolute top-2 right-2 group">
        <div className="w-5 h-5 flex items-center justify-center text-xs text-red-700 bg-red-100 rounded-full cursor-help">
          i
          <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 absolute -top-16 -right-2 w-56 bg-red-50/95 backdrop-blur-sm text-red-800 text-xs px-3 py-2 rounded-lg border border-red-200">
            Last fetched {formattedDate} from my Apple Watch
          </span>
        </div>
      </div>
      <AnimatedHeart bpm={bpm} />
      <BPM bpm={bpm} />
    </div>
  );
}

async function AsyncHealthComponent() {
  const health = (await kv.get("health")) as { value: number; date?: string };

  return <BaseComponent bpm={health.value} date={health.date} />;
}

export function Health() {
  return (
    <Suspense fallback={<BaseComponent bpm={0} />}>
      <AsyncHealthComponent />
    </Suspense>
  );
}
