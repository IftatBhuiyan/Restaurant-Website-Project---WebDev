import "dotenv/config";
import { menuCategories, menuItems } from "./data/seedData.js";
import { connectDB } from "./config/db.js";
import MenuCategory from "./models/MenuCategory.js";
import MenuItem from "./models/MenuItem.js";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/corner-grill";

async function seed() {
  await connectDB(MONGODB_URI);

  await Promise.all([
    MenuCategory.deleteMany({}),
    MenuItem.deleteMany({}),
  ]);

  await MenuCategory.insertMany(
    menuCategories.map((category) => ({
      categoryId: category.id,
      label: category.label,
      title: category.title,
      subtitle: category.subtitle,
    })),
  );

  await MenuItem.insertMany(
    menuItems.map((item) => ({
      itemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      available: true,
    })),
  );

  console.log(
    `Seeded ${menuCategories.length} categories and ${menuItems.length} menu items.`,
  );
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
