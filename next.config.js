const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

/**
 * @type {import('next/dist/next-server/server/config-shared').NextConfig}
 */
const config = {
  // React Aria のバグを回避するためにオフにする
  // reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
}

module.exports = withBundleAnalyzer(config)
