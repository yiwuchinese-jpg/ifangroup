import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity-write';
import { client } from '@/lib/sanity';
import { getCorsHeaders } from '../cors';
import { setMediaUrl } from '../media-cache';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: getCorsHeaders() });
}

/**
 * 从 Sanity _id 生成稳定的数字 ID（hash）
 */
function hashString(str: string): number {
  return Math.abs(
    str.split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 2147483647, 0)
  );
}

export async function POST(request: Request) {
  try {
    let file: File | null = null;
    let buffer: Buffer | null = null;
    let filename = `upload-${Date.now()}.jpg`;
    let altText = 'AI Generated Image';
    let titleFromForm = filename;

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      let fileKey = Array.from(formData.keys()).find(k => {
        const val = formData.get(k);
        return val && typeof val === 'object' && 'arrayBuffer' in val;
      });

      file = fileKey ? formData.get(fileKey) as File : null;

      if (file) {
        filename = file.name || filename;
        titleFromForm = filename;
        buffer = Buffer.from(await file.arrayBuffer());
      }

      if (formData.has('alt_text')) altText = formData.get('alt_text') as string || altText;
      if (formData.has('title')) titleFromForm = formData.get('title') as string || titleFromForm;
    } else if (contentType.includes('application/json')) {
      // base64 JSON 上传
      const json = await request.json();
      const base64 = json.file || json.data || json.image || '';
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
      if (json.filename) filename = json.filename;
      if (json.alt_text || json.alt) altText = json.alt_text || json.alt;
    } else {
      // 原始二进制
      buffer = Buffer.from(await request.arrayBuffer());
      const disposition = request.headers.get('content-disposition') || '';
      const nameMatch = disposition.match(/filename="?([^"]+)"?/);
      if (nameMatch) filename = nameMatch[1];
    }

    if (!buffer) {
      return NextResponse.json({ message: 'No file found' }, { status: 400, headers: getCorsHeaders() });
    }

    const asset = await writeClient.assets.upload('image', buffer, { filename });

    // 使用 hash 生成稳定的 wordpressMediaId 并写入 Sanity
    const wordpressMediaId = hashString(asset._id);
    await writeClient
      .patch(asset._id)
      .set({
        wordpressMediaId: String(wordpressMediaId),
        title: titleFromForm,
        description: altText,
        altText: altText,
        originalFilename: filename,
      })
      .commit();

    // 缓存 numericId → Sanity CDN URL，供写文章时替换 HTML 图片链接使用
    setMediaUrl(wordpressMediaId, asset.url);

    return NextResponse.json({
      id: wordpressMediaId,
      date: new Date().toISOString(),
      slug: filename.replace(/\.[^.]+$/, ''),
      type: 'attachment',
      link: asset.url,
      title: { rendered: titleFromForm },
      source_url: asset.url,
      alt_text: altText,
      media_type: 'image',
      mime_type: 'image/jpeg',
      media_details: {
        file: filename,
        sizes: {
          full: { source_url: asset.url },
        },
      },
    }, { status: 201, headers: getCorsHeaders() });
  } catch (error: any) {
    return NextResponse.json({ message: 'Upload failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const perPage = parseInt(searchParams.get('per_page') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const offset = (page - 1) * perPage;

    let query = `*[_type == "sanity.imageAsset"`;
    const params: Record<string, unknown> = { perPage, offset };

    // 分词搜索：301 写作搜图用整句短语，需分词成 OR 条件
    if (search) {
      const tokens = search
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length >= 2);

      if (tokens.length > 0) {
        const clauses = tokens.flatMap((t, idx) => {
          const key = `t${idx}`;
          params[key] = `*${t}*`;
          return [
            `originalFilename match $${key}`,
            `title match $${key}`,
            `altText match $${key}`,
            `description match $${key}`,
          ];
        });
        query += ` && (${clauses.join(' || ')})`;
      }
    }

    query += `] | order(_createdAt desc)[$offset...$perPageOffset] {
      _id,
      "url": url,
      originalFilename,
      title,
      altText,
      description,
      wordpressMediaId,
      _createdAt
    }`;
    params.perPageOffset = offset + perPage;

    // 计算总数
    let countQuery = `count(*[_type == "sanity.imageAsset"`;
    if (search) {
      const tokens = search.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(t => t.length >= 2);
      if (tokens.length > 0) {
        const countParams: Record<string, string> = {};
        const clauses = tokens.flatMap((t, idx) => {
          countParams[`t${idx}`] = `*${t}*`;
          return [
            `originalFilename match $t${idx}`,
            `title match $t${idx}`,
            `altText match $t${idx}`,
            `description match $t${idx}`,
          ];
        });
        countQuery += ` && (${clauses.join(' || ')})`;
      }
    }
    countQuery += `])`;

    const [assets, totalCount] = await Promise.all([
      client.fetch(query, params),
      client.fetch(countQuery),
    ]);

    const formatted = assets.map((asset: any) => ({
      id: parseInt(asset.wordpressMediaId) || 0,
      date: asset._createdAt || new Date().toISOString(),
      slug: (asset.originalFilename || 'image').replace(/\.[^.]+$/, ''),
      type: 'attachment',
      link: asset.url || '',
      title: { rendered: asset.title || asset.originalFilename || '' },
      source_url: asset.url || '',
      alt_text: asset.altText || '',
      media_type: 'image',
      mime_type: 'image/jpeg',
      media_details: {
        file: asset.originalFilename || '',
        sizes: {
          full: { source_url: asset.url },
        },
      },
    }));

    return NextResponse.json(formatted, {
      status: 200,
      headers: {
        ...getCorsHeaders(),
        'X-WP-Total': String(totalCount),
        'X-WP-TotalPages': String(Math.ceil(totalCount / perPage)),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ message: 'Fetch media failed', error: error.message }, { status: 500, headers: getCorsHeaders() });
  }
}
