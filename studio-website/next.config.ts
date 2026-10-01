import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["gsap", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/studio",
        permanent: true,
      },
      {
        source: "/awards",
        destination: "/recognition",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
