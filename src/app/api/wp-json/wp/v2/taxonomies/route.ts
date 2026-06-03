import { NextResponse } from 'next/server';
import { getCorsHeaders } from '../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET /wp-json/wp/v2/taxonomies — 返回可用的 taxonomy 列表
 */
export async function GET(request: Request) {
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('host') || 'www.ifanholding.com';
  const baseUrl = `${protocol}://${host}/wp-json/wp/v2`;

  return NextResponse.json({
    category: {
      name: 'Categories',
      slug: 'category',
      description: '',
      types: ['post'],
      hierarchical: true,
      rest_base: 'categories',
      rest_namespace: 'wp/v2',
      _links: {
        collection: [{ href: `${baseUrl}/categories` }],
      },
    },
    post_tag: {
      name: 'Tags',
      slug: 'post_tag',
      description: '',
      types: ['post'],
      hierarchical: false,
      rest_base: 'tags',
      rest_namespace: 'wp/v2',
      _links: {
        collection: [{ href: `${baseUrl}/tags` }],
      },
    },
  }, { headers: getCorsHeaders() });
}
