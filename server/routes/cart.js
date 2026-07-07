import { Router } from "express";
import Cart from "../models/Cart.js";

const router = Router();

function formatCart(doc) {
  return {
    sessionId: doc.sessionId,
    items: doc.items.map((item) => ({
      menuItemId: item.menuItemId,
      name: item.name,
      price: item.price,
      qty: item.qty,
    })),
    updatedAt: doc.updatedAt,
  };
}

function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

async function getOrCreateCart(sessionId) {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = await Cart.create({ sessionId, items: [] });
  }
  return cart;
}

router.get("/:sessionId", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.params.sessionId);
    res.json({
      ...formatCart(cart),
      total: cartTotal(cart.items),
      itemCount: cart.items.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:sessionId", async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "items must be an array." });
    }

    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    );

    res.json({
      ...formatCart(cart),
      total: cartTotal(cart.items),
      itemCount: cart.items.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:sessionId/items", async (req, res, next) => {
  try {
    const { menuItemId, name, price, qty = 1 } = req.body;
    if (!menuItemId || !name || price == null) {
      return res.status(400).json({
        message: "menuItemId, name, and price are required.",
      });
    }

    const cart = await getOrCreateCart(req.params.sessionId);
    const existing = cart.items.find((item) => item.menuItemId === menuItemId);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ menuItemId, name, price, qty });
    }

    await cart.save();

    res.json({
      ...formatCart(cart),
      total: cartTotal(cart.items),
      itemCount: cart.items.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:sessionId/items/:menuItemId", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.params.sessionId);
    const item = cart.items.find(
      (entry) => entry.menuItemId === req.params.menuItemId,
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    if (req.body.qty != null) {
      item.qty = req.body.qty;
    } else if (req.body.action === "increment") {
      item.qty += 1;
    } else if (req.body.action === "decrement") {
      item.qty -= 1;
    } else {
      return res.status(400).json({ message: "Provide qty or action." });
    }

    if (item.qty <= 0) {
      cart.items = cart.items.filter(
        (entry) => entry.menuItemId !== req.params.menuItemId,
      );
    }

    await cart.save();

    res.json({
      ...formatCart(cart),
      total: cartTotal(cart.items),
      itemCount: cart.items.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:sessionId/items/:menuItemId", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.params.sessionId);
    const nextItems = cart.items.filter(
      (item) => item.menuItemId !== req.params.menuItemId,
    );

    if (nextItems.length === cart.items.length) {
      return res.status(404).json({ message: "Cart item not found." });
    }

    cart.items = nextItems;
    await cart.save();

    res.json({
      ...formatCart(cart),
      total: cartTotal(cart.items),
      itemCount: cart.items.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:sessionId", async (req, res, next) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { items: [] },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    res.json({
      ...formatCart(cart),
      total: 0,
      itemCount: 0,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
