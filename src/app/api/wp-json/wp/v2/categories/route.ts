import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';
import { categories, markCategoriesInitialized, isCategoriesInitialized, getNextCategoryId } from '../utils';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * 初始化分类列表：从 Sanity 读取所有不同分类
 */
async function initCategories() {
  const catsFromSanity = await client.fetch(
    `*[_type == "article" && defined(category)] { category }`
  );
  const uniqueCategories = [...new Set(catsFromSanity.map((c: any) => c.category).filter(Boolean))] as string[];

  // 清空并重建
  categories.length = 0;
  uniqueCategories.forEach((name, idx) => {
    categories.push({
      id: idx + 1,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
  });
  markCategoriesInitialized();
}

export async function GET(request: Request) {
  try {
    if (!isCategoriesInitialized()) {
      await initCategories();
    }

    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'www.ifanholding.com';

    const formatted = categories.map(cat => ({
      id: cat.id,
      count: 1,
      description: '',
      link: `${protocol}://${host}/wp-json/wp/v2/categories/${cat.id}`,
      name: cat.name,
      slug: cat.slug,
      taxonomy: 'category',
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

export async function POST(request: Request) {
  try {
    if (!isCategoriesInitialized()) {
      await initCategories();
    }

    const body = await request.json();
    const name = body.name;

    if (!name) {
      return NextResponse.json({ message: 'Category name is required' }, { status: 400, headers: getCorsHeaders() });
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');

    // 检查是否已存在
    const existing = categories.find(c => c.slug === slug || c.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      return NextResponse.json({
        id: existing.id,
        name: existing.name,
        slug: existing.slug,
        taxonomy: 'category',
      }, { status: 200, headers: getCorsHeaders() });
    }

    const newId = getNextCategoryId();
    const cat = { id: newId, name, slug };
    categories.push(cat);

    return NextResponse.json({
      ...cat,
      taxonomy: 'category',
      meta: [],
    }, { status: 201, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Create category failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
