const withPlugins = require('next-compose-plugins')
const bundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

const basePath = process.env.NEXT_PUBLIC_BASE_PATH

module.exports = withPlugins([[bundleAnalyzer]], {
  reactStrictMode: true,
  images: { deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048] },
  basePath,
  trailingSlash: true,
})
