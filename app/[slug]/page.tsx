import Image from "next/image";
import { notFound } from "next/navigation";

import { Balancer } from "react-wrap-balancer";

import { Views } from "@/components/content/views";
import { Age } from "@/components/sections/profile/age";
import { Link } from "@/components/ui/link";
import { copy } from "@/content/copy";
import { readings } from "@/content/readings";
import type { Metadata } from "next";

import { formatDate } from "@/utils/dates";

import headshot from "@/public/juan.jpg";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;

  const reading = readings.find(reading => reading.metadata.slug === slug);

  if (!reading) return;

  const { metadata } = reading;

  const ogImage = `https://scidroid.co/api/og?title=${metadata.title}`;

  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.date,
      url: `https://scidroid.co/${metadata.slug}`,
      images: [
        {
          url: ogImage
        }
      ]
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
  return readings.map(reading => ({
    slug: reading.metadata.slug
  }));
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const reading = readings.find(reading => reading.metadata.slug === slug);

  if (!reading) notFound();

  const { metadata, Page } = reading;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    datePublished: metadata.date,
    dateModified: metadata.date,
    description: metadata.summary,
    image: `https://scidroid.co/api/og?title=${metadata.title}`,
    url: `https://scidroid.co/${metadata.slug}`,
    author: {
      "@type": "Person",
      name: "Juan Almanza"
    }
  };

  return (
    <main className="flex mt-24 justify-center">
      <section className="my-8 max-w-3xl xl:my-12">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        ></script>

        <h1 className="text-center text-4xl font-extrabold xl:text-7xl font-heading mb-8">
          <Balancer>{metadata.title}</Balancer>
        </h1>

        <p className="my-4 text-center text-lg xl:my-6 xl:text-xl">
          <Views slug={metadata.slug} />
          {" - "}
          {formatDate(metadata.date)}
        </p>
        <p className="my-4 text-center text-lg xl:my-6 xl:text-xl">
          {metadata.summary}
        </p>

        <article className="text-justify mt-12">
          <Page />
        </article>

        <section className="mt-16 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src={headshot}
              alt="Headshot of Juan Almanza, an undergraduate student from Colombia"
              className="w-40 h-40 rounded-lg object-cover"
              width={200}
              priority
              placeholder="blur"
              draggable={false}
            />

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-heading">
                Written by Juan Almanza
              </h2>
              <p className="text-gray-600">
                A <Age /> years old {copy.about}
              </p>
              <Link
                href="/#contact"
                className="text-gray-800 underline hover:no-underline transition-all duration-300"
              >
                Contact me
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
