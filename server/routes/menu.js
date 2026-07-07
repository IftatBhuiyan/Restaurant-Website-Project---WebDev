import { Router } from "express";
import MenuCategory from "../models/MenuCategory.js";
import MenuItem from "../models/MenuItem.js";

const router = Router();

function formatCategory(doc) {
  return {
    id: doc.categoryId,
    label: doc.label,
    title: doc.title,
    subtitle: doc.subtitle,
  };
}

function formatItem(doc) {
  return {
    id: doc.itemId,
    name: doc.name,
    description: doc.description,
    price: doc.price,
    image: doc.image,
    category: doc.category,
    available: doc.available,
  };
}

router.get("/", async (_req, res, next) => {
  try {
    const [categories, items] = await Promise.all([
      MenuCategory.find().sort({ categoryId: 1 }),
      MenuItem.find({ available: true }).sort({ name: 1 }),
    ]);

    res.json({
      categories: categories.map(formatCategory),
      items: items.map(formatItem),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/categories", async (_req, res, next) => {
  try {
    const categories = await MenuCategory.find().sort({ categoryId: 1 });
    res.json(categories.map(formatCategory));
  } catch (error) {
    next(error);
  }
});

router.post("/categories", async (req, res, next) => {
  try {
    const { id, label, title, subtitle } = req.body;
    if (!id || !label || !title || !subtitle) {
      return res.status(400).json({ message: "id, label, title, and subtitle are required." });
    }

    const category = await MenuCategory.create({
      categoryId: id,
      label,
      title,
      subtitle,
    });

    res.status(201).json(formatCategory(category));
  } catch (error) {
    next(error);
  }
});

router.put("/categories/:id", async (req, res, next) => {
  try {
    const category = await MenuCategory.findOneAndUpdate(
      { categoryId: req.params.id },
      {
        ...(req.body.label && { label: req.body.label }),
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.subtitle && { subtitle: req.body.subtitle }),
      },
      { new: true, runValidators: true },
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.json(formatCategory(category));
  } catch (error) {
    next(error);
  }
});

router.delete("/categories/:id", async (req, res, next) => {
  try {
    const category = await MenuCategory.findOneAndDelete({
      categoryId: req.params.id,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/items", async (_req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ name: 1 });
    res.json(items.map(formatItem));
  } catch (error) {
    next(error);
  }
});

router.get("/items/:itemId", async (req, res, next) => {
  try {
    const item = await MenuItem.findOne({ itemId: req.params.itemId });
    if (!item) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.json(formatItem(item));
  } catch (error) {
    next(error);
  }
});

router.post("/items", async (req, res, next) => {
  try {
    const { id, name, description, price, image, category, available = true } =
      req.body;

    if (!id || !name || !description || price == null || !image || !category) {
      return res.status(400).json({
        message: "id, name, description, price, image, and category are required.",
      });
    }

    const item = await MenuItem.create({
      itemId: id,
      name,
      description,
      price,
      image,
      category,
      available,
    });

    res.status(201).json(formatItem(item));
  } catch (error) {
    next(error);
  }
});

router.put("/items/:itemId", async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.name != null) updates.name = req.body.name;
    if (req.body.description != null) updates.description = req.body.description;
    if (req.body.price != null) updates.price = req.body.price;
    if (req.body.image != null) updates.image = req.body.image;
    if (req.body.category != null) updates.category = req.body.category;
    if (req.body.available != null) updates.available = req.body.available;

    const item = await MenuItem.findOneAndUpdate(
      { itemId: req.params.itemId },
      updates,
      { new: true, runValidators: true },
    );

    if (!item) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.json(formatItem(item));
  } catch (error) {
    next(error);
  }
});

router.delete("/items/:itemId", async (req, res, next) => {
  try {
    const item = await MenuItem.findOneAndDelete({ itemId: req.params.itemId });
    if (!item) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
