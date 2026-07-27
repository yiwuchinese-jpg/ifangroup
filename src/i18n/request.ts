import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Ensure that the incoming locale is valid
    if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
        locale = routing.defaultLocale;
    }

    const messages = (await import(`../../messages/${locale}.json`)).default;
    const enMessages =
        locale === routing.defaultLocale
            ? messages
            : (await import(`../../messages/${routing.defaultLocale}.json`)).default;

    return {
        locale,
        messages,
        // 缺 key 时默认会把 "categories.items.foo.heroTitle" 原样渲染给用户。
        // 先退回英文原文，实在没有才显示末段 key——页面上永远不出现点分路径。
        getMessageFallback({ key, namespace }) {
            const path = namespace ? `${namespace}.${key}` : key;
            const en = path
                .split(".")
                .reduce<unknown>((node, part) =>
                    node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined,
                    enMessages
                );
            if (typeof en === "string") return en;
            return path.split(".").pop() ?? path;
        },
    };
});
