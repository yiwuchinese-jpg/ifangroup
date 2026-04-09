import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/wp-json/:path*', destination: '/api/wp-json/:path*' },
    ];
  },
  async headers() {
    return [
      {
        source: '/wp-json/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, Content-Disposition, X-WP-Nonce, X-Requested-With, Accept' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
