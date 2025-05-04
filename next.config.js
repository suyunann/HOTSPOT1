/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'hotspot-ai.com'],
  },
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'zh-TW',
  },
};

module.exports = nextConfig; 