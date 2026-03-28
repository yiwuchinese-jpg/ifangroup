import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
            <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col">
                {children}
            </body>
        </html>
    );
}
