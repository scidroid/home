import { allReadings } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MetadataProps } from "@/types/metadata";
import { Suspense } from "react";
import { ViewsComponent } from "@/components/Views";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata | undefined> {
  const reading = allReadings.find(
    (reading) => reading._raw.flattenedPath === params.slug
  );

  if (!reading) {
    return;
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    _raw: { flattenedPath: slug },
  } = reading;

  const ogImage = `https://scidroid.co/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://scidroid.co/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return allReadings.map((reading) => ({
    slug: reading._raw.flattenedPath,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = allReadings.find(
    (reading) => reading._raw.flattenedPath === params.slug
  );

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  return (
    <div>
      <Suspense>
        <ViewsComponent slug={post._raw.flattenedPath} />
      </Suspense>
      <Content />
    </div>
  );
}
