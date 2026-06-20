import type { NextConfig } from "next";

const repo = "Glowstudio";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  // GitHub Pages: serve from /<repo>; Vercel: serve from /
  basePath: process.env.GITHUB_PAGES ? `/${repo}` : undefined,
  images: {
    // Static export: Next image optimization is disabled; use plain <img> via unoptimized
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
