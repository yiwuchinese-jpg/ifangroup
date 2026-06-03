import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET — 从 Sanity 读取所有不同标签
 */
export async function GET(request: Request) {
  try {
    // 从 Sanity 读取所有文章标签
    const articlesFromSanity = await client.fetch(
      `*[_type == "article" && defined(tags)] { tags }`
    );

    // 拆分逗号分隔的标签并去重
    const allTags = new Set<string>();
    articlesFromSanity.forEach((a: any) => {
      if (a.tags) {
        a.tags.split(',').forEach((t: string) => {
          const trimmed = t.trim();
          if (trimmed) allTags.add(trimmed);
        });
      }
    });

    const uniqueTags = [...allTags];

    const formatted = uniqueTags.map((name, idx) => ({
      id: idx + 1,
      count: 1,
      description: '',
      link: `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host') || 'www.ifanholding.com'}/wp-json/wp/v2/tags/${idx + 1}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      taxonomy: 'post_tag',
      meta: [],
    }));

    return NextResponse.json(formatted, {
      status: 200,
      headers: {
        ...getCorsHeaders(),
        'X-WP-Total': String(formatted.length),
        'X-WP-TotalPages': '1',
      },
    });
  } catch (error: any) {
    return NextResponse.json([], { headers: getCorsHeaders() });
  }
}

/**
 * POST — 支持动态新增标签
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;

    if (!name) {
      return NextResponse.json({ message: 'Tag name is required' }, { status: 400, headers: getCorsHeaders() });
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');

    return NextResponse.json({
      id: Math.floor(Math.random() * 10000) + 1000,
      name,
      slug,
      taxonomy: 'post_tag',
      meta: [],
    }, { status: 201, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Create tag failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
