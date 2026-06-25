import ContactForm from "@/components/ContactForm";

const visitDetails = [
  { label: "Address", value: "Times Square, New York, NY" },
  { label: "Phone", value: "(212) 555-0148" },
  { label: "Email", value: "hello@cornergrill.demo" },
];

const hours = [
  { days: "Monday – Friday", time: "10:00 AM – 10:00 PM" },
  { days: "Saturday – Sunday", time: "11:00 AM – 11:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero-band border-b border-white/10 py-14 text-white md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="hero-label">Reservations</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-white md:text-5xl">
            Book a Table
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
            Save a spot for dinner, a weekend brunch, or a small celebration. We
            reply within one business day.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[340px_1fr] lg:items-start lg:px-8">
          <aside className="space-y-5">
            <div className="rounded-2xl bg-charcoal p-6 text-white">
              <h2 className="text-xl">Visit the grill</h2>
              <ul className="mt-5 space-y-4 text-sm">
                {visitDetails.map((item) => (
                  <li key={item.label}>
                    <p className="text-xs font-bold tracking-widest text-white/50 uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1">{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-lg text-charcoal">Hours</h2>
              <ul className="mt-4 space-y-3">
                {hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-start justify-between gap-4 border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-ink-muted">{row.days}</span>
                    <span className="text-right font-medium text-charcoal">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="The Corner Grill map"
                src="https://www.google.com/maps?q=Times+Square,+New+York,+NY&output=embed"
                loading="lazy"
                className="aspect-[4/3] min-h-[220px] w-full border-0"
              />
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
