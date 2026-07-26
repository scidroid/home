import { ImageResponse } from "next/og";

import { copy } from "@/content/copy";
import { getReading } from "@/content/readings";
import { readFile } from "fs/promises";
import { join } from "path";

const pills = [
  { label: "San Francisco, CA", color: "#2563eb" },
  { label: "Founder", color: "#dc2626" },
  { label: "Researcher", color: "#059669" },
  { label: "Software Engineer", color: "#7c3aed" },
  { label: "Minerva '29", color: "#c2410c" },
  { label: "RISE Fellow", color: "#b91c1c" }
];

const WIDTH = 2400;
const HEIGHT = 1260;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("id");

  const isArticle = Boolean(articleId);
  let title = copy.name;
  let summary = "";

  if (articleId) {
    const article = await getReading(articleId);
    if (article) {
      title = article.title;
      summary = article.summary;
    }
  }

  const [fontRegular, fontBold, headshotPng] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/onest-400.ttf")),
    readFile(join(process.cwd(), "public/fonts/onest-700.ttf")),
    readFile(join(process.cwd(), "public/juan-og.png"))
  ]);

  const headshotSrc = `data:image/png;base64,${headshotPng.toString("base64")}`;

  const fonts = [
    {
      name: "Onest",
      data: fontRegular,
      weight: 400 as const,
      style: "normal" as const
    },
    {
      name: "Onest",
      data: fontBold,
      weight: 700 as const,
      style: "normal" as const
    }
  ];

  if (isArticle) {
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          background:
            "linear-gradient(145deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%)"
        }}
      >
        {/* Left — accent strip */}
        <div
          style={{
            width: "14px",
            height: "100%",
            background: "linear-gradient(to bottom, #1f2937, #6b7280)",
            flexShrink: 0
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 100px",
            width: "1500px",
            flexShrink: 0
          }}
        >
          {/* Category label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "48px"
            }}
          >
            <div
              style={{
                width: "56px",
                height: "5px",
                backgroundColor: "#1f2937",
                borderRadius: "3px"
              }}
            />
            <span
              style={{
                fontSize: "34px",
                fontFamily: "Onest",
                fontWeight: 700,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "5px"
              }}
            >
              Article
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: title.length > 35 ? "104px" : "120px",
              fontFamily: "Onest",
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "44px"
            }}
          >
            {title}
          </h1>

          {/* Summary */}
          {summary && (
            <p
              style={{
                fontSize: "42px",
                fontFamily: "Onest",
                color: "#6b7280",
                lineHeight: 1.5,
                margin: 0
              }}
            >
              {summary}
            </p>
          )}
        </div>

        {/* Right — photo + author */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
            padding: "80px",
            width: "886px",
            flexShrink: 0
          }}
        >
          <img
            src={headshotSrc}
            width={400}
            height={400}
            style={{
              borderRadius: "48px",
              border: "6px solid #e5e7eb"
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <span
              style={{
                fontSize: "40px",
                fontFamily: "Onest",
                fontWeight: 700,
                color: "#1f2937"
              }}
            >
              Juan Almanza
            </span>
            <span
              style={{
                fontSize: "30px",
                fontFamily: "Onest",
                color: "#9ca3af"
              }}
            >
              almanza.cc
            </span>
          </div>
        </div>
      </div>,
      { width: WIDTH, height: HEIGHT, fonts }
    );
  }

  // Homepage OG
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background:
          "linear-gradient(145deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%)",
        padding: "100px 120px",
        gap: "100px"
      }}
    >
      {/* Left — headshot */}
      <div
        style={{
          display: "flex",
          flexShrink: 0
        }}
      >
        <img
          src={headshotSrc}
          width={720}
          height={720}
          style={{
            borderRadius: "64px",
            border: "7px solid #e5e7eb"
          }}
        />
      </div>

      {/* Right — text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1
        }}
      >
        <h1
          style={{
            fontSize: "148px",
            fontFamily: "Onest",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: "32px"
          }}
        >
          {copy.name}
        </h1>

        {/* Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px"
          }}
        >
          {pills.map(pill => (
            <div
              key={pill.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "32px",
                fontFamily: "Onest",
                color: "#374151",
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "2px solid #e5e7eb",
                borderRadius: "999px",
                padding: "12px 28px"
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: pill.color
                }}
              />
              {pill.label}
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: "40px",
            fontFamily: "Onest",
            color: "#6b7280",
            lineHeight: 1.5,
            margin: 0,
            marginBottom: "28px"
          }}
        >
          {copy.about}
        </p>

        <span
          style={{
            fontSize: "30px",
            fontFamily: "Onest",
            color: "#9ca3af"
          }}
        >
          almanza.cc
        </span>
      </div>
    </div>,
    { width: WIDTH, height: HEIGHT, fonts }
  );
}
