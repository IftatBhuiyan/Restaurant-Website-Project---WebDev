"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const addItem = (name, price) => {
    setCart((prev) => {
      const existing = prev[name];
      if (!existing) {
        return { ...prev, [name]: { qty: 1, price } };
      }
      return {
        ...prev,
        [name]: { qty: existing.qty + 1, price: existing.price },
      };
    });
  };

  const removeItem = (name) => {
    setCart((prev) => {
      const existing = prev[name];
      if (!existing) {
        return prev;
      }
      if (existing.qty > 1) {
        return {
          ...prev,
          [name]: { qty: existing.qty - 1, price: existing.price },
        };
      }
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const clearCart = () => setCart({});

  const total = useMemo(() => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.qty * item.price,
      0,
    );
  }, [cart]);

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    total,
    formatMoney,
    itemCount: Object.values(cart).reduce((sum, item) => sum + item.qty, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
