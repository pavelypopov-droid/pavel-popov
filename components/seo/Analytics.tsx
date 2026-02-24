"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export default function Analytics() {
  return (
    <>
      {/* ── Google Analytics 4 ── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </Script>
        </>
      )}

      {/* ── Яндекс.Метрика ── */}
      {YM_ID && (
        <Script id="ym-init" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YM_ID}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: false
            });
          `}
        </Script>
      )}
    </>
  );
}

// ── Утилиты для трекинга событий (используются из client-компонентов) ──

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

const ymId = Number(YM_ID);

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  // Яндекс.Метрика
  if (typeof window !== "undefined" && window.ym && ymId) {
    window.ym(ymId, "reachGoal", eventName, params);
  }
}

// Готовые функции для ключевых событий сайта
export const track = {
  ctaClick: (location: string) =>
    trackEvent("cta_click", { location }),

  formSubmit: (success: boolean) =>
    trackEvent("form_submit", { success: success ? 1 : 0 }),

  cvDownload: () =>
    trackEvent("cv_download"),

  calendlyOpen: () =>
    trackEvent("calendly_open"),

  serviceView: (serviceId: string) =>
    trackEvent("service_view", { service_id: serviceId }),

  blogRead: (slug: string) =>
    trackEvent("blog_read", { article: slug }),
};
