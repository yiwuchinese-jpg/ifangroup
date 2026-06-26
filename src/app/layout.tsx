import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID || "1277417160921542";

export const metadata: Metadata = {
    metadataBase: new URL("https://ifanholding.com"),
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <Script id="gtm" strategy="beforeInteractive" dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WC6SHBR');`
                }} />
                
                {/* Google tag (gtag.js) */}
                <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-18159357442" />
                <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-18159357442');
                    `
                }} />
                
                {/* Microsoft Clarity */}
                <Script id="microsoft-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "wrauprsmdk");
                    `
                }} />

                {/* Meta Pixel */}
                <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${META_PIXEL_ID}');
                        fbq('track', 'PageView');
                    `
                }} />
            </head>
            <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col">
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5WC6SHBR"
                    height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
                </noscript>
                <noscript>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt=""
                    />
                </noscript>
                {children}
            </body>
        </html>
    );
}
