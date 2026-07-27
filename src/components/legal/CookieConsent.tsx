'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import {
    CONSENT_ALL,
    CONSENT_NONE,
    CONSENT_OPEN_EVENT,
    readConsent,
    writeConsent,
} from '@/lib/consent';
import { useConsent } from '@/lib/useConsent';

type Panel = 'banner' | 'preferences';

export default function CookieConsent() {
    const t = useTranslations('cookieConsent');
    const consent = useConsent();
    // 页脚入口重新唤起时用，与「首次访问自动弹出」是两条独立路径
    const [reopened, setReopened] = useState(false);
    const [panel, setPanel] = useState<Panel>('banner');
    const [statistics, setStatistics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        const reopen = () => {
            const current = readConsent();
            setStatistics(!!current?.statistics);
            setMarketing(!!current?.marketing);
            setPanel('preferences');
            setReopened(true);
        };
        window.addEventListener(CONSENT_OPEN_EVENT, reopen);
        return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    }, []);

    const decide = (choice: { statistics: boolean; marketing: boolean }) => {
        writeConsent(choice);
        setReopened(false);
    };

    // consent === undefined 表示还在水合、状态未知，此时不渲染以免闪一下就消失
    const open = reopened || consent === null;
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                role="dialog"
                aria-modal="false"
                aria-labelledby="cookie-consent-title"
                // 用 start/end 逻辑属性，阿语 RTL 下弹窗会自动贴到右侧
                className="fixed z-[100] bottom-0 inset-x-0 sm:bottom-6 sm:start-6 sm:end-auto sm:w-[26rem] sm:max-w-[calc(100vw-3rem)]"
            >
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 sm:rounded-xl shadow-2xl shadow-slate-900/20 p-6 max-h-[85vh] overflow-y-auto">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h2
                            id="cookie-consent-title"
                            className="text-base font-bold text-slate-900 dark:text-white"
                        >
                            {t('title')}
                        </h2>
                        {/* 关闭 = 仅必要 cookie。GDPR 下关闭不能等同于同意 */}
                        <button
                            type="button"
                            onClick={() => decide(CONSENT_NONE)}
                            aria-label={t('close')}
                            className="shrink-0 -mt-1 -me-1 p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {t('description')}
                    </p>

                    {panel === 'preferences' && (
                        <div className="mt-5 space-y-3">
                            <CategoryRow
                                title={t('necessary.title')}
                                desc={t('necessary.desc')}
                                checked
                                locked
                                lockedLabel={t('alwaysActive')}
                            />
                            <CategoryRow
                                title={t('statistics.title')}
                                desc={t('statistics.desc')}
                                checked={statistics}
                                onChange={setStatistics}
                            />
                            <CategoryRow
                                title={t('marketing.title')}
                                desc={t('marketing.desc')}
                                checked={marketing}
                                onChange={setMarketing}
                            />
                        </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => decide(CONSENT_ALL)}
                            className="sm:col-span-2 w-full py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition-colors"
                        >
                            {t('accept')}
                        </button>
                        <button
                            type="button"
                            onClick={() => decide(CONSENT_NONE)}
                            className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold transition-colors"
                        >
                            {t('deny')}
                        </button>
                        {panel === 'banner' ? (
                            <button
                                type="button"
                                onClick={() => setPanel('preferences')}
                                className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold transition-colors"
                            >
                                {t('preferences')}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => decide({ statistics, marketing })}
                                className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-sm font-semibold transition-colors"
                            >
                                {t('save')}
                            </button>
                        )}
                    </div>

                    <div className="mt-4 text-center">
                        <Link
                            href="/privacy"
                            className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
                        >
                            {t('privacyStatement')}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function CategoryRow({
    title,
    desc,
    checked,
    onChange,
    locked,
    lockedLabel,
}: {
    title: string;
    desc: string;
    checked: boolean;
    onChange?: (v: boolean) => void;
    locked?: boolean;
    lockedLabel?: string;
}) {
    return (
        <div className="flex items-start justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-0.5">
                    {desc}
                </p>
            </div>
            {locked ? (
                <span className="shrink-0 text-[11px] font-semibold text-slate-400 uppercase tracking-wide mt-1">
                    {lockedLabel}
                </span>
            ) : (
                <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-label={title}
                    onClick={() => onChange?.(!checked)}
                    className={`shrink-0 mt-1 relative w-10 h-6 rounded-full transition-colors ${
                        checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                >
                    <span
                        className={`absolute top-0.5 start-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            checked ? 'translate-x-4 rtl:-translate-x-4' : 'translate-x-0'
                        }`}
                    />
                </button>
            )}
        </div>
    );
}
