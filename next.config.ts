import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // next.js config
});
