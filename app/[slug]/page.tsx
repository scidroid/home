import { allReadings } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MetadataProps } from "@/types/metadata";
import { Suspense } from "react";
import { ViewsComponent } from "@/components/Views";
import { formatDate } from "@/utils/dates";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata | undefined> {
  const reading = allReadings.find((reading) => reading.slug === params.slug);

  if (!reading) {
    return;
  }

  const {
    title,
    date: publishedTime,
    summary: description,
    _raw: { flattenedPath: slug },
  } = reading;

  const ogImage = `https://home.scidroid.co/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://home.scidroid.co/${slug}`,
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

function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  return (
    <figure className="flex flex-col items-center justify-center">
      <Image
        className="rounded-lg"
        {...props}
      />
      <figcaption aria-hidden>{props.alt}</figcaption>
    </figure>
  );
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
};

export async function generateStaticParams() {
  return allReadings.map((reading) => ({
    slug: reading.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = allReadings.find((reading) => reading.slug === params.slug);

  if (!post) notFound();

  const Content = getMDXComponent(post.body.code);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.summary,
    image: `https://scidroid.co/api/og?title=${post.title}`,
    url: `https://scidroid.co/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Juan Almanza",
    },
  };

  return (
    <main className="flex justify-center">
      <section className="max-w-3xl my-4 lg:my-8">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        ></script>

        <h1 className="text-4xl font-extrabold lg:text-7xl text-center">
          <Balancer>{post.title}</Balancer>
        </h1>

        <p className="my-2 text-lg lg:text-xl lg:my-4 text-center">
          <Suspense>
            <ViewsComponent slug={post.slug} />
          </Suspense>
          {" - "}
          {formatDate(post.date)}
        </p>
        <p className="my-2 text-lg lg:text-xl lg:my-4 text-center">
          {post.summary}
        </p>

        <article className="prose prose-sm lg:prose-xl prose-neutral mt-4">
          <Content components={components} />
        </article>
      </section>
    </main>
  );
}
