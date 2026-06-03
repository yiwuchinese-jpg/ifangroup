import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../../cors';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * GET /wp-json/wp/v2/media/{id} — 返回完整 asset 数据
 * 301 写作需要 source_url 来插入 <img> 标签
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const asset = await client.fetch(
      `*[_type == "sanity.imageAsset" && wordpressMediaId == $id][0]{
        _id, url, originalFilename, title, altText, description, wordpressMediaId, _createdAt
      }`,
      { id }
    );

    if (!asset) {
      return NextResponse.json(
        { code: 'rest_post_invalid_id', message: 'Invalid media ID.', data: { status: 404 } },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    return NextResponse.json({
      id: parseInt(asset.wordpressMediaId || id),
      date: asset._createdAt || new Date().toISOString(),
      slug: (asset.originalFilename || 'image').replace(/\.[^.]+$/, ''),
      type: 'attachment',
      link: asset.url || '',
      title: { rendered: asset.title || asset.originalFilename || '' },
      source_url: asset.url || '',
      alt_text: asset.altText || '',
      description: { rendered: asset.description || '' },
      media_type: 'image',
      mime_type: 'image/jpeg',
      media_details: {
        file: asset.originalFilename || '',
        sizes: {
          full: { source_url: asset.url },
        },
      },
    }, { status: 200, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json(
      { code: 'rest_post_invalid_id', message: 'Invalid media ID.', data: { status: 404 } },
      { status: 404, headers: getCorsHeaders() }
    );
  }
}

/**
 * POST /wp-json/wp/v2/media/{id} — 更新媒体元数据（alt_text, title, description 等）
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const asset = await client.fetch(
      `*[_type == "sanity.imageAsset" && wordpressMediaId == $id][0] { _id }`,
      { id }
    );

    if (!asset) {
      return NextResponse.json(
        { code: 'rest_post_invalid_id', message: 'Invalid media ID.', data: { status: 404 } },
        { status: 404, headers: getCorsHeaders() }
      );
    }

    const body = await request.json();
    const patch = writeClient.patch(asset._id);

    if (body.title) {
      const titleText = typeof body.title === 'object' ? body.title.rendered : body.title;
      patch.set({ title: titleText });
    }
    if (body.alt_text) {
      patch.set({ altText: body.alt_text });
    }
    if (body.description) {
      const descText = typeof body.description === 'object' ? body.description.rendered : body.description;
      patch.set({ description: descText });
    }

    await patch.commit();

    // 返回更新后的数据
    const updated = await client.fetch(
      `*[_type == "sanity.imageAsset" && _id == $id][0]{
        url, originalFilename, title, altText, description, wordpressMediaId, _createdAt
      }`,
      { id: asset._id }
    );

    return NextResponse.json({
      id: parseInt(updated.wordpressMediaId || id),
      date: updated._createdAt || new Date().toISOString(),
      type: 'attachment',
      link: updated.url || '',
      title: { rendered: updated.title || '' },
      source_url: updated.url || '',
      alt_text: updated.altText || '',
      description: { rendered: updated.description || '' },
      media_type: 'image',
    }, { status: 200, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Update media failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
