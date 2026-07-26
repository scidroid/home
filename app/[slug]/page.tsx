import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Views } from "@/components/mdx/views";
import { Age } from "@/components/sections/profile/age";
import { Link } from "@/components/ui/link";
import { GithubLogo, LinkedinLogo, XLogo } from "@/components/ui/social-icons";
import { copy } from "@/content/copy";
import { getReading, getReadings } from "@/content/readings";

import { formatDate } from "@/utils/dates";

import headshot from "@/public/juan.webp";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const metadata = await getReading(slug);

  if (!metadata) return;

  const ogImage = `https://almanza.cc/api/og?id=${metadata.slug}`;

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.date,
      url: `https://almanza.cc/${metadata.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
      images: [ogImage]
    }
  };
}

export async function generateStaticParams() {
  const readings = await getReadings();
  return readings.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const metadata = await getReading(slug);

  if (!metadata) notFound();

  const { default: Post } = await import(`@/content/readings/${slug}.mdx`);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    datePublished: metadata.date,
    dateModified: metadata.date,
    description: metadata.summary,
    image: `https://almanza.cc/api/og?id=${metadata.slug}`,
    url: `https://almanza.cc/${metadata.slug}`,
    author: {
      "@type": "Person",
      name: "Juan Almanza"
    }
  };

  return (
    <div className="flex mt-24 justify-center">
      <section className="my-8 max-w-3xl xl:my-12">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        ></script>

        <h1 className="text-center text-balance text-4xl font-extrabold xl:text-7xl font-heading mb-8">
          {metadata.title}
        </h1>

        <p className="my-4 text-center text-lg xl:my-6 xl:text-xl">
          <Views slug={metadata.slug} trackView />
          {" - "}
          {formatDate(metadata.date)}
        </p>
        <p className="my-4 text-center text-lg xl:my-6 xl:text-xl">
          {metadata.summary}
        </p>

        <article className="mt-12">
          <Post />
        </article>

        <hr className="mt-16 mb-12 border-gray-200" />

        <section className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src={headshot}
              alt="Headshot of Juan Almanza, an undergraduate student from Colombia"
              className="w-20 h-20 rounded-lg object-cover shrink-0"
              width={80}
              priority
              placeholder="blur"
              draggable={false}
            />

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h2 className="text-lg font-bold text-gray-800 font-heading">
                Written by Juan Almanza
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                A <Age /> years old{" "}
                {copy.about.charAt(0).toLowerCase() + copy.about.slice(1)}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://github.com/scidroid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub (opens in new tab)"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <GithubLogo className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/scidroid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (opens in new tab)"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <XLogo className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/scidroid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn (opens in new tab)"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <LinkedinLogo className="w-5 h-5" />
                </a>
                <span className="text-gray-200">|</span>
                <Link
                  href="/#contact"
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 mb-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; Back home
          </Link>
        </div>
      </section>
    </div>
  );
}
