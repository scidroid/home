import Image, { StaticImageData } from "next/image";

import { galleryData } from "@/lib/gallery";

function GalleryItem({
  image,
  index
}: {
  image: {
    id: string;
    src: StaticImageData;
    alt: string;
    caption: string;
  };
  index: number;
}) {
  const rotationClass = index % 2 === 0 ? "" : "-rotate-2";

  return (
    <div className={`group relative h-60 w-80 m-2 ${rotationClass}`}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        className="rounded-lg object-cover group-hover:opacity-40 transition-opacity duration-300 h-60 w-80"
        draggable={false}
        tabIndex={0}
        height={320}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-60 w-80">
        <p className="text-white font-bold text-lg text-center p-2">
          {image.caption}
        </p>
      </div>
    </div>
  );
}

export function Gallery() {
  const sortedGalleryData = galleryData.sort(() => 0.5 - Math.random());

  function renderGalleryItems() {
    return sortedGalleryData.map((image, key) => (
      <GalleryItem key={key} index={key} image={image} />
    ));
  }

  return (
    <section className="relative flex overflow-x-hidden my-6">
      <div className="animate-marquee flex items-center">
        {renderGalleryItems()}
      </div>
      <div className="absolute top-0 animate-marquee2 flex items-center">
        {renderGalleryItems()}
      </div>
    </section>
  );
}
