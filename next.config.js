const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
const config = {
  // React Aria のバグを回避するためにオフにする
  // reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048],
  },
  trailingSlash: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
}

module.exports = withBundleAnalyzer(config)
