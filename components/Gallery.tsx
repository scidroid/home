import Image from "next/image";

import { InfiniteSlider } from "@/components/ui/slider";
import { galleryData } from "@/content/gallery";

export function Gallery() {
  const sortedGalleryData = galleryData.sort(() => 0.5 - Math.random());

  return (
    <InfiniteSlider duration={40} className="my-12">
      {sortedGalleryData.map((galleryItem, key) => (
        <div
          className="relative h-60 w-80 m-2 rounded-lg overflow-hidden group"
          key={key}
        >
          <Image
            src={galleryItem.src}
            alt={galleryItem.alt}
            placeholder="blur"
            className="object-cover h-72 w-96 rounded-xl shadow-lg border-2 border-gray-300"
            draggable={false}
            tabIndex={0}
            height={320}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white font-bold text-lg text-center p-4">
              {galleryItem.caption}
            </p>
          </div>
        </div>
      ))}
    </InfiniteSlider>
  );
}
