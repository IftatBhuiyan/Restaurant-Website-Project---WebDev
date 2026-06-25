import SiteImage from "@/components/SiteImage";
import Link from "next/link";
import GallerySlider from "@/components/GallerySlider";
import Button from "@/components/Button";

const tags = ["Lunch", "Dinner", "Takeout"];

const infoStrip = [
  { label: "Open today", value: "10am – 10pm" },
  { label: "Neighborhood", value: "Times Square, NYC" },
  { label: "Service", value: "Dine-in · Takeout" },
];

const highlights = [
  {
    title: "Grilled Plates",
    description: "Salmon, steak, and ribs finished over open flame.",
    image: "/images/image5.jpg",
  },
  {
    title: "Comfort Bowls",
    description: "Risotto and seasonal bowls for slower lunches.",
    image: "/images/image3.jpg",
  },
  {
    title: "Weekend Brunch",
    description: "Eggs, toast, and fresh plates from the morning menu.",
    image: "/images/image2.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4rem)] w-full overflow-hidden">
        <SiteImage
          src="/images/image1.jpg"
          alt="French toast with blueberries and bananas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/20" />
        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 lg:px-8 lg:pb-16">
          <p className="text-xs font-bold tracking-widest text-accent uppercase">
            Neighborhood grill · Est. 2018
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            The Corner Grill
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Fresh plates, warm service, and a menu built for easy favorites.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/menu/">Order Now</Button>
            <Button href="/contact/" variant="ghost">
              Book a Table
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-charcoal py-10 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {infoStrip.map((item) => (
            <div key={item.label} className="border-l-2 border-accent pl-5">
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">From the kitchen</p>
              <h2 className="mt-2 text-3xl text-charcoal md:text-4xl">
                Plates people come back for
              </h2>
            </div>
            <Link
              href="/menu/"
              className="text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              View full menu →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {highlights.map((item, index) => (
              <Link
                key={item.title}
                href="/menu/"
                className="group relative overflow-hidden rounded-2xl bg-charcoal"
              >
                <div className="relative aspect-[4/5] w-full md:aspect-[3/4]">
                  <SiteImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  <div className="absolute right-4 bottom-4 left-4">
                    <p className="text-xs font-bold tracking-widest text-accent uppercase">
                      0{index + 1}
                    </p>
                    <h3 className="mt-1 text-2xl text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GallerySlider />

      <section className="page-hero-band border-t border-white/10 py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-xl">
            <p className="hero-label">Visit us</p>
            <h2 className="mt-2 text-3xl text-white md:text-4xl">
              Hungry now? Order online or save a table.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              Walk-ins welcome during lunch. For dinner and weekends, booking
              ahead helps us keep the room comfortable.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 sm:w-auto">
            <Button href="/menu/" variant="accent">
              Browse Menu
            </Button>
            <Button href="/contact/" variant="ghost">
              Book Table
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
