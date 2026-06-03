import { NextResponse } from 'next/server';
import { getCorsHeaders } from './cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET /wp-json/wp/v2 — 返回 namespace 可用路由信息
 */
export async function GET(request: Request) {
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('host') || 'www.ifanholding.com';
  const baseUrl = `${protocol}://${host}/wp-json/wp/v2`;

  return NextResponse.json({
    namespace: 'wp/v2',
    routes: {
      '/wp/v2': {
        namespace: 'wp/v2',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'], args: {} }],
        _links: { self: `${baseUrl}` },
      },
      '/wp/v2/posts': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'], args: { per_page: {}, page: {}, search: {} } },
          { methods: ['POST'], args: {} },
        ],
        _links: { self: `${baseUrl}/posts` },
      },
      '/wp/v2/media': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'], args: { per_page: {}, page: {}, search: {} } },
          { methods: ['POST'], args: {} },
        ],
        _links: { self: `${baseUrl}/media` },
      },
      '/wp/v2/categories': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'], args: {} },
          { methods: ['POST'], args: {} },
        ],
        _links: { self: `${baseUrl}/categories` },
      },
      '/wp/v2/tags': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'], args: {} },
          { methods: ['POST'], args: {} },
        ],
        _links: { self: `${baseUrl}/tags` },
      },
      '/wp/v2/users': {
        namespace: 'wp/v2',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'], args: {} }],
        _links: { self: `${baseUrl}/users` },
      },
    },
  }, { headers: getCorsHeaders() });
}
