import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { CALCULATORS_CATALOG } from '../data/calculatorsCatalog';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';
import { CalculatorCard } from './CalculatorCard';

interface FavoritesPageProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favoriteIds,
  onToggleFavorite,
  onNavigate,
}) => {
  const { lang, dict, fmt, tr } = useLanguage();
  const savedCalculators = CALCULATORS_CATALOG.filter((calc) =>
    favoriteIds.includes(calc.id)
  );

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
          {dict.nav.favorites}
        </span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-balance text-[24px] font-extrabold tracking-tight text-[#111827] sm:text-[26px] dark:text-white">
            {dict.favorites.title}
          </h1>
          <p className="mt-1 max-w-xl text-[12px] text-[#6B7280] sm:text-[13px] dark:text-slate-300">
            {dict.favorites.subtitle}
          </p>
        </div>

        <span className="font-mono-num text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
          {tr(dict.favorites.savedCount, { count: fmt(savedCalculators.length) })}
        </span>
      </div>

      {savedCalculators.length === 0 ? (
        <div className="mt-4 rounded-[10px] border border-dashed border-[#E5E7EB] bg-slate-50/60 p-5 text-center dark:border-slate-800 dark:bg-[#101726]/60">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-[10px] bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400">
            <Bookmark className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-[15px] font-bold text-[#111827] dark:text-white">
            {dict.favorites.emptyTitle}
          </h2>
          <p className="mx-auto mt-1 max-w-md text-[12px] text-[#6B7280] dark:text-slate-400">
            {dict.favorites.emptyDesc}
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
        <div className="mt-4 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          {savedCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </section>
  );
};
