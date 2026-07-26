import Image from "next/image";
import type { ImageProps } from "next/image";

// A statically imported image with its alt doubling as the caption. Markdown's
// own image syntax cannot carry a static import, which is what buys the blur
// placeholder and the intrinsic dimensions, so posts use this for photos.
export function Figure({ alt = "", ...props }: ImageProps) {
  return (
    <figure className="flex flex-col items-center justify-center my-10">
      <Image
        className="rounded-xl shadow-2xl"
        alt={alt}
        placeholder="blur"
        {...props}
      />
      <figcaption className="mt-3 text-gray-600 text-sm xl:text-base text-center italic">
        {alt}
      </figcaption>
    </figure>
  );
}
