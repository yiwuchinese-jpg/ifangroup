"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

// 给 Cloudinary 视频 URL 注入转码参数：自动格式、经济画质、限宽 1280。
// 原始 mp4 约 30MB，转码后约 2-3MB；非 Cloudinary 链接原样返回。
function optimizeVideoUrl(url: string): string {
    if (url.includes("res.cloudinary.com") && url.includes("/video/upload/") && !url.includes("q_auto")) {
        return url.replace("/video/upload/", "/video/upload/f_auto:video,q_auto:eco,w_1280/");
    }
    return url;
}

export default function Hero() {
    const t = useTranslations("hero");
    const videoRef = useRef<HTMLVideoElement>(null);
    // 首屏只渲染海报图（LCP），视频等页面加载完再挂载，不与首屏资源抢带宽
    const [showVideo, setShowVideo] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        // 手机端不加载背景视频：海报 + 文字已足够，省下 ~7MB 流量且不干扰 LCP；
        // 用户开了省流模式（Save-Data）时同样跳过
        const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        if (!window.matchMedia("(min-width: 768px)").matches || conn?.saveData) return;
        const start = () => {
            // 页面空闲后再开始拉视频
            if ("requestIdleCallback" in window) {
                (window as Window & typeof globalThis).requestIdleCallback(() => setShowVideo(true), { timeout: 3000 });
            } else {
                setTimeout(() => setShowVideo(true), 1500);
            }
        };
        if (document.readyState === "complete") {
            start();
        } else {
            window.addEventListener("load", start, { once: true });
            return () => window.removeEventListener("load", start);
        }
    }, []);

    const handleVideoError = () => {
        if (videoRef.current) {
            videoRef.current.style.display = "none";
        }
    };

    // 优先使用环境变量中的 CDN URL，否则回退到本地路径
    const videoSrc = optimizeVideoUrl(
        process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/images/static/home-hero-optimized.mp4"
    );

    return (
        <section className="relative w-full h-screen min-h-[500px] md:min-h-[800px] flex items-end pb-20 md:pb-32 justify-start overflow-hidden bg-black">

            {/* Immersive Background: poster first (LCP), video fades in when ready */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {/* Fallback gradient background, behind everything */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
                <Image
                    src="/images/static/home-hero-poster.jpg"
                    alt=""
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    quality={70}
                    className="object-cover scale-105"
                />
                {showVideo && (
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onError={handleVideoError}
                        onPlaying={() => setVideoReady(true)}
                        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                )}
                {/* Subtle gradient at the bottom to ensure the white text pops without washing out the video */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl lg:text-[8rem] font-bold text-white tracking-tighter leading-[0.9] mb-8 md:mb-12 max-w-5xl"
                >
                    {t("headline1")} <br />
                    {t("subheadline")}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                >
                    <Link
                        href="#featured-collections"
                        className="group flex flex-col items-start gap-2 max-w-max"
                    >
                        <span className="text-white font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                            {t("cta_catalog")}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                        </span>
                        <div className="h-[1px] w-full bg-white/30 group-hover:bg-white transition-colors duration-300" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
