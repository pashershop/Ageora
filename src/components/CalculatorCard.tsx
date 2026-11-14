import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { CalculatorMeta, getLocalizedCalculator } from '../data/calculatorsCatalog';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';
import { CalculatorIcon } from './CalculatorIcon';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  calculator,
  isFavorite,
  onToggleFavorite,
  onNavigate,
}) => {
  const { lang, dict } = useLanguage();
  const loc = getLocalizedCalculator(calculator, lang);
  const href = buildLocalizedPath(calculator.route, lang);

  return (
    <div className="group relative flex flex-col justify-between rounded-[10px] border border-[#E5E7EB] bg-white p-3 shadow-2xs transition-colors duration-150 hover:border-blue-600/40 dark:border-slate-800 dark:bg-[#101726] dark:hover:border-blue-500/50">
      <div className="flex items-center justify-between gap-2">
        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(calculator.route);
          }}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400"
          aria-label={`${dict.common.open} ${loc.title}`}
        >
          <CalculatorIcon name={calculator.iconName} className="h-[20px] w-[20px]" />
        </a>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(calculator.id);
          }}
          aria-label={
            isFavorite
              ? `${dict.common.saved}: ${loc.title}`
              : `${dict.common.saveFavorite}: ${loc.title}`
          }
          aria-pressed={isFavorite}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors ${
            isFavorite
              ? 'text-[#2563EB] dark:text-blue-400'
              : 'text-[#6B7280] hover:bg-slate-100 hover:text-[#111827] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
          }`}
        >
          <Bookmark
            className="h-[15px] w-[15px]"
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(calculator.route);
        }}
        className="mt-2 flex flex-1 flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-[6px]"
      >
        <div>
          <h3 className="text-[14px] font-bold leading-snug text-[#111827] dark:text-white">
            {loc.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#6B7280] dark:text-slate-400">
            {loc.shortDescription}
          </p>
        </div>

        <div className="mt-2.5 flex items-center justify-between pt-1">
          <span className="truncate text-[10px] font-medium text-[#6B7280] dark:text-slate-400">
            {loc.exploreCategoryLabel}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#2563EB] dark:text-blue-400">
            <span>{dict.common.open}</span>
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </div>
  );
};
