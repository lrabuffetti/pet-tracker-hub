import type { NextConfig } from 'next'

function getUploadImagePatterns(): NonNullable<
  NextConfig['images']
>['remotePatterns'] {
  const patterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/uploads/**',
    },
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '3000',
      pathname: '/uploads/**',
    },
  ]

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (apiUrl) {
    try {
      const { protocol, hostname, port } = new URL(apiUrl)

      if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        patterns.push({
          protocol: protocol.replace(':', '') as 'http' | 'https',
          hostname,
          ...(port ? { port } : {}),
          pathname: '/uploads/**',
        })
      }
    } catch {
      // Ignore invalid NEXT_PUBLIC_API_URL.
    }
  }

  return patterns
}

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@repo/ui'],
  turbopack: {},
  images: {
    unoptimized: true,
    // Next.js 16 blocks loopback/private IPs in the image optimizer by default.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: getUploadImagePatterns(),
  },
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
