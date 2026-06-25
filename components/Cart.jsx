"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
    <Card>
      <h2 className="text-2xl font-normal text-charcoal">Your Cart</h2>
      <p className="mt-1 text-sm text-charcoal/70">
        Items you add from the menu will show here.
      </p>

      <div className="mt-4 min-h-[120px] rounded-lg border border-border bg-cream p-3">
        {lines.length === 0 ? (
          <p className="py-8 text-center text-sm text-charcoal/60">
            Your cart is empty.
          </p>
        ) : (
          <ul className="space-y-3">
            {lines.map(([name, item]) => (
              <li
                key={name}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>
                  {item.qty} × {name} — {formatMoney(item.qty * item.price)}
                </span>
                <button
                  type="button"
                  className="shrink-0 rounded-md border border-border px-2 py-1 text-xs font-medium hover:bg-surface"
                  onClick={() => removeItem(name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatMoney(total)}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={clearCart} disabled={itemCount === 0}>
          Clear Cart
        </Button>
        <Button onClick={handleCheckout} disabled={itemCount === 0}>
          Checkout
        </Button>
      </div>
    </Card>
  );
}
