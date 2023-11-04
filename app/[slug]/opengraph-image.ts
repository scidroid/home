import { allReadings } from "@/.contentlayer/generated";
import { OGImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "The open graph image for this blog post";
export const contentType = "image/png";

export default async function Image({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const reading = allReadings.find((reading) => reading.slug == slug);

  return OGImage(reading?.title);
}
