/**
 * 产品上二维码指向的视频页。
 *
 * 这里的 code 会被印在实体产品上，一旦开模印刷就再也改不了，所以：
 *   1. code 只能新增、不能改名或删除，哪怕视频本身作废也要留着（改成指向替代内容）；
 *   2. 视频源地址故意放在这一层而不是直接写进二维码——Sanity 的资源 URL 带内容哈希，
 *      重传即变，换 CMS 更是全灭；隔一层映射，换存储只改这张表，印出去的码不受影响。
 *   3. code 一律小写。resolveQrVideo 会兜底转小写，防止扫码 App 或转印环节
 *      改了大小写就打不开；但 /v/ 这段是静态路由段、大小写敏感，所以印刷时
 *      整条 URL 必须保持小写原样。
 */
export type QrVideo = {
    /** 页面与 <video> 的语言 */
    lang: 'zh' | 'en';
    /** <html lang> 用 */
    htmlLang: string;
    title: string;
    /** 副标题，说明这段视频教什么 */
    subtitle: string;
    videoUrl: string;
    posterUrl: string;
    /** 另一种语言的 code，页面底部互跳用 */
    alternate: string;
    /** 底部按钮文案 */
    ui: {
        switchLabel: string;
        durationLabel: string;
        siteLabel: string;
        fallback: string;
    };
};

export const QR_VIDEOS: Record<string, QrVideo> = {
    'ef-cn': {
        lang: 'zh',
        htmlLang: 'zh-CN',
        title: '电熔焊接操作指引',
        subtitle: 'IFAN 电熔管件 · 施工与试压全流程',
        videoUrl:
            'https://cdn.sanity.io/files/m2e07kon/production/1e9e184dbdcd9c4f1239b43522c0aab2db3abbee.mp4',
        posterUrl:
            'https://cdn.sanity.io/images/m2e07kon/production/de9f53b4ab8c7c940302aa68e877c811de0d4ec6-854x480.jpg',
        alternate: 'ef-en',
        ui: {
            switchLabel: 'English version',
            durationLabel: '时长 6:11',
            siteLabel: '访问 IFAN 官网',
            fallback: '您的浏览器不支持视频播放，请点此下载观看。',
        },
    },
    'ef-en': {
        lang: 'en',
        htmlLang: 'en',
        title: 'Electrofusion Welding Guide',
        subtitle: 'IFAN electrofusion fittings · installation & pressure testing',
        videoUrl:
            'https://cdn.sanity.io/files/m2e07kon/production/12f23de82631aae172feab4a97e7443eef5e69b2.mp4',
        posterUrl:
            'https://cdn.sanity.io/images/m2e07kon/production/5b83f354fac690617a5bbe4f4168326375939d28-854x480.jpg',
        alternate: 'ef-cn',
        ui: {
            switchLabel: '中文版',
            durationLabel: '6:24',
            siteLabel: 'Visit IFAN website',
            fallback: 'Your browser cannot play this video. Tap here to download it.',
        },
    },
};

/** 路由大小写不敏感：二维码里可以印全大写以压缩码面。 */
export function resolveQrVideo(code: string): QrVideo | undefined {
    return QR_VIDEOS[code.toLowerCase()];
}
