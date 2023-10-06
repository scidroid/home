import { kv } from "@vercel/kv";
import { AnimatedHeart } from "./hearth";

export async function HealthData() {
  const health = (await kv.get("health")) as { value: number };

  return (
    <div className="flex items-center space-x-2 my-4">
      <AnimatedHeart bpm={health?.value} />
      <p className="text-xl">
        My heart is beating {health?.value} times per minute
      </p>
    </div>
  );
}
