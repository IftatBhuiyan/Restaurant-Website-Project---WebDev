import Image from "next/image";

export default function ImageFrame({
  src,
  alt,
  aspect = "video",
  className = "",
  priority = false,
  sizes = "100vw",
}) {
  const aspectClass =
    aspect === "hero"
      ? "aspect-[4/3] md:aspect-[21/9]"
      : aspect === "menu"
        ? "aspect-[4/3]"
        : "aspect-video";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-border ${aspectClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center"
      />
    </div>
  );
}
