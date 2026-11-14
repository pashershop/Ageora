import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateDurationBetween,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface RelationshipDurationViewProps {
  mode: 'friendship' | 'love';
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const RelationshipDurationView: React.FC<
  RelationshipDurationViewProps
> = ({ mode, onNavigate, isDark }) => {
  const { lang, numeralMode, dict, fmt, fmtDate, tr } = useLanguage();
  const c = dict.calculators.relationship;
  const isLove = mode === 'love';

  const [labelText, setLabelText] = useState('');
  const [fields, setFields] = useState<DateFieldsValue>({
    day: '14',
    month: '2',
    year: '2021',
  });
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const startLabel = isLove ? c.loveStartLabel : c.friendStartLabel;

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = validateDateInputs(fields.day, fields.month, fields.year, {
      allowFuture: false,
      label: startLabel,
      lang,
      numeralMode,
    });
    if (!res.valid || !res.date) {
      setError(res.error ?? dict.common.enterValidDate);
      return;
    }
    setError(null);
    setStartDate(res.date);
  };

  const duration = startDate ? calculateDurationBetween(startDate) : null;
  const pageTitle = isLove ? c.loveTitle : c.friendshipTitle;

  return (
    <CalculatorShell
      title={pageTitle}
      description={isLove ? c.loveDesc : c.friendshipDesc}
      categoryLabel={c.categoryLabel}
      currentRoute={
        isLove ? '/love-duration-calculator' : '/friendship-calculator'
      }
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <label
              htmlFor="rel-label"
              className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
            >
              {isLove ? c.loveNamesLabel : c.friendNamesLabel}
            </label>
            <input
              id="rel-label"
              type="text"
              maxLength={40}
              placeholder={isLove ? c.lovePlaceholder : c.friendPlaceholder}
              value={labelText}
              onChange={(e) => setLabelText(e.target.value)}
              className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-5">
            <DateInputGroup
              idPrefix="rel-start"
              label={startLabel}
              value={fields}
              onChange={(next) => {
                setFields(next);
                if (error) setError(null);
              }}
              error={error}
              onSubmit={() => handleCalculate()}
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {c.calcBtn}
            </button>
          </div>
        </div>
      </form>

      {startDate && duration && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {labelText.trim()
                ? `${labelText.trim()} · ${tr(c.sinceDate, {
                    date: fmtDate(startDate),
                  })}`
                : tr(c.sinceDate, { date: fmtDate(startDate) })}
            </p>
            <h2 className="mt-0.5 text-[24px] font-extrabold leading-tight text-slate-900 sm:text-[28px] dark:text-white">
              {tr(dict.home.cardPrimary, {
                years: fmt(duration.years),
                months: fmt(duration.months),
                days: fmt(duration.days),
              })}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { label: c.totalDaysTogether, value: fmt(duration.totalDays) },
              { label: c.totalWeeks, value: fmt(duration.totalWeeks) },
              { label: c.totalMonths, value: fmt(duration.totalMonths) },
              { label: c.totalHours, value: fmt(duration.totalHours) },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60"
              >
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 font-mono-num text-[17px] font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-[10px] border border-slate-200 bg-white p-[10px] dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {c.nextAnniversary}
              </p>
              <p className="mt-1 text-[17px] font-bold text-slate-900 dark:text-white">
                {fmtDate(duration.nextAnniversary)}
              </p>
              <p className="mt-0.5 font-mono-num text-[11px] text-blue-600 dark:text-blue-400">
                {tr(c.inDays, { days: fmt(duration.daysUntilNextAnniversary) })}
              </p>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-white p-[10px] dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {c.nextDayMilestone}
              </p>
              <p className="mt-1 font-mono-num text-[17px] font-bold text-slate-900 dark:text-white">
                {tr(c.daysCount, { days: fmt(duration.nextMilestoneDays) })}
              </p>
              <p className="mt-0.5 font-mono-num text-[11px] text-slate-500 dark:text-slate-400">
                {tr(c.daysRemaining, {
                  days: fmt(duration.daysUntilNextMilestone),
                })}
              </p>
            </div>
          </div>

          <ShareResultBar
            shareTitle={isLove ? c.shareLoveTitle : c.shareFriendTitle}
            shareText={tr(c.shareText, {
              prefix: labelText.trim() ? `${labelText.trim()}: ` : '',
              years: fmt(duration.years),
              months: fmt(duration.months),
              days: fmt(duration.days),
              totalDays: fmt(duration.totalDays),
              date: fmtDate(startDate),
            })}
            cardPayload={{
              title: pageTitle,
              subtitle: labelText.trim()
                ? `${labelText.trim()} · ${tr(c.sinceDate, {
                    date: fmtDate(startDate),
                  })}`
                : tr(c.sinceDate, { date: fmtDate(startDate) }),
              primaryValue: tr(dict.home.cardPrimary, {
                years: fmt(duration.years),
                months: fmt(duration.months),
                days: fmt(duration.days),
              }),
              highlights: [
                {
                  label: dict.calculators.age.totalDays,
                  value: fmt(duration.totalDays),
                },
                { label: c.totalWeeks, value: fmt(duration.totalWeeks) },
                {
                  label: c.nextAnniversary,
                  value: tr(c.daysShort, {
                    days: fmt(duration.daysUntilNextAnniversary),
                  }),
                },
                {
                  label: c.nextMilestoneCard,
                  value: tr(c.daysShort, {
                    days: fmt(duration.nextMilestoneDays),
                  }),
                },
              ],
            }}
            isDark={isDark}
          />
        </div>
      )}
    </CalculatorShell>
  );
};
