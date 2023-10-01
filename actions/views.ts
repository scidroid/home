"use server";

import { kv } from "@vercel/kv";

export async function increment(slug: string) {
  await kv.incr(slug);
}
