import React, { useEffect } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { CALCULATORS_CATALOG, getLocalizedCalculator } from '../data/calculatorsCatalog';
import { getCalculatorSeoGuide } from '../data/calculatorSeoContent';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, KnownRoute, PageRoute } from '../utils/seo';
import { AdSlot } from './AdSlot';
import { CalculatorCard } from './CalculatorCard';
import { CalculatorSeoGuide } from './CalculatorSeoGuide';

interface CalculatorShellProps {
  title: string;
  description: string;
  categoryLabel: string;
  currentRoute: KnownRoute;
  onNavigate: (route: PageRoute) => void;
  children: React.ReactNode;
}

export const CalculatorShell: React.FC<CalculatorShellProps> = ({
  title,
  description,
  categoryLabel,
  currentRoute,
  onNavigate,
  children,
}) => {
  const { lang, dict } = useLanguage();
  const { isFavorite, toggleFavorite, recordUsage } = useActivity();
  const matchedCatalog = CALCULATORS_CATALOG.find((c) => c.route === currentRoute);
  const catalogId = matchedCatalog?.id ?? currentRoute.replace(/^\//, '');
  const saved = isFavorite(catalogId);

  useEffect(() => {
    const localized = matchedCatalog ? getLocalizedCalculator(matchedCatalog, lang) : null;
    recordUsage({
      id: catalogId,
      title: localized?.title ?? title,
      route: currentRoute,
      categoryLabel: localized?.exploreCategoryLabel ?? categoryLabel,
    });
  }, [catalogId, currentRoute, matchedCatalog, title, categoryLabel, lang, recordUsage]);

  const related = CALCULATORS_CATALOG.filter((c) => c.route !== currentRoute).slice(0, 3);
  const seoGuide = getCalculatorSeoGuide(currentRoute, lang);

  return (
    <section className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <div className="mb-4">
        {/* Compact Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#6B7280] dark:text-slate-400"
        >
          <a
            href={buildLocalizedPath('/', lang)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="transition-colors hover:text-[#2563EB] dark:hover:text-blue-400"
          >
            {dict.nav.home}
          </a>
          <span aria-hidden="true">/</span>
          <a
            href={buildLocalizedPath('/explore', lang)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/explore');
            }}
            className="transition-colors hover:text-[#2563EB] dark:hover:text-blue-400"
          >
            {dict.nav.explore}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-[#111827] dark:text-slate-200">{categoryLabel}</span>
        </nav>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-balance text-[24px] font-extrabold leading-tight tracking-tight text-[#111827] sm:text-[26px] dark:text-white">
              {title}
            </h1>
            <p className="mt-1 max-w-2xl text-[12px] text-[#6B7280] sm:text-[13px] dark:text-slate-300">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(catalogId)}
            aria-pressed={saved}
            className={`inline-flex h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] border px-[14px] text-[12px] font-semibold transition-colors whitespace-nowrap self-start ${
              saved
                ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-400'
                : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-slate-50 dark:border-slate-800 dark:bg-[#101726] dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="h-[15px] w-[15px]" fill={saved ? 'currentColor' : 'none'} />
            <span>{saved ? dict.common.saved : dict.common.saveFavorite}</span>
          </button>
        </div>

        {seoGuide?.introduction && (
          <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-[#6B7280] dark:text-slate-400">
            {seoGuide.introduction}
          </p>
        )}
      </div>

      {/* Placement 2: Above Calculator Tool */}
      <AdSlot placement="aboveCalculator" className="mb-4" />

      <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-3 shadow-2xs sm:p-4 dark:border-slate-800 dark:bg-[#101726]">
        {children}
      </div>

      {/* Placement 3: Below Calculator Result */}
      <AdSlot placement="belowCalculatorResult" className="mt-4" />

      {/* How It Works, Formula, Practical Examples, FAQ & Internal Links */}
      <CalculatorSeoGuide route={currentRoute} onNavigate={onNavigate} />

      <div className="mt-5 border-t border-[#E5E7EB] pt-5 dark:border-slate-800">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-[17px] font-bold text-[#111827] dark:text-white">
            {dict.shell.relatedCalculators}
          </h2>
          <a
            href={buildLocalizedPath('/life-report', lang)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/life-report');
            }}
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 whitespace-nowrap"
          >
            <span>{dict.shell.openLifeReport}</span>
            <ArrowRight className="h-[14px] w-[14px]" />
          </a>
        </div>

        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-[10px]">
          {related.map((item) => (
            <CalculatorCard
              key={item.id}
              calculator={item}
              isFavorite={isFavorite(item.id)}
              onToggleFavorite={toggleFavorite}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
