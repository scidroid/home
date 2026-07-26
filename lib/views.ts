import { getReading } from "@/content/readings";

import { redis } from "@/lib/redis";

export async function getReadingViews(slug: string) {
  const reading = await getReading(slug);

  if (!reading) return 0;

  return (await redis.get<number>(reading.slug)) ?? 0;
}
