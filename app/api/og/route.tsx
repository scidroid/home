/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const titleFont = fetch(
    new URL("../../../public/fonts/title.ttf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const bodyFont = fetch(
    new URL("../../../public/fonts/body.ttf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const { searchParams, origin } = new URL(req.url);

  const title =
    (searchParams.get("title") || "") === ""
      ? "Juan Almanza"
      : searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(to bottom left, #F3F4F6, #FEFCE8)",
          padding: "40px"
        }}
      >
        <img
          src={`${origin}/juan.jpg`}
          width="500"
          height="500"
          style={{
            borderRadius: "12px",
            objectFit: "cover"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "40px",
            flex: 1
          }}
        >
          <p
            style={{
              fontSize: "60px",
              fontFamily: "Playfair Display",
              textWrap: "balance"
            }}
          >
            {title}
          </p>
          {title !== "Juan Almanza" && (
            <p style={{ fontSize: "45px", fontFamily: "Lato" }}>Juan Almanza</p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Playfair Display",
          data: await titleFont,
          weight: 700
        },
        {
          name: "Lato",
          data: await bodyFont,
          weight: 500
        }
      ]
    }
  );
}
