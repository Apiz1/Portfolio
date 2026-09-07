"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-xl border border-blueprint-line bg-blueprint/60 p-1 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
        {images.length === 1 ? (
          <button type="button" onClick={() => setActiveIndex(0)} className="relative block aspect-[16/9] w-full overflow-hidden rounded-[8px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass">
            <Image src={images[0]} alt={`${title}, screen 1`} fill className="object-cover transition duration-500 hover:scale-[1.02]" priority />
            <span className="absolute bottom-4 right-4 rounded-lg bg-blueprint/85 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">View image</span>
          </button>
        ) : (
          <div className="grid h-[300px] grid-cols-[1.4fr_0.6fr] grid-rows-2 gap-1 sm:h-[430px]">
            {images.map((url, index) => (
              <button key={url} type="button" onClick={() => setActiveIndex(index)} className={`group relative overflow-hidden bg-blueprint text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass ${index === 0 || images.length === 2 ? "row-span-2" : ""}`}>
                <Image src={url} alt={`${title}, screen ${index + 1}`} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" priority={index === 0} />
                <span className="absolute inset-0 bg-blueprint/0 transition group-hover:bg-blueprint/15" />
                <span className="absolute bottom-3 right-3 rounded bg-blueprint/85 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-paper opacity-0 transition group-hover:opacity-100">Expand</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blueprint/95 p-5" role="dialog" aria-modal="true" aria-label={`${title} image gallery`} onClick={() => setActiveIndex(null)}>
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-5 top-5 rounded-lg border border-paper/25 px-3 py-2 font-mono text-xs font-semibold text-paper transition hover:border-brass hover:text-brass">Close</button>
          <button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setActiveIndex((index) => (index! - 1 + images.length) % images.length); }} className="absolute left-4 rounded-full bg-paper/10 px-3 py-2 text-paper hover:bg-paper/20 sm:left-8">←</button>
          <figure className="relative h-[78vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={activeImage} alt={`${title}, screen ${activeIndex! + 1}`} fill sizes="95vw" className="object-contain" priority />
          </figure>
          <button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setActiveIndex((index) => (index! + 1) % images.length); }} className="absolute right-4 rounded-full bg-paper/10 px-3 py-2 text-paper hover:bg-paper/20 sm:right-8">→</button>
          {images.length > 1 && <div className="absolute bottom-5 flex max-w-[80vw] gap-2 overflow-x-auto rounded-lg bg-blueprint/85 p-2" onClick={(event) => event.stopPropagation()}>{images.map((url, index) => <button key={url} type="button" onClick={() => setActiveIndex(index)} className={`relative h-12 w-16 shrink-0 overflow-hidden rounded border-2 ${activeIndex === index ? "border-brass" : "border-transparent opacity-65 hover:opacity-100"}`}><Image src={url} alt={`Select screen ${index + 1}`} fill className="object-cover" /></button>)}</div>}
        </div>
      )}
    </>
  );
}
