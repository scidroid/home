import { Suspense } from "react";

import { kv } from "@vercel/kv";

import { AnimatedHeart } from "./hearth";

export async function HealthData() {
  const health = (await kv.get("health")) as { value: number };

  return (
    <div className="flex items-center gap-x-2">
      <AnimatedHeart bpm={health?.value} />
      <p className="text-lg lg:text-xl">
        My heart is beating <Suspense fallback="...">{health?.value}</Suspense>{" "}
        times per minute
      </p>
    </div>
  );
}
