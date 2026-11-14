import React from 'react';
import { ArrowRight, History, Trash2 } from 'lucide-react';
import { CALCULATORS_CATALOG, getLocalizedCalculator } from '../data/calculatorsCatalog';
import { formatRelativeTime, HistoryEntry } from '../hooks/useUserActivity';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface HistoryPageProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onClearHistory,
  onNavigate,
}) => {
  const { lang, numeralMode, dict, tr } = useLanguage();

  return (
    <section className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-2 flex items-center gap-1.5 text-[11px] text-[#6B7280] dark:text-slate-400"
      >
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="hover:text-[#2563EB] dark:hover:text-blue-400"
        >
          {dict.nav.home}
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-[#111827] dark:text-slate-200">
          {dict.nav.history}
        </span>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-balance text-[24px] font-extrabold tracking-tight text-[#111827] sm:text-[26px] dark:text-white">
            {dict.history.title}
          </h1>
          <p className="mt-1 max-w-xl text-[12px] text-[#6B7280] sm:text-[13px] dark:text-slate-300">
            {dict.history.subtitle}
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearHistory}
            className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-white px-[14px] text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:border-slate-800 dark:bg-[#101726] dark:text-red-400 dark:hover:bg-red-950/30 whitespace-nowrap self-start sm:self-auto"
          >
            <Trash2 className="h-[15px] w-[15px]" />
            <span>{dict.history.clearBtn}</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="mt-4 rounded-[10px] border border-dashed border-[#E5E7EB] bg-slate-50/60 p-5 text-center dark:border-slate-800 dark:bg-[#101726]/60">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[10px] bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400">
            <History className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-[15px] font-bold text-[#111827] dark:text-white">
            {dict.history.emptyTitle}
          </h2>
          <p className="mx-auto mt-1 max-w-md text-[12px] text-[#6B7280] dark:text-slate-400">
            {dict.history.emptyDesc}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/explore')}
            className="mt-4 inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-[#2563EB] px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <span>{dict.favorites.exploreBtn}</span>
            <ArrowRight className="h-[15px] w-[15px]" />
          </button>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-[#E5E7EB] rounded-[10px] border border-[#E5E7EB] bg-white shadow-2xs dark:divide-slate-800 dark:border-slate-800 dark:bg-[#101726]">
          {history.map((item) => {
            const matched = CALCULATORS_CATALOG.find(
              (c) => c.id === item.id || c.route === item.route
            );
            const localized = matched ? getLocalizedCalculator(matched, lang) : null;
            const displayTitle = localized?.title ?? item.title;
            const displayCategory =
              localized?.exploreCategoryLabel ?? item.categoryLabel;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3"
              >
                <div className="min-w-0">
                  <h2 className="text-[14px] font-bold text-[#111827] dark:text-white truncate">
                    {displayTitle}
                  </h2>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-[#6B7280] dark:text-slate-400">
                    <span>{displayCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num">
                      {tr(dict.history.lastUsed, {
                        time: formatRelativeTime(item.lastUsedAt, lang, numeralMode),
                      })}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(item.route)}
                  className="inline-flex h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] bg-[#2563EB] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
                >
                  <span>{dict.common.openAgain}</span>
                  <ArrowRight className="h-[14px] w-[14px]" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
