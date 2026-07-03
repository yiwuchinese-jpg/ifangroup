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
  matcher: ['/((?!api|_next|_vercel|tech|studio|wp-json|es/global-plumbing-supplier|.*\\..*).*)']
};
