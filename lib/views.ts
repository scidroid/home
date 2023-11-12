import { kv } from "@vercel/kv";
import { allReadings } from "contentlayer/generated";

export async function getReadingViews(slug: string) {
  const reading = allReadings.find(reading => slug == reading.slug);

  if (!reading) return 0;

  return await kv.get(reading.slug);
}

export async function addView(slug: string) {
  const reading = allReadings.find(reading => slug == reading.slug);

  if (!reading) return 0;

  return await kv.incr(reading.slug);
}
