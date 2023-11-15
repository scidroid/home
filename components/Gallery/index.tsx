"use client";

import { useState } from "react";

import { useModal } from "@/hooks/modal";
import { galleryData } from "@/lib/gallery";
import { AnimatePresence } from "framer-motion";

import { MotionImage } from "./MotionImage";
import { DragSlider } from "./Slider";

export function Gallery() {
  const { selected, setSelected, ref, lastSelectedId } = useModal();

  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <section className="my-6">
      <DragSlider
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {galleryData.map((image, key) => (
          <MotionImage
            key={key}
            src={image.src}
            alt={image.alt}
            placeholder="blur"
            className={`${
              lastSelectedId == image.id ? "z-30" : "z-0"
            } m-4 h-72 rounded-lg object-cover`}
            draggable={false}
            onClick={() => {
              if (!isDragging) setSelected(image);
            }}
            tabIndex={0}
            height={320}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") setSelected(image);
            }}
            layoutId={image.id}
            whileHover={{ scale: 1.025 }}
          />
        ))}
      </DragSlider>
      {selected != null && (
        <AnimatePresence mode="wait">
          <div
            className="fixed inset-0 z-30 w-screen overflow-y-auto bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="flex flex-col items-center">
                <MotionImage
                  src={selected.src}
                  alt={selected.alt}
                  placeholder="blur"
                  className="max-h-[60vh] h-[500px] w-min rounded-lg object-cover"
                  layoutId={selected.id}
                  ref={ref}
                />
                <h2 id="dialog-title" className="pt-4 text-xl text-white">
                  {selected.caption}
                </h2>
              </div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </section>
  );
}
