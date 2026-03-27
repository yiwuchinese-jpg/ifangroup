"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function Hero() {
    const t = useTranslations("hero");
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleVideoError = () => {
        if (videoRef.current) {
            videoRef.current.style.display = "none";
        }
    };

    // 优先使用环境变量中的 CDN URL，否则回退到本地路径
    const videoSrc = process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/images/static/home-hero.mp4";

    return (
        <section className="relative w-full h-screen min-h-[500px] md:min-h-[800px] flex items-end pb-20 md:pb-32 justify-start overflow-hidden bg-black">

            {/* Immersive Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                {/* Fallback gradient background when video is unavailable, placed behind the video */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-20" />
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={handleVideoError}
                    className="relative w-full h-full object-cover scale-105 -z-10"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
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
