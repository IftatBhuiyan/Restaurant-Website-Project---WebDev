"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/data/menuItems";

export default function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const total = galleryImages.length;

  const goTo = (index) => {
    setCurrent((index + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-normal text-charcoal">Gallery</h2>
      <div className="relative overflow-hidden rounded-lg bg-charcoal/5">
        <div className="relative aspect-video w-full">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === current ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={index !== current}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-1/2 left-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-charcoal shadow-sm"
          aria-label="Previous slide"
          onClick={() => goTo(current - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-charcoal shadow-sm"
          aria-label="Next slide"
          onClick={() => goTo(current + 1)}
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === current ? "bg-brand" : "bg-border"
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
