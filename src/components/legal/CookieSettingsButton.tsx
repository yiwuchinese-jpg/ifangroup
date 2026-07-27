'use client';

import { useTranslations } from 'next-intl';
import { CONSENT_OPEN_EVENT } from '@/lib/consent';

/**
 * 页脚的「Cookie 设置」入口。GDPR 要求撤回同意与给予同意一样容易，
 * 所以必须有一个常驻入口能重新唤起偏好面板。
 */
export default function CookieSettingsButton({ className }: { className?: string }) {
    const t = useTranslations('footer');
    return (
        <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
            className={className}
        >
            {t('cookieSettings')}
        </button>
    );
}
