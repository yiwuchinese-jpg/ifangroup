import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../../cors';

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: getCorsHeaders() });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const titleText = typeof body.title === 'object' ? body.title.rendered : (body.title || undefined);
    const contentHtml = typeof body.content === 'object' ? body.content.rendered : (body.content || undefined);
    const excerpt = typeof body.excerpt === 'object' ? body.excerpt.rendered : (body.excerpt || undefined);
    const { status, slug, featured_media, meta } = body;

    // 根据 wordpressId 找到 Sanity 里已有的文档
    const existingDoc = await client.fetch(`*[_type == "article" && wordpressId == $id][0]`, { id });

    // 生成 Slug（支持中文转 hex，避免 URL 非法字符）
    const finalSlug = slug || (titleText ? titleText.trim().toLowerCase()
      .replace(/[\u4e00-\u9fa5]/g, (c: string) => c.charCodeAt(0).toString(16))
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80) : undefined);

    // 提取 SEO 数据（兼容 RankMath / Yoast / AIOSEO）
    const seoTitle = meta?.rank_math_title || meta?.['_yoast_wpseo_title'] || meta?.['_aioseo_title'] || undefined;
    const seoDescription = meta?.rank_math_description || meta?.['_yoast_wpseo_metadesc'] || meta?.['_aioseo_description'] || undefined;

    // 寻找封面图（关联最新上传的图片资产）
    let mainImageRef = undefined;
    if (featured_media && featured_media > 0) {
      try {
        const latestAsset = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0] { _id }`);
        if (latestAsset?._id) {
          mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: latestAsset._id } };
        }
      } catch (e) {
        console.warn('封面图查找失败', e);
      }
    }

    if (existingDoc) {
      // 更新已有文档
      const patch = writeClient.patch(existingDoc._id);
      if (titleText) patch.set({ title: titleText });
      if (finalSlug) patch.set({ slug: { _type: 'slug', current: finalSlug } });
      if (contentHtml) patch.set({ htmlContent: contentHtml });
      if (excerpt || seoDescription) patch.set({ description: excerpt || seoDescription });
      if (seoTitle) patch.set({ seoTitle });
      if (seoDescription) patch.set({ seoDescription });
      if (mainImageRef) patch.set({ mainImage: mainImageRef });
      await patch.commit();
    } else {
      // 文档不存在则创建新的（兜底逻辑）
      const sanityDoc = {
        _type: 'article',
        title: titleText || 'Untitled',
        slug: finalSlug ? { _type: 'slug', current: finalSlug } : undefined,
        htmlContent: contentHtml,
        description: excerpt || seoDescription,
        seoTitle,
        seoDescription,
        wordpressId: id,
        publishedAt: new Date().toISOString(),
        ...(mainImageRef ? { mainImage: mainImageRef } : {}),
      };
      await writeClient.create(sanityDoc);
    }

    return NextResponse.json({
      id: parseInt(id),
      date: new Date().toISOString(),
      slug: finalSlug || id,
      status: status || 'publish',
      type: 'post',
      link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ifanholding.com'}/articles/${finalSlug || id}`,
      title: { rendered: titleText || '' },
    }, { status: 200, headers: getCorsHeaders() });

  } catch (error: any) {
    console.error('[POST /posts/[id]] 错误:', error);
    return NextResponse.json({ message: 'Post update failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}

// Evolution 301 会用 PUT 或 PATCH 来更新文章，全部复用 POST 逻辑
export { POST as PUT, POST as PATCH };
