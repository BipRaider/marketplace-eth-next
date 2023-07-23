/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['thrangra.sirv.com', 'images.unsplash.com'],
  },
  experimental: {
    typedRoutes: true,
  },
  typescript: {},
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },

  // webpack5: true,
  webpack: config => {
    config.plugins = [...config.plugins, new PrismaPlugin()];
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
      path: false,
      stream: false,
      constants: false,
    };

    return config;
  },
};
