import MenuCard from "@/components/MenuCard";
import Cart from "@/components/Cart";
import Button from "@/components/Button";
import { menuCategories, getItemsByCategory } from "@/data/menuItems";

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

      <section className="border-b border-border bg-surface py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm sm:px-6 lg:px-8">
          <p className="text-ink-muted">
            <span className="font-semibold text-charcoal">6 plates</span> on the menu today
          </p>
          <p className="text-ink-muted">Takeout & dine-in · Walk-ins welcome at lunch</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8 lg:px-8">
          <div className="space-y-12">
            {menuCategories.map((category) => {
              const items = getItemsByCategory(category.id);
              if (items.length === 0) return null;

              return (
                <div key={category.id}>
                  <div className="mb-6 border-b border-border pb-4">
                    <p className="section-label">{category.label}</p>
                    <h2 className="mt-1 text-2xl text-charcoal md:text-3xl">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">{category.subtitle}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <aside className="lg:sticky lg:top-24">
            <Cart />
          </aside>
        </div>
      </section>

      <section className="page-hero-band border-t border-white/10 py-12 text-white md:py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="hero-label">Prefer to dine in?</p>
            <h2 className="mt-1 text-2xl text-white md:text-3xl">Save a table for dinner</h2>
            <p className="mt-2 max-w-md text-sm text-white/90">
              Weekend evenings fill up fast. Book ahead and we will hold a spot for your party.
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
