import SiteImage from "@/components/SiteImage";
import Button from "@/components/Button";

const storyMilestones = [
  {
    year: "2018",
    title: "A corner booth idea",
    text: "The Corner Grill started as a weekend pop-up with a short grill menu and a handful of regulars.",
  },
  {
    year: "2021",
    title: "The menu took shape",
    text: "We narrowed the list to grilled plates, bowls, and a few desserts guests kept ordering again.",
  },
  {
    year: "Today",
    title: "Still keeping it simple",
    text: "Same goal as day one: fresh food, fair prices, and a calm room where people can actually talk.",
  },
];

const aboutValues = [
  {
    number: "01",
    title: "Cook with restraint",
    text: "Seasonal ingredients and a short menu so every plate gets attention.",
  },
  {
    number: "02",
    title: "Price it fairly",
    text: "Neighborhood pricing without hidden upsells or confusing combos.",
  },
  {
    number: "03",
    title: "Make room for everyone",
    text: "Quick lunch tables, slower dinners, and takeout that still feels cared for.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero-band border-b border-white/10 py-14 text-white md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="hero-label">Our story</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-white md:text-5xl">
            About The Corner Grill
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
            A small neighborhood restaurant built around grilled plates, honest
            pricing, and a dining room that feels calm instead of rushed.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <SiteImage
                src="/images/image4.jpg"
                alt="Pizza and shared plates on a wooden board"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 hidden h-40 w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-lg md:block">
              <SiteImage
                src="/images/image3.jpg"
                alt="Bowl with vegetables and meat"
                fill
                sizes="160px"
                className="object-cover object-center"
              />
            </div>
          </div>
          <div>
            <p className="section-label">Who we are</p>
            <h2 className="mt-2 text-3xl text-charcoal md:text-4xl">
              Good food without the noise
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                The Corner Grill began as a small local spot with a simple goal:
                good food, fair price, and a calm place for people to eat together.
              </p>
              <p>
                We keep the menu focused so guests can quickly pick favorites.
                Most plates are grilled, seasonal, and meant to be shared after
                work or on a slow weekend afternoon.
              </p>
            </div>
            <Button href="/menu/" className="mt-8">
              See what we serve
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">Timeline</p>
          <h2 className="mt-2 text-3xl text-charcoal">How we got here</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {storyMilestones.map((item) => (
              <article
                key={item.year}
                className="rounded-2xl border border-border bg-cream p-6"
              >
                <span className="text-4xl font-normal text-brand/30">{item.year}</span>
                <h3 className="mt-3 text-xl text-charcoal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label">What we believe</p>
          <h2 className="mt-2 text-3xl text-charcoal">Three rules we do not break</h2>
          <div className="mt-8 space-y-4">
            {aboutValues.map((value) => (
              <div
                key={value.number}
                className="flex gap-5 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="text-2xl font-normal text-brand">{value.number}</span>
                <div>
                  <h3 className="text-lg text-charcoal">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-14 text-white md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl md:text-3xl">Ready to visit?</h2>
            <p className="mt-2 text-sm text-white/70">
              Book a table for dinner or stop by for lunch — walk-ins welcome.
            </p>
          </div>
          <Button href="/contact/" variant="accent">
            Book a Table
          </Button>
        </div>
      </section>
    </>
  );
}
