"use client";

import { useEffect, useState } from "react";
import MenuCard from "@/components/MenuCard";
import Cart from "@/components/Cart";
import { fetchMenu } from "@/lib/api";

export default function MenuPageContent() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenu()
      .then((data) => {
        setCategories(data.categories);
        setItems(data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-sm text-ink-muted sm:px-6 lg:px-8">
          Loading menu from the kitchen...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">Could not load the menu.</p>
            <p className="mt-2">{error}</p>
            <p className="mt-2 text-red-600">
              Make sure the API server is running and MongoDB is seeded.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-surface py-3">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm sm:px-6 lg:px-8">
          <p className="text-ink-muted">
            <span className="font-semibold text-charcoal">
              {items.length} plates
            </span>{" "}
            on the menu today
          </p>
          <p className="text-ink-muted">
            Takeout & dine-in · Walk-ins welcome at lunch
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-8 lg:px-8">
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryItems = items.filter(
                (item) => item.category === category.id,
              );
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id}>
                  <div className="mb-6 border-b border-border pb-4">
                    <p className="section-label">{category.label}</p>
                    <h2 className="mt-1 text-2xl text-charcoal md:text-3xl">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm text-ink-muted">
                      {category.subtitle}
                    </p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {categoryItems.map((item) => (
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
    </>
  );
}
