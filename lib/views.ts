import { kv } from "@vercel/kv";
import { allReadings } from "contentlayer/generated";

export function getReadingViews(slug: string) {
  const reading = allReadings.find(reading => slug == reading.slug);

  if (!reading) return 0;

  return kv.get(reading.slug);
}

export function addView(slug: string) {
  const reading = allReadings.find(reading => slug == reading.slug);

  if (!reading) return 0;

  return kv.incr(reading.slug);
}
