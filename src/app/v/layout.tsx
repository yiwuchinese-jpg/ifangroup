/**
 * 二维码视频页是整站唯一的深色页面。根 layout 的 body 是浅色，
 * 手机上下拉回弹（iOS rubber-band）时会在深色内容后面露出白边，
 * 所以这里把 body 背景压成同色。
 */
export default function QrVideoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <style>{`body{background:#0b0f14}`}</style>
            {children}
        </>
    );
}
