import type { Metadata } from"next";
import"./globals.css";

export const metadata: Metadata = {
 title: {
 template:"%s | IFAN Group",
 default:"IFAN Group | Top Plumbing Manufacturer & Wholesale Supplier",
 },
 description:"Direct from our 120,000m² smart factory. Source 10,000+ PPR, PEX, and brass valves at unbeatable wholesale prices. Request your custom B2B quote today!",
 keywords: ["Plumbing System Manufacturer","PPR pipe wholesale","Brass valves factory","PEX manufacturer China","OEM plumbing supplier"],
 openGraph: {
 title:"IFAN Group | Top Plumbing Manufacturer & Wholesale Supplier",
 description:"Source 10,000+ PPR, PEX, and brass valves directly from our 120,000m² mega-factory.",
 url:"https://ifangroup.com", // Replace with real domain when live
 siteName:"IFAN Group",
 images: [
 {
 url: "/images/static/og-image.webp",
 width: 1200,
 height: 630,
 alt:"IFAN Group Manufacturing Facility",
 },
 ],
 locale:"en_US",
 type:"website",
 },
 twitter: {
 card:"summary_large_image",
 title:"IFAN Group | B2B Plumbing Manufacturer",
 description:"Direct B2B wholesale plumbing supplies. PPR, PEX & Brass.",
 },
 alternates: {
 canonical:"/",
 languages: {
"en-US":"/en-US",
"es-ES":"/es-ES",
 // Future GEO targeting flags
 },
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en"className="scroll-smooth">
 <body
 className={`font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen flex flex-col`}
 >
 <main className="flex-1">
 {children}
 </main>
 </body>
 </html>
 );
}
