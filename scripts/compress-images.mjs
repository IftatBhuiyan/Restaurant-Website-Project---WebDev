import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "images");

const sources = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
];

await fs.mkdir(outputDir, { recursive: true });

for (const file of sources) {
  const inputPath = path.join(root, file);
  const outputPath = path.join(outputDir, file);

  try {
    await fs.access(inputPath);
  } catch {
    console.warn(`Skipping missing file: ${file}`);
    continue;
  }

  await sharp(inputPath)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  console.log(`Compressed ${file} -> ${Math.round(stats.size / 1024)} KB`);
}

console.log("Done. Images saved to public/images/");
