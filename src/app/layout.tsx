import type { Metadata } from "next";
import Script from "next/script";
import { getLocale } from "next-intl/server";
import ConsentScripts from "@/components/legal/ConsentScripts";
import { CONSENT_BOOTSTRAP_SCRIPT } from "@/lib/consent";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.ifanholding.com"),
    verification: {
        google: "zhVijSuQyrDiyNJcNz0jYy_JvrK5uzDQF2HtwAMnpeQ",
    },
    icons: {
        icon: [
            { url: "/logo-green.png", type: "image/png" },
        ],
        apple: [
            { url: "/logo-green.png", type: "image/png" },
        ],
        shortcut: "/logo-green.png",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 路由段之上拿不到 [locale] 参数，通过 next-intl 请求上下文取当前语言；
    // proxy 未覆盖的路由（如 /studio）会回退到默认语言 en。
    const locale = await getLocale();
    return (
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="scroll-smooth">
            <head>
                {/* 导航栏 logo 是多数页面的 LCP 元素——head 解析即开始抓取，消除发现延迟 */}
                <link rel="preload" as="image" href="/logo-white.png" fetchPriority="high" />

                {/*
                  Google Consent Mode v2 基线。必须是同步 inline 脚本且排在所有 Google 标签之前——
                  用 next/script 会被推迟到 GTM 之后，default=denied 就失去意义了。
                */}
                <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SCRIPT }} />

                <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WC6SHBR');`
                }} />
                
                {/* Google tag (gtag.js)——受 Consent Mode 约束，未同意时以无 cookie 模式运行 */}
                <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=AW-18159357442" />
                <Script id="gtag-init" strategy="lazyOnload" dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-18159357442');
                    `
                }} />

                {/* Clarity 与 Meta Pixel 不支持 Consent Mode，移到 ConsentScripts 里按同意状态挂载 */}
            </head>
            <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col">
                {/*
                  原先这里有 GTM 和 Meta Pixel 的 <noscript> 回退。禁用 JS 的访客无法表达同意，
                  这两个标签会绕过整套 Consent Mode 直接打点，因此移除——覆盖率损失可忽略。
                */}
                {children}
                <ConsentScripts />
            </body>
        </html>
    );
}
