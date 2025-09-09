/* eslint-disable jsx-a11y/alt-text, @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readings } from "@/content/readings";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const fontRegular = fetch(
    new URL("../../../public/fonts/onest-400.ttf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const fontBold = fetch(
    new URL("../../../public/fonts/onest-700.ttf", import.meta.url)
  ).then(res => res.arrayBuffer());

  const { searchParams, origin } = new URL(req.url);

  // Get the article ID from search params
  const articleId = searchParams.get("id");
  
  let title = "Juan Almanza"; // Default title
  
  if (articleId) {
    // Find the article by slug
    const article = readings.find(reading => reading.metadata.slug === articleId);
    if (article) {
      title = article.metadata.title;
    }
    // If article not found, keep default title
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          padding: "160px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "1800px"
          }}
        >
          <img
            src={`${origin}/juan.jpg`}
            width="480"
            height="480"
            style={{
              borderRadius: "40px",
              objectFit: "cover",
              marginBottom: "80px",
              border: "8px solid #E5E7EB"
            }}
          />
          <h1
            style={{
              fontSize: title.length > 30 ? "112px" : "144px",
              fontFamily: "Onest",
              color: "#1F2937",
              lineHeight: 1.2,
              marginBottom: "48px",
              fontWeight: 700,
              textWrap: "balance"
            }}
          >
            {title}
          </h1>
          {title !== "Juan Almanza" && (
            <p 
              style={{ 
                fontSize: "64px", 
                fontFamily: "Onest",
                color: "#6B7280",
                fontWeight: 500
              }}
            >
              by Juan Almanza
            </p>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            fontSize: "48px",
            fontFamily: "Onest",
            color: "#9CA3AF"
          }}
        >
          scidroid.co
        </div>
      </div>
    ),
    {
      width: 2400,
      height: 1260,
      fonts: [
        {
          name: "Onest",
          data: await fontRegular,
          weight: 400,
          style: "normal"
        },
        {
          name: "Onest",
          data: await fontBold,
          weight: 700,
          style: "normal"
        }
      ]
    }
  );
}
