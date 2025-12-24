import { Suspense } from "react";

import { BPM } from "@/components/sections/profile/health/bpm";
import { AnimatedHeart } from "@/components/sections/profile/health/hearth";
import { kv } from "@vercel/kv";

import { timeAgo } from "@/utils/dates";

function BaseComponent({ bpm, date }: { bpm: number; date?: string }) {
  return (
    <div className="h-auto xl:h-52 rounded-xl shadow-lg w-full overflow-hidden bg-gradient-to-br from-red-50 via-rose-100 to-red-50 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center h-full pt-4">
        <AnimatedHeart bpm={bpm} />
      </div>

      <div className="text-left px-4 pb-4">
        <BPM bpm={bpm} />
        <p className="text-red-600 text-xs">{date ? timeAgo(date) : "Unknown"}</p>
      </div>
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
