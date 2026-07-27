/**
 * Cookie 同意状态的读写与广播。
 *
 * 分两级：statistics（GA4/Clarity）和 marketing（Google Ads/Meta Pixel）。
 * necessary 永远开启，不进存储——没得选的东西不需要记录选择。
 */

export const CONSENT_STORAGE_KEY = 'ifan_consent_v1';
export const CONSENT_EVENT = 'ifan:consent-change';
export const CONSENT_OPEN_EVENT = 'ifan:consent-open';

export type ConsentState = {
    statistics: boolean;
    marketing: boolean;
    /** 记录同意时的时间戳，GDPR 要求能证明「何时取得同意」 */
    ts: number;
    version: 1;
};

export const CONSENT_ALL: Pick<ConsentState, 'statistics' | 'marketing'> = {
    statistics: true,
    marketing: true,
};

export const CONSENT_NONE: Pick<ConsentState, 'statistics' | 'marketing'> = {
    statistics: false,
    marketing: false,
};

export function readConsent(): ConsentState | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.version !== 1) return null;
        return {
            statistics: !!parsed.statistics,
            marketing: !!parsed.marketing,
            ts: Number(parsed.ts) || 0,
            version: 1,
        };
    } catch {
        // 隐私模式下 localStorage 可能直接抛异常，视作未做选择
        return null;
    }
}

export function writeConsent(choice: Pick<ConsentState, 'statistics' | 'marketing'>): ConsentState {
    const state: ConsentState = { ...choice, ts: Date.now(), version: 1 };
    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    } catch {
        // 写不进去也要继续走 gtag update，至少本次会话是合规的
    }
    pushConsentToGtag(state);
    window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
    return state;
}

/** 把选择同步给 Google Consent Mode v2。inline 脚本已建好 dataLayer 和 gtag。 */
export function pushConsentToGtag(state: Pick<ConsentState, 'statistics' | 'marketing'>) {
    if (typeof window === 'undefined') return;
    const w = window as unknown as {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    // bootstrap 脚本已定义 window.gtag，它会把 arguments 对象整体入队——
    // Consent Mode 只认这种形态，直接 push 数组字面量不生效。
    w.gtag?.('consent', 'update', {
        ad_storage: state.marketing ? 'granted' : 'denied',
        ad_user_data: state.marketing ? 'granted' : 'denied',
        ad_personalization: state.marketing ? 'granted' : 'denied',
        personalization_storage: state.marketing ? 'granted' : 'denied',
        analytics_storage: state.statistics ? 'granted' : 'denied',
    });
    w.dataLayer.push({
        event: 'ifan_consent_update',
        consent_statistics: state.statistics,
        consent_marketing: state.marketing,
    });
}

/**
 * 在 GTM 之前同步执行的 inline 脚本。
 * 必须建立 default=denied 基线，并在有历史选择时立刻 update——
 * 否则回访用户会先被当成拒绝，丢掉首屏的 pageview。
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent','default',{
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    personalization_storage:'denied',
    analytics_storage:'denied',
    functionality_storage:'granted',
    security_storage:'granted',
    wait_for_update: 500
  });
  try {
    var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
    if (raw) {
      var c = JSON.parse(raw);
      if (c && c.version === 1) {
        gtag('consent','update',{
          ad_storage: c.marketing ? 'granted' : 'denied',
          ad_user_data: c.marketing ? 'granted' : 'denied',
          ad_personalization: c.marketing ? 'granted' : 'denied',
          personalization_storage: c.marketing ? 'granted' : 'denied',
          analytics_storage: c.statistics ? 'granted' : 'denied'
        });
        window.__ifanConsent = c;
      }
    }
  } catch (e) {}
})();
`;
