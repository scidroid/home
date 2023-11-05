import { StaticImageData } from "next/image";

export type GalleryItem = {
  id: string;
  src: StaticImageData;
  alt: string;
  caption: string;
};
