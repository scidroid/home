/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const extraboldFont = fetch(
    new URL("../../../public/fonts/Geist-Black.otf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const boldFont = fetch(
    new URL("../../../public/fonts/Geist-Bold.otf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "";

  return new ImageResponse(
    (
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          inset: 0,
          height: "100%",
          width: "100%",
          backgroundImage:
            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundColor: "white"
        }}
      >
        <div tw="flex items-center justify-center">
          <div tw="flex flex-col items-center">
            <img
              src={`${origin}/headshot.jpg`}
              width="800"
              height="800"
              tw="w-72 h-72 rounded-full"
            />
            <p tw="text-4xl text-neutral-700 font-extrabold">Juan Almanza</p>
          </div>
          {title.length > 0 && (
            <p
              tw="text-6xl font-bold text-neutral-700 max-w-[600px] text-center ml-20"
              style={{
                // @ts-ignore - looks like the API it's not correctly typed lol
                textWrap: "balance"
              }}
            >
              {title}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Vercel Sans",
          data: await extraboldFont,
          weight: 800
        },
        {
          name: "Vercel Sans",
          data: await boldFont,
          weight: 700
        }
      ]
    }
  );
}
