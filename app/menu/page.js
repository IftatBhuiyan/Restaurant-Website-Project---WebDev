import Button from "@/components/Button";
import MenuPageContent from "@/components/MenuPageContent";

export default function MenuPage() {
  return (
    <>
      <section className="page-hero-band border-b border-white/10 py-14 text-white md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="hero-label">Order online</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-white md:text-5xl">
            Our Menu
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
            Build your order plate by plate. All prices are in USD — add items to
            your cart and checkout when you are ready.
          </p>
        </div>
      </section>

      <MenuPageContent />

      <section className="page-hero-band border-t border-white/10 py-12 text-white md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="hero-label">Prefer to dine in?</p>
            <h2 className="mt-1 text-2xl text-white md:text-3xl">
              Save a table for dinner
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/90">
              Weekend evenings fill up fast. Book ahead and we will hold a spot
              for your party.
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
