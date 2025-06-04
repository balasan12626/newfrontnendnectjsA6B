/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  optimizeFonts: false,
  // Add domain configuration
  domains: ['admin.boult.neu'],
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.boult.neu',
          },
        ],
        destination: '/admin/:path*',
      },
    ];
  },
};

module.exports = nextConfig;