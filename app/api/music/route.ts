import { getNowPlaying } from "@/lib/music";

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();

    return Response.json(nowPlaying);
  } catch (error) {
    console.error("Error fetching now playing:", error);

    return Response.json({ isPlaying: false }, { status: 500 });
  }
}
