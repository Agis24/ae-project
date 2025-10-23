import type { NextConfig } from 'next';

const { i18n } = require('./next-i18next.config');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['IP'],
  images: { unoptimized: true },
  basePath: '/ae-project',
  assetPrefix: '/ae-project/',
  trailingSlash: true
};

module.exports = { nextConfig, i18n };
export default nextConfig;