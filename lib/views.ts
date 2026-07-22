import { readings } from "@/content/readings";

import { redis } from "@/lib/redis";

export async function getReadingViews(slug: string) {
  const reading = readings.find(reading => slug == reading.metadata.slug);

  if (!reading) return 0;

  return await redis.get<number>(reading.metadata.slug);
}

export async function addView(slug: string) {
  const reading = readings.find(reading => slug == reading.metadata.slug);

  if (!reading) return 0;

  return await redis.incr(reading.metadata.slug);
}
