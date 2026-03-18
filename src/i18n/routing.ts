import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'es', 'pt', 'ru', 'ar', 'fr'],
    defaultLocale: 'en',
    localePrefix: 'as-needed', // /en paths omit the prefix, others use /es, /pt, etc.
});
