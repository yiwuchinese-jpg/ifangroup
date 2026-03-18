"use client";

import React from "react";
import { BookOpen, ChevronLeft, ChevronRight, ShieldCheck, Package, Megaphone } from "lucide-react";
import dynamic from 'next/dynamic';
import { useTranslations } from "next-intl";

type GalleryMaterial = {
    asset?: {
        url?: string;
    };
};

type FlipBookProps = {
    width: number;
    height: number;
    size: string;
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    maxShadowOpacity: number;
    showCover: boolean;
    mobileScrollSupport: boolean;
    className?: string;
    style?: React.CSSProperties;
    useMouseEvents?: boolean;
    children: React.ReactNode;
};

// dynamically import HTMLFlipBook to avoid Next.js SSR window is not defined error
const HTMLFlipBook = dynamic<FlipBookProps>(() => import('react-pageflip').then(mod => mod.default as never), {
    ssr: false,
    loading: () => {
        // We can't use useTranslations here because it's outside the component, 
        // but it's a loading state, maybe we just use a generic one or pass it.
        return <div className="w-full aspect-[4/3] max-w-4xl mx-auto flex items-center justify-center bg-slate-100 border border-slate-200 animate-pulse text-slate-400">Loading Book Engine...</div>
    }
});

interface SecureGalleryProps {
    packagingMaterials?: GalleryMaterial[];
    marketingMaterials?: GalleryMaterial[];
    brandName: string;
    logoUrl?: string;
}

// Custom Page component for Flipbook
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode, number?: number }>((props, ref) => {
    return (
        <div className="demoPage bg-white shadow-xl inset-y-0 relative" ref={ref}>
            <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-0 m-0 overflow-hidden bg-[#faf9f6]">
                 {/* Inner paper texture */}
                 <div className="absolute inset-0 pointer-events-none mix-blend-multiply bg-[linear-gradient(120deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0)_100%)] z-0" />
                 
                {props.children}
                
                {props.number && (
                    <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-30 opacity-40">
                        <span className="text-[10px] text-slate-500 font-mono select-none bg-white px-2 py-0.5 rounded-sm border border-slate-100">
                            {props.number}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
});
Page.displayName = 'FlipbookPage';

// Cover Page Component
const CoverPage = React.forwardRef<HTMLDivElement, { brandName: string, title?: string, logoUrl?: string, dragToOpenText?: string }>((props, ref) => {
    return (
        <div className="demoPage inset-y-0 border-r border-slate-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.4),_0_20px_40px_rgba(0,0,0,0.5)] relative bg-brand-600" ref={ref}>
            <div 
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 text-center`} 
                style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.3) 100%)' }}
            >
                {/* Book Binding Groove (3D details for front cover left edge) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_20%,rgba(255,255,255,0.2)_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-black/30 blur-[1px] pointer-events-none" />
                
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-md">
                    {props.brandName}
                </h1>
                <div className="h-[2px] w-24 bg-white/50 mb-6 shadow-sm" />
                <h2 className="text-sm font-bold tracking-[0.4em] text-white/90 uppercase bg-black/20 px-6 py-2 border border-white/10 backdrop-blur-sm shadow-inner">
                    {props.title || "Catalog"}
                </h2>
                
                <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-2 text-white/80">
                    <ChevronLeft className="w-4 h-4 animate-pulse" />
                    <span className="text-xs uppercase tracking-widest cursor-pointer font-bold drop-shadow-sm">{props.dragToOpenText || "Drag to open"}</span>
                    <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
            </div>
            
            {/* Paper thickness highlight on right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-white/10 to-white/70" />
        </div>
    );
});
CoverPage.displayName = 'FlipbookCoverPage';

export default function SecureGallery({ packagingMaterials = [], marketingMaterials = [], brandName, logoUrl }: SecureGalleryProps) {
    const t = useTranslations("secureGallery");
    const tc = useTranslations("common");

    const hasPackaging = packagingMaterials.length > 0;
    const hasMarketing = marketingMaterials.length > 0;

    if (!hasPackaging && !hasMarketing) return null;

    // Strict Anti-Download
    const handleProtect = (e: React.MouseEvent | React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    // Render a complete single book based on a specific category
    const renderBook = (materials: GalleryMaterial[], title: string, bookSubject: string, typeName: string, icon: React.ReactNode) => {
        if (!materials || materials.length === 0) return null;

        // Calculate pages to ensure proper closing
        // Cover (1) + Inside Cover Empty (2) + Content (N) + Filler if needed + Inside Back Cover Empty + Back Cover
        // The total number of pages passed to HTMLFlipBook must be an even number, 
        // and ideally we want the final page pair to be (Inside Back Cover | Back Cover)
        
        const pages = [];
        
        // 1. Front Cover (Outside right)
        pages.push(<CoverPage key={`cover-${bookSubject}`} brandName={brandName} title={bookSubject} dragToOpenText={tc("dragToOpen")} logoUrl={logoUrl} />);
        
        // 2. Inside Front Cover (Inside left, empty brand color or white)
        pages.push(
            <Page key={`inside-cover-${bookSubject}`}>
                 <div className="w-full h-full bg-slate-100 flex items-center justify-center relative border-r border-slate-200">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_100%)]"></div>
                     <ShieldCheck className="w-12 h-12 text-slate-300 opacity-30" />
                     {/* Crease shadow */}
                     <div className="absolute right-0 top-0 bottom-0 w-8 bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_30%,transparent_100%)] pointer-events-none" />
                 </div>
            </Page>
        );

        // 3. Content Pages
        materials.forEach((img, idx) => {
            const url = img.asset?.url;
            const pageNumber = idx + 1; // Content starts at page 1
            const isRightSide = (idx % 2 === 0); // 0th content is right side (page 3 overall)

            pages.push(
                // Paper shadow for individual pages
                <Page key={`content-${bookSubject}-${idx}`} number={pageNumber}>
                    <div 
                        className="w-full h-full relative cursor-grab active:cursor-grabbing group z-10"
                        onContextMenu={handleProtect}
                    >
                        {/* The Image layer */}
                        <div 
                             className="absolute inset-0 w-full h-full bg-no-repeat bg-contain bg-center z-10 p-6 md:p-10"
                             style={{ backgroundImage: `url(${url})` }}
                        />

                        {/* Anti-download Transparent Overlay - Blocks right click and dragging */}
                        <div className="absolute inset-0 z-30 w-full h-full bg-transparent" onContextMenu={handleProtect} onDragStart={handleProtect} />

                        {/* Ultimate Anti-Screenshot Watermark Layer */}
                        <div className="absolute z-20 w-[150%] h-[150%] -top-[25%] -left-[25%] pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJz48dGV4dCB4PSc0MCcgeT0nNicgdHJhbnNmb3JtPSdyb3RhdGUoMzE1IDUwIDUwKScgZmlsbD0ncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyBmb250LXNpemU9JzgnPkNPTkZJREVOVElBTDwvdGV4dD48L3N2Zz4=')] transform rotate-12" />
                        
                        {/* Page Info Header */}
                        <div className={`absolute top-4 ${isRightSide ? 'right-4' : 'left-4'} flex flex-col gap-1 pointer-events-none z-40 opacity-40 group-hover:opacity-100 transition-opacity`}>
                             <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-[#faf9f6]/90 backdrop-blur-sm px-2 py-0.5 border border-slate-200">
                                {typeName}
                             </span>
                        </div>
                        
                        {/* Detailed 3D Book Binding/Crease overlay for realism */}
                        <div className={`absolute top-0 bottom-0 w-12 pointer-events-none z-40 ${isRightSide ? 'left-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.05)_40%,transparent_100%)]' : 'right-0 bg-[linear-gradient(270deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.05)_40%,transparent_100%)]'}`} />
                        
                        {/* Outer page edge shadow/gradient */}
                        <div className={`absolute top-0 bottom-0 w-3 pointer-events-none z-40 ${isRightSide ? 'right-0 bg-gradient-to-l from-black/10 to-transparent' : 'left-0 bg-gradient-to-r from-black/10 to-transparent'}`} />
                    </div>
                </Page>
            );
        });

        // 4. Parity fill
        // If materials.length is odd, last content page is on the right. We need a blank page on the left to close it.
        if (materials.length % 2 !== 0) {
            pages.push(
                <Page key={`filler-${bookSubject}`}>
                    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <ShieldCheck className="w-16 h-16 text-slate-400" />
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-12 bg-[linear-gradient(270deg,rgba(0,0,0,0.4)_0%,transparent_100%)] pointer-events-none z-40" />
                    </div>
                </Page>
            );
        }

        // 5. Inside Back Cover (Left side)
        pages.push(
            <Page key={`inside-back-${bookSubject}`}>
                 <div className="w-full h-full bg-slate-100 flex items-center justify-center relative border-r border-slate-200">
                     <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-bold mt-32">{t("endOf", { title })}</p>
                     {/* Crease */}
                     <div className="absolute right-0 top-0 bottom-0 w-12 bg-[linear-gradient(270deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_30%,transparent_100%)] pointer-events-none z-40" />
                 </div>
            </Page>
        );

        // 6. Final Back Cover (Right side outside)
        pages.push(
            <Page key={`back-cover-${bookSubject}`}>
                 <div className="w-full h-full bg-brand-600 flex flex-col items-center justify-center relative border-l border-brand-800 shadow-[inset_0_0_60px_rgba(0,0,0,0.5)]">
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.3)_0%,rgba(255,255,255,0.05)_100%)]"></div>
                     
                     <ShieldCheck className="w-12 h-12 text-white opacity-40 mb-4" />
                     <div className="text-[8px] text-white/40 uppercase tracking-[0.3em] px-8 text-center leading-relaxed">
                         {tc("protectedDocument")} <br/>
                         {tc("propertyOf")} <br/>
                         <span className="font-bold text-white/80">{brandName}</span>
                     </div>
                     
                     {/* Back Binding Groove (spine on the left side of the back cover) */}
                     <div className="absolute left-0 top-0 bottom-0 w-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.1)_20%,rgba(255,255,255,0.1)_50%,rgba(0,0,0,0.2)_100%)] pointer-events-none" />
                 </div>
            </Page>
        );
        return (
            <div className="flex-1 min-w-0 flex flex-col items-center w-full">
                <div className="flex items-center gap-4 mb-12 w-full px-4 xl:px-8">
                    <div className="p-3 bg-brand-50 text-brand-600 border border-brand-100 rounded-sm">
                        {icon}
                    </div>
                    <div className="text-left">
                        <span className="text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase block mb-1">{tc("physicalStack")}</span>
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                            {title}
                        </h3>
                    </div>
                </div>

                <div className="flex justify-center w-full px-4 xl:px-8 drop-shadow-2xl mb-12">
                    <HTMLFlipBook 
                        width={400} 
                        height={560}
                        size="stretch"
                        minWidth={300}
                        maxWidth={600}
                        minHeight={420}
                        maxHeight={840}
                        maxShadowOpacity={0.6}
                        showCover={true}
                        mobileScrollSupport={true}
                        className="flipbook-component mx-auto"
                        style={{ margin: '0 auto' }}
                        useMouseEvents={true}
                    >
                        {pages}
                    </HTMLFlipBook>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col pt-16 select-none max-w-[1600px] mx-auto">
            {/* Global Header */}
            <div className="container mx-auto px-6 mb-16 text-center md:text-left z-40 relative border-b border-slate-200 pb-12">
                <span className="text-brand-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 flex items-center justify-center md:justify-start gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600" /> {t("assetLibrary")}
                </span>
                
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-brand-600 tracking-tighter uppercase mb-6 flex flex-col md:flex-row md:items-center gap-4">
                    {t("lookbookTitle")}
                </h2>
                
                <div className="max-w-xl mx-auto md:mx-0 border-l-4 border-brand-600 pl-6 py-1">
                    <p className="text-slate-500 text-base leading-relaxed">
                        {t("simulationDesc", { brandName })} <span className="font-bold text-slate-700">{t("protectionNotice")}</span>
                    </p>
                </div>
            </div>

            {/* Separated Side-by-Side Presentation Stage */}
            <div className="container mx-auto px-4 lg:px-6 relative w-full overflow-hidden flex flex-col xl:flex-row justify-center items-center gap-12 xl:gap-24 pb-32">
                 
                {/* 只有一本时的左侧文案区域 */}
                {(hasPackaging !== hasMarketing) && (
                    <div className="flex-1 w-full max-w-xl xl:max-w-2xl px-4 xl:px-0">
                        <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100 rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                            
                            <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-6 relative z-10">
                                {hasPackaging ? t("packagingTitle") : t("marketingTitle")}
                            </h3>
                            
                            <p className="text-slate-600 leading-relaxed text-lg mb-8 relative z-10 font-light">
                                {hasPackaging 
                                    ? t("packagingDesc", { brandName })
                                    : t("marketingDesc", { brandName })}
                            </p>

                            <div className="flex items-start gap-4 p-5 bg-white border border-slate-100 relative z-10">
                                <ShieldCheck className="w-6 h-6 text-brand-500 shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-1">{tc("confidentialAsset")}</h4>
                                    <p className="text-sm text-slate-500">{tc("authorizedOnly")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 右侧（或全部）画册区域 */}
                {hasPackaging && renderBook(packagingMaterials, t("packagingTitle"), "Packaging Showcase", "Packaging", <Package className="w-6 h-6" />)}
                
                {hasMarketing && renderBook(marketingMaterials, t("marketingTitle"), "Marketing & VI Showcase", "Marketing", <Megaphone className="w-6 h-6" />)}
            </div>
        </div>
    );
}
