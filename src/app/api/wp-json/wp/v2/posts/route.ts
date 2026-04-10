import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const titleText = typeof body.title === 'object' ? body.title.rendered : (body.title || '');
    const contentHtml = typeof body.content === 'object' ? body.content.rendered : (body.content || '');
    const { slug, featured_media, meta } = body;

    const finalSlug = slug || titleText.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 80);
    const seoTitle = meta?.rank_math_title || meta?.['_yoast_wpseo_title'] || '';
    const seoDescription = meta?.rank_math_description || meta?.['_yoast_wpseo_metadesc'] || '';

    let mainImageRef = undefined;
    if (featured_media && featured_media > 0) {
      // 从最新的 image 资产中去找，以匹配前面上传的图片
      const latestAsset = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0] { _id }`);
      if (latestAsset?._id) {
        mainImageRef = { _type: 'image', asset: { _type: 'reference', _ref: latestAsset._id } };
      }
    }

    const numericWpId = String(Date.now()).slice(-6);

    const sanityDoc = {
      _type: 'article', // 修改为 article, 原本为 post
      title: titleText,
      slug: { _type: 'slug', current: finalSlug },
      htmlContent: contentHtml,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      wordpressId: numericWpId,
      publishedAt: new Date().toISOString(),
      ...(mainImageRef ? { mainImage: mainImageRef } : {}),
    };

    await writeClient.create(sanityDoc);

    return NextResponse.json({
      id: parseInt(numericWpId),
      date: new Date().toISOString(),
      slug: finalSlug,
      status: 'publish',
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
    
    // Fetch latest articles from Sanity to build internal links pool
    const query = `*[_type == "article"] | order(_createdAt desc)[0...$perPage] {
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
      link: `${protocol}://${host}/${post.slug?.current || ''}`,
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

