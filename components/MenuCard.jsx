"use client";

import ImageFrame from "@/components/ui/ImageFrame";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export default function MenuCard({ item }) {
  const { addItem } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <ImageFrame
        src={item.image}
        alt={item.name}
        aspect="menu"
        className="rounded-none rounded-t-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-charcoal">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-charcoal/70">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-brand">
            ${item.price.toFixed(2)}
          </span>
          <Button
            className="shrink-0"
            onClick={() => addItem(item.name, item.price)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
