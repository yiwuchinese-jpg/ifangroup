import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';

// 内存中维护的分类列表（支持动态新增）
let categoriesCache: Array<{ id: number; name: string; slug: string }> | null = null;

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function GET(request: Request) {
  try {
    // 从 Sanity 读取所有不同分类
    const catsFromSanity = await client.fetch(
      `*[_type == "article" && defined(category)] { category }`
    );
    const uniqueCategories = [...new Set(catsFromSanity.map((c: any) => c.category).filter(Boolean))] as string[];

    const formatted = uniqueCategories.map((name, idx) => ({
      id: idx + 1,
      count: catsFromSanity.filter((c: any) => c.category === name).length,
      description: '',
      link: `${request.headers.get('x-forwarded-proto') || 'https'}://${request.headers.get('host') || 'www.ifanholding.com'}/wp-json/wp/v2/categories/${idx + 1}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      taxonomy: 'category',
      meta: [],
    }));

    // 更新缓存
    categoriesCache = formatted.map(c => ({ id: c.id, name: c.name, slug: c.slug }));

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
 * POST — 支持动态新增分类
 * 301 写作可能会创建新分类，需要支持 POST
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;

    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400, headers: getCorsHeaders() });
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');

    // 确保缓存已初始化
    if (!categoriesCache) {
      const catsFromSanity = await client.fetch(
        `*[_type == "article" && defined(category)] { category }`
      );
      const uniqueCats = [...new Set(catsFromSanity.map((c: any) => c.category).filter(Boolean))] as string[];
      categoriesCache = uniqueCats.map((n, idx) => ({ id: idx + 1, name: n, slug: n.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
    }

    // 检查是否已存在
    const existing = categoriesCache.find(c => c.slug === slug || c.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      return NextResponse.json({
        id: existing.id,
        name: existing.name,
        slug: existing.slug,
        taxonomy: 'category',
      }, { status: 200, headers: getCorsHeaders() });
    }

    const newId = categoriesCache.length > 0 ? Math.max(...categoriesCache.map(c => c.id)) + 1 : 1;
    const cat = { id: newId, name, slug };
    categoriesCache.push(cat);

    return NextResponse.json({
      ...cat,
      taxonomy: 'category',
      meta: [],
    }, { status: 201, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Create category failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
