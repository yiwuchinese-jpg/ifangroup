import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../../cors';
import { replaceWpImagesWithSanityUrls } from '../../media-cache';
import { findCategoryIdByName } from '../../utils';

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: getCorsHeaders() });
}

// 简单的 hash 函数：从 asset._ref 生成稳定的数字 ID 作为 featured_media 兜底
function hashRef(ref: string): number {
  let hash = 0;
  for (let i = 0; i < ref.length; i++) {
    hash = ((hash << 5) - hash) + ref.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
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
      "featured_media": coalesce(mainImage.asset->wordpressMediaId, 0),
      "imageRef": mainImage.asset._ref
    }`, { id });

    if (!post) {
      return NextResponse.json(
        { code: 'rest_post_invalid_id', message: 'Invalid post ID.', data: { status: 404 } },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    // 优先 wordpressMediaId，无则用 imageRef hash 生成数字 ID 兜底
    const featuredMedia = post.featured_media || (post.imageRef ? hashRef(post.imageRef) : 0);

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
      featured_media: featuredMedia,
      // ⚠️ categories 必须返回数字 ID，不能返回分类名称字符串（301 Python 后端会 int(item) 遍历）
      categories: post.category
        ? [findCategoryIdByName(post.category)].filter(Boolean) as number[]
        : [],
      tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      meta: {
        rank_math_title: post.seoTitle || '',
        rank_math_description: post.seoDescription || '',
        _yoast_wpseo_title: post.seoTitle || '',
        _yoast_wpseo_metadesc: post.seoDescription || '',
      },
      _links: {
        'wp:featuredmedia': [{ embeddable: true, href: `${protocol}://${host}/wp-json/wp/v2/media/${featuredMedia}` }],
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
    const { status, slug, featured_media, meta, categories: bodyCats, tags: bodyTags } = body;

    // 提取分类名称：301 传 categories 为数字 ID 数组，需通过 categories 列表反向查找名称
    let categoryName: string | undefined;
    if (bodyCats && Array.isArray(bodyCats) && bodyCats.length > 0) {
      const { categories: catList } = await import('../../utils');
      const catId = typeof bodyCats[0] === 'object' ? bodyCats[0].id : bodyCats[0];
      const found = catList.find(c => c.id === Number(catId));
      if (found) categoryName = found.name;
    }
    // 提取标签：301 传 tags 为数组
    let tagsString: string | undefined;
    if (bodyTags && Array.isArray(bodyTags)) {
      const tagNames = bodyTags.map((t: any) => typeof t === 'object' ? t.name : String(t)).filter(Boolean);
      if (tagNames.length > 0) tagsString = tagNames.join(', ');
    }

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

    // 特色图片优先级：
    //   1. 优先从正文 HTML 中随机选一张 Sanity 图片作为封面（避免多篇文章封面雷同）
    //   2. 正文无 Sanity 图时，才用写作系统传的 featured_media
    let mainImageRef = undefined;

    // Step 1: 从正文随机选图
    if (processedHtml) {
      const imgMatches = [...processedHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
      if (imgMatches.length > 0) {
        const randomImg = imgMatches[Math.floor(Math.random() * imgMatches.length)];
        const srcUrl = randomImg[1];
        // 匹配 Sanity CDN URL 中的 asset hash
        const sanityHashMatch = srcUrl.match(
          /cdn\.sanity\.io\/images\/[^/]+\/[^/]+\/([a-f0-9]+)-\d+x\d+\.[a-z]+/i
        );
        if (sanityHashMatch) {
          const assetByUrl = await client.fetch(
            `*[_type == "sanity.imageAsset" && _id match $pattern][0] { _id }`,
            { pattern: `image-${sanityHashMatch[1]}-*` }
          );
          if (assetByUrl?._id) {
            mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: assetByUrl._id } };
          }
        }
      }
    }

    // Step 2: 正文无图时回退到写作系统的 featured_media
    if (!mainImageRef && featured_media && featured_media > 0) {
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
      if (processedHtml) patch.set({ htmlContent: processedHtml });
      if (excerpt || seoDescription) patch.set({ description: excerpt || seoDescription });
      if (seoTitle) patch.set({ seoTitle });
      if (seoDescription) patch.set({ seoDescription });
      if (mainImageRef) patch.set({ mainImage: mainImageRef });
      if (categoryName) patch.set({ category: categoryName });
      if (tagsString) patch.set({ tags: tagsString });
      if (isPublish) patch.set({ publishedAt: new Date().toISOString() });
      await patch.commit();
    } else {
      // 文档不存在则创建新的（兜底逻辑）
      const sanityDoc: Record<string, unknown> = {
        _type: 'article',
        title: titleText || 'Untitled',
        slug: finalSlug ? { _type: 'slug', current: finalSlug } : undefined,
        htmlContent: processedHtml,
        description: excerpt || seoDescription,
        seoTitle,
        seoDescription,
        wordpressId: id,
        ...(mainImageRef ? { mainImage: mainImageRef } : {}),
        ...(categoryName ? { category: categoryName } : {}),
        ...(tagsString ? { tags: tagsString } : {}),
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
