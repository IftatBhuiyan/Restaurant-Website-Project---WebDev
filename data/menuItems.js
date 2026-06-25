export const menuCategories = [
  {
    id: "mains",
    label: "Mains",
    title: "Grilled & Mains",
    subtitle: "Finished over open flame with seasonal sides.",
  },
  {
    id: "bowls-salads",
    label: "Bowls & Salads",
    title: "Bowls & Salads",
    subtitle: "Lighter plates and shareable starters.",
  },
  {
    id: "desserts",
    label: "Desserts",
    title: "Desserts",
    subtitle: "A sweet finish to the meal.",
  },
];

export const menuItems = [
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description: "Served with rice and seasonal vegetables.",
    price: 18.0,
    image: "/images/image5.jpg",
    category: "mains",
  },
  {
    id: "bbq-ribs",
    name: "BBQ Ribs",
    description: "Ribs with house smoked BBQ glaze.",
    price: 17.0,
    image: "/images/image4.jpg",
    category: "mains",
  },
  {
    id: "steak-plate",
    name: "Steak Plate",
    description: "Steak, fries, and salad.",
    price: 21.0,
    image: "/images/image5.jpg",
    category: "mains",
  },
  {
    id: "truffle-risotto",
    name: "Truffle Risotto",
    description: "Creamy mushroom risotto with parmesan.",
    price: 15.5,
    image: "/images/image3.jpg",
    category: "bowls-salads",
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "Classic Caesar with croutons and parmesan.",
    price: 10.0,
    image: "/images/image2.jpg",
    category: "bowls-salads",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    description: "Dark chocolate cake with vanilla cream.",
    price: 8.5,
    image: "/images/image1.jpg",
    category: "desserts",
  },
];

export const galleryImages = [
  {
    src: "/images/image1.jpg",
    alt: "Toast bread with blueberries on a black plate",
  },
  {
    src: "/images/image2.jpg",
    alt: "Sandwich with boiled egg and avocado",
  },
  {
    src: "/images/image3.jpg",
    alt: "Vegetable and meat bowl",
  },
  {
    src: "/images/image4.jpg",
    alt: "Pizza on a chopping board",
  },
  {
    src: "/images/image5.jpg",
    alt: "Grilled meat and vegetables",
  },
];

export function getItemsByCategory(categoryId) {
  return menuItems.filter((item) => item.category === categoryId);
}
