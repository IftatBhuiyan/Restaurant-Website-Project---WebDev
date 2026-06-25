/** @type {import('next').NextConfig} */
const repoName = "Restaurant-Website-Project---WebDev";
const isDev = process.env.NODE_ENV === "development";

const basePath = isDev ? "" : `/${repoName}`;

const nextConfig = {
  output: "export",
  // GitHub Pages needs basePath in production; local dev uses root for easier preview
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
