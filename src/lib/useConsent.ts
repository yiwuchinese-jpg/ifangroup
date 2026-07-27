'use client';

import { useSyncExternalStore } from 'react';
import { CONSENT_EVENT, CONSENT_STORAGE_KEY, readConsent, type ConsentState } from './consent';

// 单独成文件是因为 src/app/layout.tsx 这个 server component 要 import consent.ts；
// React hook 留在那边会把整个模块拖进 client 边界并直接编译报错。

// getSnapshot 必须返回稳定引用，否则 useSyncExternalStore 会无限重渲染。
// 用原始字符串做缓存键：字符串没变就复用上次解析出的对象。
let cachedRaw: string | null = null;
let cachedState: ConsentState | null = null;

function getSnapshot(): ConsentState | null {
    let raw: string | null = null;
    try {
        raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
        raw = null;
    }
    if (raw !== cachedRaw) {
        cachedRaw = raw;
        cachedState = readConsent();
    }
    return cachedState;
}

function subscribe(onChange: () => void) {
    window.addEventListener(CONSENT_EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
        window.removeEventListener(CONSENT_EVENT, onChange);
        window.removeEventListener('storage', onChange);
    };
}

/**
 * 返回当前同意状态：
 *   undefined — 服务端渲染/水合阶段，尚不可知（此时不要渲染弹窗，否则回访用户会看到闪烁）
 *   null      — 已可知，但用户还没做过选择
 *   ConsentState — 用户的选择
 */
export function useConsent(): ConsentState | null | undefined {
    return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}
