import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { IBM_Plex_Mono, Onest } from "next/font/google";

import { ConsoleHelper } from "@/components/console";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { copy } from "@/content/copy";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";

const sansFont = Onest({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
  fallback: ["system-ui", "sans-serif"]
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  fallback: ["monospace"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://testing.scidroid.co"),
  title: {
    default: copy.name,
    template: `%s | ${copy.name}`
  },
  description: copy.about,
  openGraph: {
    title: copy.name,
    description: copy.about,
    url: "https://testing.scidroid.co",
    siteName: copy.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://testing.scidroid.co/api/og"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    title: copy.name,
    card: "summary_large_image",
    images: ["https://testing.scidroid.co/api/og"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${sansFont.variable} ${monoFont.variable} text-gray-800 dark font-body antialiased bg-fixed bg-gradient-to-bl from-blue-50 to-gray-50 p-4`}
          suppressHydrationWarning={true}
        >
          <Header />
          <div className="flex justify-center">
            <main className="max-w-[95vw] xl:max-w-6xl">{children}</main>
          </div>
          <Footer />
          <Analytics />
          <ConsoleHelper />
        </body>
      </html>
    </ViewTransitions>
  );
}
