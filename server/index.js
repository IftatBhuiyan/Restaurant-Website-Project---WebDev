import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import cartRoutes from "./routes/cart.js";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/corner-grill";

app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate record." });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id." });
  }

  res.status(500).json({ message: "Internal server error." });
});

async function start() {
  await connectDB(MONGODB_URI);
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
