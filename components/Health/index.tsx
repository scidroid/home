import { Suspense } from "react";

import { kv } from "@vercel/kv";

import { AnimatedHeart } from "./hearth";

function BaseComponent({ bpm }: { bpm: number }) {
  return (
    <div className="flex items-center gap-x-2">
      <AnimatedHeart bpm={bpm} />
      <p className="text-lg text-left">{`My heart is beating ${
        bpm === 0 ? "..." : bpm
      } times per minute`}</p>
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
