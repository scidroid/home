import { NextRequest, ImageResponse } from "next/server";

export const runtime = "edge";

const regularFont = fetch(
  new URL("../../../public/fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  new URL("../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const [regular, bold] = await Promise.all([regularFont, boldFont]);

  const { searchParams, origin } = new URL(req.url);
  const title = searchParams.get("title") || "Juan Almanza";
  const subtitle =
    title === "Juan Almanza" ? "Builder and researcher" : "Juan Almanza";

  return new ImageResponse(
    (
      <div tw="flex bg-white w-full h-full items-center justify-center p-8 bg-white">
        <div tw="flex items-center justify-center w-full h-full rounded-xl border border-neutral-200 rounded">
          <img
            tw="rounded-full w-72 mr-12"
            src={`${origin}/headshot.jpg`}
          />
          <div tw="flex flex-col">
            <h1 tw="font-bold text-6xl max-w-140">{title}</h1>
            <p tw="text-4xl">{subtitle}</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: regular,
          weight: 400,
        },
        {
          name: "Inter",
          data: bold,
          weight: 700,
        },
      ],
    }
  );
}
