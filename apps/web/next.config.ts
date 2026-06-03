import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.js',
      '.json',
    ]
    return config
  },
}

export default nextConfig
