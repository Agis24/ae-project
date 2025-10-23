// next.config.ts
import type { NextConfig } from 'next';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/ae-project',
  assetPrefix: '/ae-project/',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: '/ae-project',
  },
} satisfies NextConfig;

export default nextConfig;