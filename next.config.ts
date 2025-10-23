import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: '/ae-project',
  assetPrefix: '/ae-project',
};

export default nextConfig;
