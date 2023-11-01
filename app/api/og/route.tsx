/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const extraboldFont = fetch(
  new URL("../../../public/fonts/Geist-Black.otf", import.meta.url)
).then((res) => res.arrayBuffer());

const semiboldFont = fetch(
  new URL("../../../public/fonts/Geist-SemiBold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const [extrabold, semibold] = await Promise.all([
    extraboldFont,
    semiboldFont,
  ]);

  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "Juan Almanza";
  const subtitle =
    title === "Juan Almanza" ? "Builder and researcher" : "Juan Almanza";

  return new ImageResponse(
    (
      <div tw="flex bg-white w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col w-1/2 ml-16 text-neutral-700">
          <h1 tw="text-9xl font-extrabold mb-2">{title}</h1>
          <p tw="text-7xl font-semibold">{subtitle}</p>
        </div>
        <img
          tw="max-w-1/2 h-full w-full"
          src={`${origin}/headshot.png`}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Vercel Sans",
          data: extrabold,
          weight: 800,
        },
        {
          name: "Vercel Sans",
          data: semibold,
          weight: 600,
        },
      ],
    }
  );
}
