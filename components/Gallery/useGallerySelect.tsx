"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { GalleryItem } from "@/types/gallery";

export function useGallerySelect() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const ref = useRef<HTMLImageElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setLastSelectedId(selected?.id || null);
        setSelected(null);
      }
    },
    [selected]
  );

  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLastSelectedId(selected?.id || null);
        setSelected(null);
      }
    },
    [selected]
  );

  useEffect(() => {
    if (selected) {
      setLastSelectedId(selected.id);
    }
  }, [selected]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleEscKey, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscKey, true);
    };
  }, [handleClickOutside, handleEscKey]);

  return { ref, selected, setSelected, lastSelectedId };
}
