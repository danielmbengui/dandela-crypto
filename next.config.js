const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

//module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  //nextConfig,
  //webpack5: true,
  webpack: (nextConfig) => {
    nextConfig.resolve.fallback = { 
      fs: false,
      //process: false,
    };

    return nextConfig;
  },
  i18n,
})
