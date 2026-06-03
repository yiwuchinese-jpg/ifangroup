import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';
import { replaceWpImagesWithSanityUrls } from '../media-cache';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const titleText = typeof body.title === 'object' ? body.title.rendered : (body.title || '');
    const contentHtml = typeof body.content === 'object' ? body.content.rendered : (body.content || '');
    const { slug, featured_media, meta, status } = body;

    const finalSlug = slug || titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 80);
    const seoTitle = meta?.rank_math_title || meta?.['_yoast_wpseo_title'] || '';
    const seoDescription = meta?.rank_math_description || meta?.['_yoast_wpseo_metadesc'] || '';

    // 替换 AI 生成 HTML 里的 WordPress 内部图片链接 → Sanity CDN URL
    const processedHtml = replaceWpImagesWithSanityUrls(contentHtml);

    let mainImageRef = undefined;
    if (featured_media && featured_media > 0) {
      // 通过 wordpressMediaId 精准查找匹配的 asset
      const matchedAsset = await client.fetch(
        `*[_type == "sanity.imageAsset" && wordpressMediaId == $wpMediaId][0] { _id }`,
        { wpMediaId: String(featured_media) }
      );
      if (matchedAsset?._id) {
        mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: matchedAsset._id } };
      }
    }

    const numericWpId = String(Date.now()).slice(-6);
    const isPublish = status === 'publish';

    const sanityDoc: Record<string, unknown> = {
      _type: 'article',
      title: titleText,
      slug: { _type: 'slug', current: finalSlug },
      htmlContent: processedHtml,  // 使用替换图片链接后的 HTML
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      wordpressId: numericWpId,
      ...(mainImageRef ? { mainImage: mainImageRef } : {}),
    };
    // 仅 status=publish 时才设置 publishedAt，避免空草稿出现在博客列表
    if (isPublish) {
      sanityDoc.publishedAt = new Date().toISOString();
    }

    await writeClient.create(sanityDoc as any);

    return NextResponse.json({
      id: parseInt(numericWpId),
      date: new Date().toISOString(),
      slug: finalSlug,
      status: isPublish ? 'publish' : 'draft',
      type: 'post',
      link: `https://${request.headers.get('host') || 'your-domain.com'}/${finalSlug}`,
      title: { rendered: titleText },
    }, { status: 201, headers: getCorsHeaders() });

  } catch (error: any) {
    return NextResponse.json({ message: 'Post creation failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = parseInt(searchParams.get('per_page') || '100', 10);

    // 只返回有 publishedAt 的文章（已发布的），草稿不显示
    const query = `*[_type == "article" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc)[0...$perPage] {
      title,
      slug,
      wordpressId,
      publishedAt,
      _createdAt
    }`;
    const posts = await client.fetch(query, { perPage });

    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'your-domain.com';

    const formattedPosts = posts.map((post: any) => ({
      id: parseInt(post.wordpressId) || Math.floor(Math.random() * 1000000),
      date: post.publishedAt || post._createdAt,
      slug: post.slug?.current || 'unknown-slug',
      status: 'publish',
      type: 'post',
      link: `${protocol}://${host}/articles/${post.slug?.current || ''}`,
      title: { rendered: post.title },
    }));

    return NextResponse.json(formattedPosts, {
      status: 200,
      headers: {
        ...getCorsHeaders(),
        'X-WP-Total': String(posts.length),
        'X-WP-TotalPages': '1'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Fetch posts failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
