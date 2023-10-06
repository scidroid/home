import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const mainFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scidroid.co"),
  title: {
    default: "Juan Almanza",
    template: "%s | Juan Almanza",
  },
  description: "Builder and researcher",
  openGraph: {
    title: "Juan Almanza",
    description: "Builder and researcher",
    url: "https://scidroid.co",
    siteName: "Juan Almanza",
    locale: "en_US",
    type: "website",
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
          <div className="max-w-7xl w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
