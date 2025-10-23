import type { NextConfig } from 'next';

const { i18n } = require('./next-i18next.config');


const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/ae-project',
  assetPrefix: '/ae-project/',   // keep trailing slash
  trailingSlash: true,
} satisfies NextConfig;

export default nextConfig;