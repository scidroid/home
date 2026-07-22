import { readings } from "@/content/readings";

import { redis } from "@/lib/redis";

function isValidSlug(slug: string) {
  return readings.some(reading => reading.metadata.slug === slug);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return Response.json({ error: "unknown slug" }, { status: 404 });
  }

  const views = (await redis.get<number>(slug)) ?? 0;

  return Response.json({ views });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    return Response.json({ error: "unknown slug" }, { status: 404 });
  }

  const views = await redis.incr(slug);

  return Response.json({ views });
}
