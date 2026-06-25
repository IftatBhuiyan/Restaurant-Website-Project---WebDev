"use client";

import Button from "@/components/Button";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, removeItem, clearCart, total, formatMoney, itemCount } =
    useCart();

  const lines = Object.entries(cart);

  const handleCheckout = () => {
    if (itemCount === 0) {
      return;
    }
    alert(
      `Your total is ${formatMoney(total)}. Checkout is not connected yet.`,
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="bg-charcoal px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase">Your order</p>
            <h2 className="mt-1 text-xl text-white">Cart</h2>
          </div>
          {itemCount > 0 ? (
            <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-accent px-2 text-sm font-bold text-charcoal">
              {itemCount}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="min-h-[140px] rounded-xl border border-dashed border-border bg-cream p-4">
          {lines.length === 0 ? (
            <div className="flex h-full min-h-[108px] flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-charcoal/70">
                Your cart is empty
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Add a plate from the menu to get started.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(([name, item]) => (
                <li
                  key={name}
                  className="flex items-start justify-between gap-3 border-b border-border pb-3 text-sm last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-charcoal">{name}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {item.qty} × {formatMoney(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand">
                      {formatMoney(item.qty * item.price)}
                    </p>
                    <button
                      type="button"
                      className="mt-1 text-xs font-medium text-ink-muted underline-offset-2 hover:text-brand hover:underline"
                      onClick={() => removeItem(name)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-ink-muted">Total</span>
          <span className="text-2xl font-bold text-charcoal">
            {formatMoney(total)}
          </span>
        </div>

        <div className="mt-4 grid gap-2">
          <Button onClick={handleCheckout} disabled={itemCount === 0} className="w-full">
            Checkout
          </Button>
          <Button
            variant="secondary"
            onClick={clearCart}
            disabled={itemCount === 0}
            className="w-full"
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
