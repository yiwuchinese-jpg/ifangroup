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
    // 非内容路由（后台/接口/占位页）统一声明 noindex，防止进搜索索引。
    const noindex = { key: 'X-Robots-Tag', value: 'noindex, nofollow' };
    return [
      {
        // 静态资源长缓存：内容不改名不变，命中即免重复下载（PSI「高效缓存生命周期」项）
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/wp-json/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, Content-Disposition, X-WP-Nonce, X-Requested-With, Accept' },
          noindex,
        ],
      },
      { source: '/studio', headers: [noindex] },
      { source: '/studio/:path*', headers: [noindex] },
      { source: '/api/:path*', headers: [noindex] },
      { source: '/tech/:path*', headers: [noindex] },
    ];
  },
};

export default withNextIntl(nextConfig);
