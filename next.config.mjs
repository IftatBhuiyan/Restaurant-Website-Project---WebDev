/** @type {import('next').NextConfig} */
const repoName = "Restaurant-Website-Project---WebDev";
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  output: "export",
  // GitHub Pages needs basePath in production; local dev uses root for easier preview
  basePath: isDev ? "" : `/${repoName}`,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
