import { NextResponse } from 'next/server';
import { getCorsHeaders } from '../../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET /wp-json/wp/v2/users/me
 * 支持 Basic Auth 认证，验证 301 写作的凭据
 */
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization') || '';

    if (authHeader.toLowerCase().startsWith('basic ')) {
      const base64Credentials = authHeader.slice(6);
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      const expectedUser = process.env.WP_MOCK_USERNAME || 'admin';
      const expectedPass = process.env.WP_MOCK_PASSWORD || 'password';

      if (username === expectedUser && password === expectedPass) {
        return NextResponse.json(
          {
            id: 1,
            name: 'Admin',
            url: '',
            description: '',
            link: `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host') || 'localhost'}/wp-json/wp/v2/users/1`,
            slug: 'admin',
            avatar_urls: { 24: '', 48: '', 96: '' },
            meta: [],
            _links: {
              self: [{ href: `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host') || 'localhost'}/wp-json/wp/v2/users/1` }],
              collection: [{ href: `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host') || 'localhost'}/wp-json/wp/v2/users` }],
            },
          },
          { headers: getCorsHeaders() }
        );
      }

      // 认证失败
      return NextResponse.json(
        { code: 'rest_cannot_login', message: 'Invalid username or password.', data: { status: 401 } },
        { status: 401, headers: getCorsHeaders() }
      );
    }

    // 无 Auth Header 时返回基础数据（部分工具可能先探测）
    return NextResponse.json(
      {
        id: 1,
        name: 'Admin',
        url: '',
        description: '',
        link: '',
        slug: 'admin',
        avatar_urls: { 24: '', 48: '', 96: '' },
        meta: [],
      },
      { headers: getCorsHeaders() }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Auth failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
