/**
 * 临时内存缓存：记录 WordPress 图片 ID → Sanity CDN URL 的映射
 * Evolution 301 先上传图片拿到 numericId，再写文章时 HTML 里会引用该 ID 对应的图片
 * 我们在写文章时用这份缓存把内部链接替换成真实的 CDN 链接
 *
 * 注意：Serverless 环境下每次冷启动缓存会清空，但 301 写作流程是同一次任务连续请求，
 * 在同一个实例生命周期内缓存有效，足够支撑单篇文章的图片替换。
 */

// Map<numericId (string), sanityUrl (string)>
const mediaUrlCache = new Map<string, string>();

export function setMediaUrl(id: string | number, url: string) {
  mediaUrlCache.set(String(id), url);
}

export function getMediaUrl(id: string | number): string | undefined {
  return mediaUrlCache.get(String(id));
}

/**
 * 将 HTML 内容里所有符合 WordPress 内部图片路径的 <img src> 替换成 Sanity CDN URL
 * 同时处理 Evolution 301 可能用 data-id 或 wp-image-{id} class 标记的图片
 */
export function replaceWpImagesWithSanityUrls(html: string): string {
  if (!html || mediaUrlCache.size === 0) return html;

  let result = html;

  // 遍历所有已缓存的图片映射，逐一替换
  mediaUrlCache.forEach((sanityUrl, id) => {
    // 替换 src 里包含 wp-content/uploads 或 /api/wp-json media 路径，且 filename 包含该 id 的情况
    // Evolution 301 生成的 HTML img src 通常是完整的 WP 域名路径
    // 最保险的做法：替换所有 src 为当前域名下 /wp-content/uploads/ 路径的图片
    // 根据 img 的 class="wp-image-{id}" 来精准定位
    const wpImageClassRegex = new RegExp(
      `(<img[^>]*class="[^"]*wp-image-${id}[^"]*"[^>]*src=")[^"]*(")|(<img[^>]*src=")[^"]*("[^>]*class="[^"]*wp-image-${id}[^"]*")`,
      'gi'
    );
    result = result.replace(wpImageClassRegex, (match) => {
      return match.replace(/src="[^"]*"/, `src="${sanityUrl}"`);
    });
  });

  return result;
}

/**
 * 获取最近上传的图片 Sanity URL（兜底：写封面图时使用）
 */
export function getLatestMediaUrl(): string | undefined {
  const entries = Array.from(mediaUrlCache.values());
  return entries[entries.length - 1];
}
