import { Router } from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const router = Router();

function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

function formatOrder(doc) {
  return {
    id: doc._id.toString(),
    orderNumber: doc.orderNumber,
    sessionId: doc.sessionId,
    items: doc.items,
    total: doc.total,
    status: doc.status,
    customerName: doc.customerName,
    customerEmail: doc.customerEmail,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function createOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CG-${stamp}-${random}`;
}

router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.sessionId) {
      filter.sessionId = req.query.sessionId;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders.map(formatOrder));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(formatOrder(order));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { sessionId, customerName = "", customerEmail = "" } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required." });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const order = await Order.create({
      orderNumber: createOrderNumber(),
      sessionId,
      items: cart.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),
      total: cartTotal(cart.items),
      customerName,
      customerEmail,
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(formatOrder(order));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status is required." });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json(formatOrder(order));
  } catch (error) {
    next(error);
  }
});

export default router;
