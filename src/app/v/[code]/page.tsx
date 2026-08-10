import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { QR_VIDEOS, resolveQrVideo } from '@/lib/qrVideos';

/**
 * 印在产品上的二维码落地页。访客几乎全部是工地现场用手机扫码进来的，
 * 因此：移动优先、深色（视频本身是黑底）、不自动播放（可能在嘈杂或安静场合）、
 * poster 先出图让人确认扫对了、preload=metadata 省流量。
 * 不进搜索索引——这是产品附属物料，不是内容页。
 */

export const dynamicParams = true;

export async function generateStaticParams() {
    return Object.keys(QR_VIDEOS).map((code) => ({ code }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ code: string }>;
}): Promise<Metadata> {
    const { code } = await params;
    const video = resolveQrVideo(code);
    if (!video) return { robots: { index: false, follow: false } };
    return {
        title: `${video.title} | IFAN`,
        description: video.subtitle,
        robots: { index: false, follow: false },
    };
}

export default async function QrVideoPage({
    params,
}: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await params;
    const video = resolveQrVideo(code);
    if (!video) notFound();

    const alternate = QR_VIDEOS[video.alternate];

    return (
        <main
            lang={video.htmlLang}
            className="min-h-dvh bg-[#0b0f14] text-slate-100 flex flex-col items-center px-4 py-8 sm:py-12"
        >
            <div className="w-full max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logo-white.png"
                    alt="IFAN"
                    width={104}
                    height={32}
                    className="h-8 w-auto"
                />

                <h1 className="mt-6 text-2xl sm:text-3xl font-semibold tracking-tight">
                    {video.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-400">{video.subtitle}</p>

                <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
                    <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.posterUrl}
                        className="block w-full aspect-video bg-black"
                    >
                        <source src={video.videoUrl} type="video/mp4" />
                        <a href={video.videoUrl}>{video.ui.fallback}</a>
                    </video>
                </div>

                <p className="mt-3 text-xs text-slate-500">{video.ui.durationLabel}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                    <Link
                        href={`/v/${video.alternate}`}
                        hrefLang={alternate.htmlLang}
                        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10"
                    >
                        {video.ui.switchLabel}
                    </Link>
                    <a
                        href="https://www.ifanholding.com"
                        className="rounded-lg px-4 py-2 text-sm text-slate-400 transition-colors hover:text-slate-100"
                    >
                        {video.ui.siteLabel} →
                    </a>
                </div>
            </div>
        </main>
    );
}
