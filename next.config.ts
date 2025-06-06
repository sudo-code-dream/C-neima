import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

const nextConfig: NextConfig = {
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/watch-:mediaType/:titleSlug/:id",
        destination: "/watch/:mediaType/:titleSlug/:id",
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
