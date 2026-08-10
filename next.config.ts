import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { LOCALE_PREFIXES, MERGED_ARTICLES } from "./src/lib/mergedArticles";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// 视频托管在 Sanity 媒体库，但对外只暴露自己域名下的 /videos/* 地址：
// 客户拿到的链接是 www.ifanholding.com，换 CDN 或重传只需改这张表，外链不失效。
// 文件本身不进仓库（单个 20MB+），Sanity 仍是唯一存放处。
const HOSTED_VIDEOS: Record<string, string> = {
  'electrofusion-welding-guide-en.mp4':
    'https://cdn.sanity.io/files/m2e07kon/production/12f23de82631aae172feab4a97e7443eef5e69b2.mp4',
  'electrofusion-welding-guide-zh.mp4':
    'https://cdn.sanity.io/files/m2e07kon/production/1e9e184dbdcd9c4f1239b43522c0aab2db3abbee.mp4',
};

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
      ...Object.entries(HOSTED_VIDEOS).map(([file, destination]) => ({
        source: `/videos/${file}`,
        destination,
      })),
    ];
  },
  async redirects() {
    // 自相残杀的文章合并。被合并页的 slug 仍留在 Sanity（正文和五种译文还要用来
    // 补进保留页），靠这里的 301 + sitemap 侧过滤让它对搜索引擎消失，
    // 不用改 CMS 数据——回滚只需 revert 一个 commit。
    // 英文是无前缀 URL，其余五种语言各自带前缀，逐一列出。
    return MERGED_ARTICLES.flatMap(({ from, to }) =>
      LOCALE_PREFIXES.map((prefix) => ({
        source: `${prefix}/news/${from}`,
        destination: `${prefix}/news/${to}`,
        permanent: true,
      }))
    );
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
