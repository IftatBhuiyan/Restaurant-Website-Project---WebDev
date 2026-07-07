/** @type {import('next').NextConfig} */
const repoName = "Restaurant-Website-Project---WebDev";
const isDev = process.env.NODE_ENV === "development";
const productionApiUrl =
  "https://restaurant-website-project-webdev-production.up.railway.app";

const basePath = isDev ? "" : `/${repoName}`;
const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (isDev ? "http://localhost:5000" : productionApiUrl);

const nextConfig = {
  output: "export",
  // GitHub Pages needs basePath in production; local dev uses root for easier preview
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
