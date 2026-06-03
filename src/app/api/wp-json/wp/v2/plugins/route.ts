import { NextResponse } from 'next/server';
import { getCorsHeaders } from '../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET — 模拟 WordPress 激活的插件列表
 * 部分工具会通过此接口探测 SEO 插件是否存在
 */
export async function GET() {
  const plugins = [
    {
      plugin: 'seo-by-rank-math/rank-math.php',
      name: 'Rank Math SEO',
      version: '1.0.225',
      status: 'active',
      description: 'Rank Math SEO plugin',
      author: 'Rank Math',
      author_uri: 'https://rankmath.com',
      network: false,
      title: 'Rank Math SEO',
      author_name: 'Rank Math',
    },
    {
      plugin: 'wordpress-seo/wp-seo.php',
      name: 'Yoast SEO',
      version: '23.5',
      status: 'active',
      description: 'Yoast SEO plugin',
      author: 'Team Yoast',
      author_uri: 'https://yoast.com',
      network: false,
      title: 'Yoast SEO',
      author_name: 'Team Yoast',
    },
  ];

  return NextResponse.json(plugins, { headers: getCorsHeaders() });
}
