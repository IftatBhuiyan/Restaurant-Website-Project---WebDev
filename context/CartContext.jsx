"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addCartItem,
  clearCartApi,
  createOrder,
  decrementCartItem,
  fetchCart,
} from "@/lib/api";
import { getSessionId } from "@/lib/session";

const CartContext = createContext(null);

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function itemsToCartMap(items = []) {
  return items.reduce((acc, item) => {
    acc[item.menuItemId] = {
      menuItemId: item.menuItemId,
      name: item.name,
      qty: item.qty,
      price: item.price,
    };
    return acc;
  }, {});
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);

  const applyCartResponse = useCallback((response) => {
    setCart(itemsToCartMap(response.items));
    return response;
  }, []);

  useEffect(() => {
    const id = getSessionId();
    setSessionId(id);

    fetchCart(id)
      .then(applyCartResponse)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [applyCartResponse]);

  const runCartAction = useCallback(
    async (action) => {
      if (!sessionId) {
        return null;
      }

      setSyncing(true);
      setError("");

      try {
        const response = await action();
        return applyCartResponse(response);
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setSyncing(false);
      }
    },
    [applyCartResponse, sessionId],
  );

  const addItem = useCallback(
    (item) =>
      runCartAction(() =>
        addCartItem(sessionId, {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
        }),
      ),
    [runCartAction, sessionId],
  );

  const removeItem = useCallback(
    (menuItemId) =>
      runCartAction(() => decrementCartItem(sessionId, menuItemId)),
    [runCartAction, sessionId],
  );

  const clearCart = useCallback(
    () => runCartAction(() => clearCartApi(sessionId)),
    [runCartAction, sessionId],
  );

  const placeOrder = useCallback(
    async (customer = {}) => {
      if (!sessionId) {
        return null;
      }

      setSyncing(true);
      setError("");

      try {
        const order = await createOrder(sessionId, customer);
        setCart({});
        return order;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setSyncing(false);
      }
    },
    [sessionId],
  );

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
    placeOrder,
    total,
    formatMoney,
    loading,
    syncing,
    error,
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
