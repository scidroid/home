import type { Metadata } from "next";

import { ConsoleHelper } from "@/components/ConsoleHelper";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono, GeistSans } from "geist/font";

export const metadata: Metadata = {
  metadataBase: new URL("https://scidroid.co"),
  title: {
    default: "Juan Almanza",
    template: "%s | Juan Almanza"
  },
  description:
    "Juan is a 16 years old passionate High School student from Colombia with solid leadership and engineering skills. Focused on creating solutions for rural populations and advocating for STEM education and gender equality.",
  openGraph: {
    title: "Juan Almanza",
    description:
      "Juan is a 16 years old passionate High School student from Colombia with solid leadership and engineering skills. Focused on creating solutions for rural populations and advocating for STEM education and gender equality.",
    url: "https://scidroid.co",
    siteName: "Juan Almanza",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://scidroid.co/api/og"
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
    title: "Juan Almanza",
    card: "summary_large_image",
    images: ["https://scidroid.co/api/og"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} text-gray-200 dark font-sans antialiased bg-fixed bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 p-4`}
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
  );
}
