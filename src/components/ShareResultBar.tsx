import React, { useState } from 'react';
import { Check, Copy, Download, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n';
import { CalculatorCardPayload, downloadCalculatorCardPng } from '../utils/cardExporter';

interface ShareResultBarProps {
  shareTitle: string;
  shareText: string;
  cardPayload: CalculatorCardPayload;
  isDark: boolean;
}

export const ShareResultBar: React.FC<ShareResultBarProps> = ({
  shareTitle,
  shareText,
  cardPayload,
  isDark,
}) => {
  const { lang, dict } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const pageUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://ageora.app';
  const fullMessage = `${shareText}\n\n${dict.common.shareFooterText}\n${pageUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setShareNote(dict.common.clipboardError);
      setTimeout(() => setShareNote(null), 2500);
    }
  };

  const handleDownloadCard = async () => {
    setDownloading(true);
    try {
      await downloadCalculatorCardPng({
        ...cardPayload,
        darkTheme: isDark,
        lang,
      });
    } catch {
      setShareNote(dict.common.pngError);
      setTimeout(() => setShareNote(null), 2500);
    } finally {
      setDownloading(false);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: pageUrl,
        });
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await handleCopy();
    setShareNote(dict.common.copiedShareNote);
    setTimeout(() => setShareNote(null), 2400);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    pageUrl
  )}&quote=${encodeURIComponent(shareText)}`;

  return (
    <div className="mt-4 border-t border-[#E5E7EB] pt-3 dark:border-slate-800">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
          {dict.common.shareOrSaveResult}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[12px] font-medium text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            {dict.common.whatsapp}
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[12px] font-medium text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            {dict.common.facebook}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[12px] font-medium text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            {copied ? (
              <Check className="h-[15px] w-[15px] text-emerald-600" />
            ) : (
              <Copy className="h-[15px] w-[15px]" />
            )}
            <span>{copied ? dict.common.copied : dict.common.copy}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCard}
            disabled={downloading}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[12px] font-medium text-[#111827] transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap shrink-0"
          >
            <Download className="h-[15px] w-[15px]" />
            <span>{downloading ? dict.common.saving : dict.common.pngCard}</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] bg-[#2563EB] px-3.5 text-[12px] font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0"
          >
            <Share2 className="h-[15px] w-[15px]" />
            <span>{dict.common.share}</span>
          </button>
        </div>
      </div>
      {shareNote && (
        <p className="mt-1.5 text-[11px] text-[#2563EB] dark:text-blue-400">
          {shareNote}
        </p>
      )}
    </div>
  );
};
