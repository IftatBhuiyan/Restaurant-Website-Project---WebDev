import ImageFrame from "@/components/ui/ImageFrame";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="w-full">
      <ImageFrame
        src="/images/image1.jpg"
        alt="Toast bread with blueberries"
        aspect="hero"
        priority
        sizes="100vw"
        className="rounded-none"
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <h1 className="text-3xl font-normal text-charcoal md:text-4xl">
          The Corner Grill
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/80 md:text-lg">
          Fresh food. Simple flavors. Friendly place.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/menu/">View Menu</Button>
          <Button href="/contact/" variant="secondary">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
