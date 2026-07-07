"use client";

import SiteImage from "@/components/SiteImage";
import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";

export default function MenuCard({ item }) {
  const { addItem, syncing } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <SiteImage
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <span className="absolute top-3 right-3 rounded-full bg-charcoal/90 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-charcoal">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {item.description}
        </p>
        <Button
          className="mt-5 w-full"
          onClick={() => addItem(item)}
          disabled={syncing}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
