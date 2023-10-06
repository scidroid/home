import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const mainFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://home.scidroid.co"),
  title: {
    default: "Juan Almanza",
    template: "%s | Juan Almanza",
  },
  description:
    "Juan is a 16 years old passionate High School student from Colombia with solid leadership and engineering skills. Focused on creating solutions for rural populations and advocating for STEM education and gender equality.",
  openGraph: {
    title: "Juan Almanza",
    description:
      "Juan is a 16 years old passionate High School student from Colombia with solid leadership and engineering skills. Focused on creating solutions for rural populations and advocating for STEM education and gender equality.",
    url: "https://home.scidroid.co",
    siteName: "Juan Almanza",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://home.scidroid.co/api/og",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Juan Almanza",
    card: "summary_large_image",
    images: ["https://home.scidroid.co/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className} absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`}
      >
        <div className="flex justify-center scroll-smooth">
          <div className="max-w-2xl lg:max-w-7xl w-full m-1 lg:m-0">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
