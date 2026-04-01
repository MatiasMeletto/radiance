import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

