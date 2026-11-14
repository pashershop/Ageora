import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG, AdPlacementKey } from '../config/adsConfig';
import { useLanguage } from '../i18n';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  placement: AdPlacementKey;
  className?: string;
}

let adScriptRequested = false;

function ensureAdSenseScript(publisherId: string): void {
  if (adScriptRequested || typeof document === 'undefined' || !publisherId) return;
  const existing = document.querySelector('script[data-ageora-adsense="true"]');
  if (existing) {
    adScriptRequested = true;
    return;
  }
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.dataset.ageoraAdsense = 'true';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
    publisherId
  )}`;
  script.onerror = () => {
    // Gracefully ignore if blocked by an ad blocker
  };
  document.head.appendChild(script);
  adScriptRequested = true;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const { lang } = useLanguage();
  const insRef = useRef<HTMLModElement | null>(null);
  const slotConfig = ADS_CONFIG.slots[placement];
  const isReady =
    ADS_CONFIG.enabled &&
    Boolean(ADS_CONFIG.publisherId.trim()) &&
    Boolean(slotConfig.slotId.trim());

  useEffect(() => {
    if (!isReady) return;
    ensureAdSenseScript(ADS_CONFIG.publisherId);
    try {
      if (insRef.current && !insRef.current.dataset.adsbygoogleStatus) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ad blockers or offline mode should never break the application
    }
  }, [isReady, placement]);

  // Do not render fake ads or empty visual clutter before AdSense is approved & configured
  if (!isReady) {
    return (
      <div
        data-ad-placement={placement}
        data-ad-status="standby"
        aria-hidden="true"
        className="hidden"
      />
    );
  }

  const adLabel = lang === 'bn' ? 'বিজ্ঞাপন' : 'Advertisement';

  return (
    <aside
      aria-label={adLabel}
      data-ad-placement={placement}
      className={`my-6 sm:my-8 flex w-full flex-col items-center overflow-hidden ${className}`}
    >
      <span className="mb-1.5 text-[11px] font-medium tracking-wide text-slate-400 dark:text-slate-500">
        {adLabel}
      </span>
      <div
        className={`flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-xl border border-slate-200/70 bg-slate-50/50 p-2 dark:border-slate-800/70 dark:bg-slate-900/30 ${slotConfig.minHeightClass}`}
      >
        <ins
          ref={insRef}
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={ADS_CONFIG.publisherId}
          data-ad-slot={slotConfig.slotId}
          data-ad-format={slotConfig.format}
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
