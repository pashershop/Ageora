import React from 'react';
import { useLanguage } from '../i18n';
import { LifeStatisticsResult } from '../utils/dateCalculations';
import { PageRoute } from '../utils/seo';
import { LifeStatisticsIllustration } from './illustrations/AbstractIllustrations';

interface LifeStatisticsSectionProps {
  dob: Date;
  stats: LifeStatisticsResult;
  onNavigate?: (route: PageRoute) => void;
}

export const LifeStatisticsSection: React.FC<LifeStatisticsSectionProps> = ({
  dob,
  stats,
  onNavigate,
}) => {
  const { dict, fmt, fmtDec, fmtDate, tr } = useLanguage();

  const exactStats = [
    { label: dict.lifeStats.totalDaysLived, value: fmt(stats.totalDays) },
    { label: dict.lifeStats.totalWeeksLived, value: fmt(stats.totalWeeks) },
    { label: dict.lifeStats.totalMonthsLived, value: fmt(stats.totalMonths) },
    { label: dict.lifeStats.totalHoursLived, value: fmt(stats.totalHours) },
    { label: dict.lifeStats.totalMinutesLived, value: fmt(stats.totalMinutes) },
    { label: dict.lifeStats.totalSecondsLived, value: fmt(stats.totalSeconds), live: true },
  ];

  const approximateStats = [
    {
      label: dict.lifeStats.approxHeartbeats,
      value: fmt(stats.approxHeartbeats),
      note: dict.lifeStats.heartbeatsNote,
    },
    {
      label: dict.lifeStats.approxBreaths,
      value: fmt(stats.approxBreaths),
      note: dict.lifeStats.breathsNote,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight text-[#142B45] sm:text-[18px] dark:text-white">
            {dict.lifeStats.title}
          </h2>
          <p className="mt-0.5 text-[12px] text-slate-600 dark:text-slate-400">
            {tr(dict.lifeStats.subtitle, { date: fmtDate(dob) })}
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('/life-report')}
            className="inline-flex h-[34px] items-center justify-center rounded-[8px] bg-gradient-to-r from-[#142B45] to-[#2563EB] px-[14px] text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            {dict.lifeStats.generateCardBtn}
          </button>
        )}
      </div>

      {/* Exact Lived Totals */}
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
        {exactStats.map((item, idx) => (
          <div
            key={item.label}
            className={`rounded-[10px] border border-slate-200 p-[10px] transition-colors dark:border-slate-800 ${
              idx % 2 === 0
                ? 'bg-gradient-to-br from-[#EAF2FA]/65 to-white dark:from-[#142B45]/40 dark:to-slate-900/60'
                : 'bg-gradient-to-br from-[#F5F1E9]/65 to-white dark:from-slate-900/80 dark:to-slate-900/50'
            }`}
          >
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
              {item.label}
            </p>
            <p className="mt-1 font-mono-num text-[17px] font-bold tracking-tight text-[#142B45] dark:text-white truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Approximate Biological Estimates */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {approximateStats.map((item) => (
          <div
            key={item.label}
            className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-white to-[#FAFAF7] p-[10px] dark:border-slate-800 dark:from-slate-900/60 dark:to-slate-900/40"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {dict.common.approximate}
              </span>
            </div>
            <p className="mt-1 font-mono-num text-[17px] font-bold tracking-tight text-[#142B45] dark:text-white">
              {item.value}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              {item.note}
            </p>
          </div>
        ))}
      </div>

      {/* Illustrative 80-Year Life Progress Ring & Bar */}
      <div className="rounded-[12px] border border-slate-200 bg-gradient-to-r from-[#EAF2FA]/75 via-[#FAFAF7] to-[#F5F1E9]/80 p-3.5 dark:border-slate-800 dark:from-[#142B45]/50 dark:via-[#101726] dark:to-[#132033]">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
          <div className="w-[104px] shrink-0">
            <LifeStatisticsIllustration progressPercent={stats.lifeProgressPercent} />
          </div>

          <div className="w-full min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[14px] font-semibold text-[#142B45] dark:text-white">
                  {dict.lifeStats.lifeProgressTitle}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {dict.lifeStats.lifeProgressDesc}
                </p>
              </div>
              <span className="font-mono-num text-[17px] font-bold text-[#2563EB] dark:text-blue-400">
                {fmtDec(stats.lifeProgressPercent, 2)}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={Math.round(stats.lifeProgressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={dict.lifeStats.lifeProgressTitle}
              className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#E89B45] transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(1, stats.lifeProgressPercent))}%` }}
              />
            </div>

            <div className="mt-1.5 flex items-center justify-between font-mono-num text-[10px] text-slate-500 dark:text-slate-400">
              <span>{dict.lifeStats.scale0}</span>
              <span>{dict.lifeStats.scale20}</span>
              <span>{dict.lifeStats.scale40}</span>
              <span>{dict.lifeStats.scale60}</span>
              <span>{dict.lifeStats.scale80}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
