import React, { useState } from 'react';
import {
  CALCULATORS_CATALOG,
  EXPLORE_CATEGORIES,
  ExploreCategoryId,
  getLocalizedCategory,
} from '../data/calculatorsCatalog';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';
import { CalculatorCard } from './CalculatorCard';

interface ExplorePageProps {
  onNavigate: (route: PageRoute) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onNavigate,
  isFavorite,
  onToggleFavorite,
}) => {
  const { lang, dict, fmt, fmtPad } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | ExploreCategoryId>('all');

  const visibleCategories =
    activeFilter === 'all'
      ? EXPLORE_CATEGORIES
      : EXPLORE_CATEGORIES.filter((c) => c.id === activeFilter);

  return (
    <section className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
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
          {dict.nav.explore}
        </span>
      </nav>

      <div>
        <h1 className="text-balance text-[24px] font-extrabold tracking-tight text-[#111827] sm:text-[26px] dark:text-white">
          {dict.explore.title}
        </h1>
        <p className="mt-1 max-w-2xl text-[12px] text-[#6B7280] sm:text-[13px] dark:text-slate-300">
          {dict.explore.subtitle}
        </p>
      </div>

      {/* Compact Category Filter Tabs */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`h-[34px] shrink-0 rounded-[8px] px-3 text-[12px] font-semibold transition-colors whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-[#2563EB] text-white'
              : 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50 dark:border-slate-800 dark:bg-[#101726] dark:text-slate-200'
          }`}
        >
          {dict.explore.allCategories}
        </button>
        {EXPLORE_CATEGORIES.map((cat) => {
          const loc = getLocalizedCategory(cat, lang);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`h-[34px] shrink-0 rounded-[8px] px-3 text-[12px] font-semibold transition-colors whitespace-nowrap ${
                activeFilter === cat.id
                  ? 'bg-[#2563EB] text-white'
                  : 'border border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50 dark:border-slate-800 dark:bg-[#101726] dark:text-slate-200'
              }`}
            >
              {loc.label}
            </button>
          );
        })}
      </div>

      {/* Compact Category Sections */}
      <div className="mt-4 space-y-5">
        {visibleCategories.map((cat, idx) => {
          const loc = getLocalizedCategory(cat, lang);
          const items = CALCULATORS_CATALOG.filter(
            (item) => item.exploreCategory === cat.id
          );
          return (
            <div key={cat.id}>
              <div className="mb-2.5 flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-[16px] font-bold text-[#111827] sm:text-[17px] dark:text-white">
                    {fmtPad(idx + 1)}. {loc.label}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400">
                    {loc.description}
                  </p>
                </div>
                <span className="font-mono-num shrink-0 text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                  {fmt(items.length)}{' '}
                  {items.length === 1
                    ? dict.common.toolLowerSingular
                    : dict.common.toolLowerPlural}
                </span>
              </div>

              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-[10px]">
                {items.map((calc) => (
                  <CalculatorCard
                    key={calc.id}
                    calculator={calc}
                    isFavorite={isFavorite(calc.id)}
                    onToggleFavorite={onToggleFavorite}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
