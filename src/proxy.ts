import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
export default intlMiddleware;

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next`, `/_vercel`, or `/tech`
  // - ... the ones containing a dot (e.g. `favicon.ico`)
  // 注意：不要把 global-plumbing-supplier 排除在外——排除后无前缀 URL 会落到
  // [locale] 段被当成非法 locale 而 404（该 bug 曾导致 sitemap 里出现 404 页）。
  //
  // `v/` 是产品二维码的视频页，和 tech/studio 一样是 [locale] 之外的独立路由，
  // 必须排除，否则 `v` 会被 i18n 中间件当成非法 locale 而 404。
  // 写成 `v/` 而不是 `v`：lookahead 只比前缀，只写 `v` 会顺带吃掉将来任何以 v
  // 开头的多语言路径（如 /valves）。
  matcher: ['/((?!api|_next|_vercel|tech|studio|wp-json|v/|es/global-plumbing-supplier|.*\\..*).*)']
};
