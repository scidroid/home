import { kv } from "@vercel/kv";
import { AnimatedHeart } from "./hearth";

export async function HealthData() {
  const health = (await kv.get("health")) as { value: number };

  return (
    <div className="flex items-center space-x-2 my-2">
      <AnimatedHeart bpm={health?.value} />
      <p className="text-lg text-gray-700">
        My heart is beating {health?.value} times per minute
      </p>
    </div>
  );
}
