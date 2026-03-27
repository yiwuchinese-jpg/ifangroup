import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 跳过 Next.js 内部路径和所有静态文件（含扩展名的路径）
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
