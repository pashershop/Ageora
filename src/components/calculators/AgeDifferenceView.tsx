import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateAgeDifference,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface AgeDifferenceViewProps {
  mode: 'difference' | 'who-is-older';
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const AgeDifferenceView: React.FC<AgeDifferenceViewProps> = ({
  mode,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtDate, tr } = useLanguage();
  const c = dict.calculators.ageDiff;

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [dob1Fields, setDob1Fields] = useState<DateFieldsValue>({
    day: '12',
    month: '4',
    year: '1995',
  });
  const [dob2Fields, setDob2Fields] = useState<DateFieldsValue>({
    day: '25',
    month: '9',
    year: '1998',
  });
  const [error1, setError1] = useState<string | null>(null);
  const [error2, setError2] = useState<string | null>(null);
  const [resultDates, setResultDates] = useState<{
    d1: Date;
    d2: Date;
    customName1: string;
    customName2: string;
  } | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed1 = name1.trim();
    const trimmed2 = name2.trim();
    const label1 = trimmed1 || c.fallbackPerson1;
    const label2 = trimmed2 || c.fallbackPerson2;

    const v1 = validateDateInputs(
      dob1Fields.day,
      dob1Fields.month,
      dob1Fields.year,
      {
        allowFuture: false,
        label: label1,
        lang,
        numeralMode,
      }
    );
    const v2 = validateDateInputs(
      dob2Fields.day,
      dob2Fields.month,
      dob2Fields.year,
      {
        allowFuture: false,
        label: label2,
        lang,
        numeralMode,
      }
    );

    setError1(v1.valid ? null : v1.error ?? dict.common.enterValidDate);
    setError2(v2.valid ? null : v2.error ?? dict.common.enterValidDate);

    if (!v1.valid || !v2.valid || !v1.date || !v2.date) return;

    setResultDates({
      d1: v1.date,
      d2: v2.date,
      customName1: trimmed1,
      customName2: trimmed2,
    });
  };

  const diff = resultDates
    ? calculateAgeDifference(resultDates.d1, resultDates.d2)
    : null;

  const isWhoMode = mode === 'who-is-older';
  const resolvedName1 = resultDates
    ? resultDates.customName1 || c.defaultPerson1
    : c.defaultPerson1;
  const resolvedName2 = resultDates
    ? resultDates.customName2 || c.defaultPerson2
    : c.defaultPerson2;

  const summaryHeadline =
    diff && resultDates
      ? diff.olderPerson === 0
        ? tr(c.sameDayHeadline, { n1: resolvedName1, n2: resolvedName2 })
        : tr(c.olderHeadline, {
            name: diff.olderPerson === 1 ? resolvedName1 : resolvedName2,
            days: fmt(diff.totalDays),
          })
      : '';

  return (
    <CalculatorShell
      title={isWhoMode ? c.whoTitle : c.diffTitle}
      description={isWhoMode ? c.whoDesc : c.diffDesc}
      categoryLabel={c.categoryLabel}
      currentRoute={isWhoMode ? '/who-is-older' : '/age-difference-calculator'}
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate className="space-y-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Person 1 */}
          <div className="rounded-[10px] border border-blue-200/70 bg-gradient-to-br from-[#EAF2FA]/75 to-white p-3 dark:border-slate-800 dark:from-[#142B45]/45 dark:to-slate-900/50">
            <label
              htmlFor="person1-name"
              className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
            >
              {c.person1Label}
            </label>
            <input
              id="person1-name"
              type="text"
              maxLength={32}
              value={name1}
              placeholder={c.defaultPerson1}
              onChange={(e) => setName1(e.target.value)}
              className="mb-2.5 h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <DateInputGroup
              idPrefix="diff-p1"
              label={dict.common.dobLabel}
              value={dob1Fields}
              onChange={(next) => {
                setDob1Fields(next);
                if (error1) setError1(null);
              }}
              error={error1}
              onSubmit={() => handleCalculate()}
            />
          </div>

          {/* Person 2 */}
          <div className="rounded-[10px] border border-[#E89B45]/25 bg-gradient-to-br from-[#F5F1E9]/80 to-white p-3 dark:border-slate-800 dark:from-[#142B45]/35 dark:to-slate-900/50">
            <label
              htmlFor="person2-name"
              className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
            >
              {c.person2Label}
            </label>
            <input
              id="person2-name"
              type="text"
              maxLength={32}
              value={name2}
              placeholder={c.defaultPerson2}
              onChange={(e) => setName2(e.target.value)}
              className="mb-2.5 h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <DateInputGroup
              idPrefix="diff-p2"
              label={dict.common.dobLabel}
              value={dob2Fields}
              onChange={(next) => {
                setDob2Fields(next);
                if (error2) setError2(null);
              }}
              error={error2}
              onSubmit={() => handleCalculate()}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          {isWhoMode ? c.compareBtn : c.calcBtn}
        </button>
      </form>

      {diff && resultDates && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {c.resultLabel}
            </p>
            <h2 className="mt-0.5 text-[20px] font-bold text-[#142B45] sm:text-[24px] dark:text-white">
              {summaryHeadline}
            </h2>
            <p className="mt-0.5 text-[12px] text-slate-600 dark:text-slate-400">
              {tr(c.vsLine, {
                n1: resolvedName1,
                d1: fmtDate(resultDates.d1),
                n2: resolvedName2,
                d2: fmtDate(resultDates.d2),
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: c.yearsApart, value: fmt(diff.years) },
              { label: c.monthsApart, value: fmt(diff.months) },
              { label: c.daysApart, value: fmt(diff.days) },
              { label: c.totalMonths, value: fmt(diff.totalMonths) },
              { label: c.totalWeeks, value: fmt(diff.totalWeeks) },
              { label: c.totalDays, value: fmt(diff.totalDays) },
            ].map((item, idx) => (
              <div
                key={item.label}
                className={
                  idx % 2 === 0
                    ? 'rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#EAF2FA]/65 to-white p-[10px] dark:border-slate-800 dark:from-[#101A2C] dark:to-slate-900/60'
                    : 'rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#F5F1E9]/65 to-white p-[10px] dark:border-slate-800 dark:from-[#101726] dark:to-slate-900/60'
                }
              >
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 font-mono-num text-[17px] font-bold text-[#142B45] dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <ShareResultBar
            shareTitle={isWhoMode ? c.shareWhoTitle : c.shareDiffTitle}
            shareText={tr(c.shareText, {
              headline: summaryHeadline,
              years: fmt(diff.years),
              months: fmt(diff.months),
              days: fmt(diff.days),
            })}
            cardPayload={{
              title: isWhoMode ? c.whoTitle : c.diffTitle,
              subtitle: `${resolvedName1} · ${resolvedName2}`,
              primaryValue: tr(dict.home.cardPrimary, {
                years: fmt(diff.years),
                months: fmt(diff.months),
                days: fmt(diff.days),
              }),
              highlights: [
                {
                  label: c.olderPerson,
                  value:
                    diff.olderPerson === 0
                      ? dict.common.sameDay
                      : diff.olderPerson === 1
                      ? resolvedName1
                      : resolvedName2,
                },
                { label: c.totalDaysApart, value: fmt(diff.totalDays) },
                { label: c.totalWeeksApart, value: fmt(diff.totalWeeks) },
                { label: c.totalMonthsApart, value: fmt(diff.totalMonths) },
              ],
            }}
            isDark={isDark}
          />
        </div>
      )}
    </CalculatorShell>
  );
};
