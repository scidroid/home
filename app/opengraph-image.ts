import { OGImage } from "@/lib/og";

export const runtime = "edge";
export const alt = "My home website";
export const contentType = "image/png";

export default async function Image() {
  return OGImage();
}
