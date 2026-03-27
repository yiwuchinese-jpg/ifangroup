import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);
export const proxy = intlMiddleware;
export default intlMiddleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|pt|ru|ar|fr)/:path*']
};
