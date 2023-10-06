/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { NextRequest, ImageResponse } from "next/server";

export const runtime = "edge";

const boldFont = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const bold = await boldFont;

  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "Juan Almanza";
  const subtitle =
    title === "Juan Almanza" ? "Builder and researcher" : "Juan Almanza";

  return new ImageResponse(
    (
      <div
        tw="flex bg-white w-full h-full items-center justify-center bg-white"
        style={{
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
        }}
      >
        <div tw="flex flex-col w-1/2 ml-16 text-neutral-700">
          <h1 tw="text-7xl font-extrabold mb-2 max-w-xl">{title}</h1>
          <p tw="text-4xl font-semibold max-w-xl">{subtitle}</p>
        </div>
        <img tw="max-w-1/2 h-full w-full" src={`${origin}/headshot.jpg`} />
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: bold,
          weight: 700,
        },
      ],
    }
  );
}
