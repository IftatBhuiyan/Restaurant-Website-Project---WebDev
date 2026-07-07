import mongoose from "mongoose";

const menuCategorySchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("MenuCategory", menuCategorySchema);
