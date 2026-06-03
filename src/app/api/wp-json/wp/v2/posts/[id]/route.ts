import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../../cors';
import { replaceWpImagesWithSanityUrls } from '../../media-cache';

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: getCorsHeaders() });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // 从 Sanity 查询真实 post 数据，301 写作发布后会调此接口验证 featured_media > 0
    const post = await client.fetch(`*[_type == "article" && wordpressId == $id][0]{
      title,
      wordpressId,
      "slug": slug.current,
      htmlContent,
      category,
      tags,
      publishedAt,
      seoTitle,
      seoDescription,
      "featured_media": coalesce(mainImage.asset->wordpressMediaId, 0)
    }`, { id });

    if (!post) {
      return NextResponse.json(
        { code: 'rest_post_invalid_id', message: 'Invalid post ID.', data: { status: 404 } },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    const protocol = _request.headers.get('x-forwarded-proto') || 'https';
    const host = _request.headers.get('host') || 'www.ifanholding.com';

    return NextResponse.json({
      id: parseInt(post.wordpressId || id),
      date: post.publishedAt || new Date().toISOString(),
      date_gmt: post.publishedAt || new Date().toISOString(),
      modified: post.publishedAt || new Date().toISOString(),
      modified_gmt: post.publishedAt || new Date().toISOString(),
      status: post.publishedAt ? 'publish' : 'draft',
      type: 'post',
      slug: post.slug || id,
      link: `${protocol}://${host}/articles/${post.slug || id}`,
      title: { rendered: post.title || '' },
      content: { rendered: post.htmlContent || '', protected: false },
      excerpt: { rendered: post.seoDescription?.substring(0, 200) || '', protected: false },
      featured_media: parseInt(post.featured_media) || 0,
      categories: post.category ? [post.category] : [],
      tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      meta: {
        rank_math_title: post.seoTitle || '',
        rank_math_description: post.seoDescription || '',
        _yoast_wpseo_title: post.seoTitle || '',
        _yoast_wpseo_metadesc: post.seoDescription || '',
      },
      _links: {
        'wp:featuredmedia': [{ embeddable: true, href: `${protocol}://${host}/wp-json/wp/v2/media/${post.featured_media || 0}` }],
        'wp:attachment': [{ href: `${protocol}://${host}/wp-json/wp/v2/media?parent=${post.wordpressId || id}` }],
      },
    }, { status: 200, headers: getCorsHeaders() });
  } catch (error: any) {
    console.error('[GET /posts/[id]] 错误:', error);
    return NextResponse.json(
      { code: 'rest_post_invalid_id', message: 'Invalid post ID.', data: { status: 404 } },
      { status: 404, headers: getCorsHeaders() }
    );
  }
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

    // 替换 AI 生成 HTML 里的 WordPress 内部图片链接 → Sanity CDN URL
    const processedHtml = contentHtml ? replaceWpImagesWithSanityUrls(contentHtml) : undefined;

    // 通过 wordpressMediaId 精准查找匹配的 asset
    let mainImageRef = undefined;
    if (featured_media && featured_media > 0) {
      try {
        const matchedAsset = await client.fetch(
          `*[_type == "sanity.imageAsset" && wordpressMediaId == $wpMediaId][0] { _id }`,
          { wpMediaId: String(featured_media) }
        );
        if (matchedAsset?._id) {
          mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: matchedAsset._id } };
        }
      } catch (e) {
        console.warn('封面图查找失败', e);
      }
    }

    // status=publish 时才设置 publishedAt，避免空草稿出现在博客列表
    const isPublish = status === 'publish';

    if (existingDoc) {
      // 更新已有文档
      const patch = writeClient.patch(existingDoc._id);
      if (titleText) patch.set({ title: titleText });
      if (finalSlug) patch.set({ slug: { _type: 'slug', current: finalSlug } });
      if (processedHtml) patch.set({ htmlContent: processedHtml }); // 使用替换图片后的 HTML
      if (excerpt || seoDescription) patch.set({ description: excerpt || seoDescription });
      if (seoTitle) patch.set({ seoTitle });
      if (seoDescription) patch.set({ seoDescription });
      if (mainImageRef) patch.set({ mainImage: mainImageRef });
      if (isPublish) patch.set({ publishedAt: new Date().toISOString() });
      await patch.commit();
    } else {
      // 文档不存在则创建新的（兜底逻辑）
      const sanityDoc: Record<string, unknown> = {
        _type: 'article',
        title: titleText || 'Untitled',
        slug: finalSlug ? { _type: 'slug', current: finalSlug } : undefined,
        htmlContent: processedHtml, // 使用替换图片后的 HTML
        description: excerpt || seoDescription,
        seoTitle,
        seoDescription,
        wordpressId: id,
        ...(mainImageRef ? { mainImage: mainImageRef } : {}),
      };
      // 仅 publish 时设置 publishedAt
      if (isPublish) {
        sanityDoc.publishedAt = new Date().toISOString();
      }
      await writeClient.create(sanityDoc as any);
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
