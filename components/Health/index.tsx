import { Suspense } from "react";

import { kv } from "@vercel/kv";

import { BPM } from "./bpm";
import { AnimatedHeart } from "./hearth";

function BaseComponent({ bpm }: { bpm: number }) {
  return (
    <div className="h-auto xl:h-52 rounded-xl border-2 border-red-50 w-full flex flex-row xl:flex-col items-center justify-center gap-4 p-4 bg-gradient-to-bl from-red-50 via-red-100 to-red-50">
      <AnimatedHeart bpm={bpm} />
      <BPM bpm={bpm} />
    </div>
  );
}

async function AsyncHealthComponent() {
  const health = (await kv.get("health")) as { value: number };

  return <BaseComponent bpm={health.value} />;
}

export function HealthData() {
  return (
    <Suspense fallback={<BaseComponent bpm={0} />}>
      <AsyncHealthComponent />
    </Suspense>
  );
}
