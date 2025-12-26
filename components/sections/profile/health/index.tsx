import { Suspense } from "react";

import { BPM } from "@/components/sections/profile/health/bpm";
import { AnimatedHeart } from "@/components/sections/profile/health/hearth";
import { kv } from "@vercel/kv";

import { timeAgo } from "@/utils/dates";

function BaseComponent({ bpm, date }: { bpm: number; date?: string }) {
  const timeText = date ? timeAgo(date) : "";

  return (
    <article
      className="h-auto xl:h-52 rounded-xl shadow-lg w-full overflow-hidden bg-linear-to-br from-red-50 via-rose-100 to-red-50 flex flex-col justify-between"
      aria-label={bpm > 0 ? `Heart rate: ${bpm} beats per minute` : "Heart rate loading"}
    >
      <div className="flex flex-col items-center justify-center h-full pt-4" aria-hidden="true">
        <AnimatedHeart bpm={bpm} />
      </div>

      <div className="text-left px-4 pb-4">
        <BPM bpm={bpm} />
        <p className="text-red-600 text-xs">
          {timeText && <span>{timeText} from my Apple Watch</span>}
          {!timeText && <span>from my Apple Watch</span>}
        </p>
      </div>
    </article>
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
