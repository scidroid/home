import { readings } from "@/content/readings";
import { kv } from "@vercel/kv";

export async function getReadingViews(slug: string) {
  const reading = readings.find(reading => slug == reading.metadata.slug);

  if (!reading) return 0;

  return await kv.get(reading.metadata.slug);
}

export async function addView(slug: string) {
  const reading = readings.find(reading => slug == reading.metadata.slug);

  if (!reading) return 0;

  return await kv.incr(reading.metadata.slug);
}
