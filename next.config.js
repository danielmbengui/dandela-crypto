/** @type {import('next').NextConfig} */
//import { i18n } from './next-i18next.config'
const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
  reactStrictMode: false,
  webpack: (nextConfig) => {
    nextConfig.resolve.fallback = { 
      //reactStrictMode: true,
      fs: false,
      //timers: false,
      //process: false,
    };

    return nextConfig;
  },
};