"use client";

import { useEffect, useState } from "react";
import SiteImage from "@/components/SiteImage";
import { galleryImages } from "@/data/menuItems";

export default function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const total = galleryImages.length;
  const active = galleryImages[current];

  const goTo = (index) => {
    setCurrent((index + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="section-label">Gallery</p>
        <h2 className="mt-2 text-3xl text-charcoal md:text-4xl">
          A look inside the room
        </h2>
        <p className="mt-3 max-w-lg text-ink-muted">
          Real plates from our line — grilled mains, brunch mornings, and the kind
          of comfort food meant to be shared.
        </p>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-charcoal">
          <div className="relative aspect-[16/10] w-full">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === current
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-hidden={index !== current}
              >
                <SiteImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-center"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <p className="absolute bottom-4 left-4 max-w-md text-sm text-white/90">
              {active.alt}
            </p>
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-lg text-charcoal shadow"
              aria-label="Previous slide"
              onClick={() => goTo(current - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-lg text-charcoal shadow"
              aria-label="Next slide"
              onClick={() => goTo(current + 1)}
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl transition-all sm:h-24 sm:w-32 ${
                index === current
                  ? "ring-2 ring-brand ring-offset-2 ring-offset-cream"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${image.alt}`}
              aria-current={index === current}
            >
              <SiteImage
                src={image.src}
                alt=""
                fill
                sizes="128px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
