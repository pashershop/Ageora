import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateRetirement,
  normalizeAsciiDigits,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface RetirementCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const RetirementCalculatorView: React.FC<
  RetirementCalculatorViewProps
> = ({ sharedDob, onSaveDob, onNavigate, isDark }) => {
  const { lang, numeralMode, dict, fmt, fmtDec, fmtRaw, fmtDate, tr } =
    useLanguage();
  const c = dict.calculators.retirement;

  const [fields, setFields] = useState<DateFieldsValue>(() =>
    sharedDob
      ? {
          day: String(sharedDob.getDate()),
          month: String(sharedDob.getMonth() + 1),
          year: String(sharedDob.getFullYear()),
        }
      : { day: '15', month: '8', year: '1998' }
  );
  const [retirementAge, setRetirementAge] = useState('65');
  const [activeDob, setActiveDob] = useState<Date | null>(sharedDob);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = validateDateInputs(fields.day, fields.month, fields.year, {
      allowFuture: false,
      label: dict.common.dobLabel,
      lang,
      numeralMode,
    });
    if (!res.valid || !res.date) {
      setError(res.error ?? dict.common.enterValidDate);
      return;
    }

    const ageNum = Number(normalizeAsciiDigits(retirementAge.trim()));
    if (!Number.isInteger(ageNum) || ageNum < 18 || ageNum > 100) {
      setError(c.targetAgeError);
      return;
    }

    setError(null);
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const validRetAge = Math.max(
    18,
    Math.min(100, Number(normalizeAsciiDigits(retirementAge)) || 65)
  );
  const result = activeDob ? calculateRetirement(activeDob, validRetAge) : null;

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/retirement-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <DateInputGroup
              idPrefix="retire-dob"
              label={dict.common.dobLabel}
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
            <label
              htmlFor="retire-age"
              className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
            >
              {c.targetAgeLabel}
            </label>
            <input
              id="retire-age"
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={retirementAge}
              onChange={(e) => {
                setRetirementAge(
                  e.target.value.replace(/[^\d০-৯]/g, '').slice(0, 3)
                );
                if (error) setError(null);
              }}
              placeholder={fmtRaw('65')}
              className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 font-mono-num text-[13px] text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {c.btn}
            </button>
          </div>
        </div>
      </form>

      {activeDob && result ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {tr(c.targetHeadline, { age: fmt(result.targetRetirementAge) })}
            </p>
            <h2 className="mt-0.5 text-[22px] font-extrabold leading-tight text-slate-900 sm:text-[26px] dark:text-white">
              {result.alreadyRetired
                ? tr(c.alreadyReached, {
                    age: fmt(result.targetRetirementAge),
                    date: fmtDate(result.retirementDate),
                  })
                : tr(c.daysUntil, {
                    days: fmt(result.totalRemainingDays),
                    date: fmtDate(result.retirementDate),
                  })}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { label: c.remainingYears, value: fmt(result.remainingYears) },
              { label: c.remainingMonths, value: fmt(result.remainingMonths) },
              { label: c.remainingDays, value: fmt(result.remainingDays) },
              {
                label: c.totalWeeksLeft,
                value: fmt(result.totalRemainingWeeks),
              },
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

          {/* Progress Bar */}
          <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-slate-900 dark:text-white">
                {tr(c.progressLabel, { age: fmt(result.targetRetirementAge) })}
              </span>
              <span className="font-mono-num font-bold text-blue-600 dark:text-blue-400">
                {fmtDec(result.progressPercent, 1)}%
              </span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${Math.min(100, Math.max(1, result.progressPercent))}%`,
                }}
              />
            </div>
          </div>

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={
              result.alreadyRetired
                ? tr(c.shareTextRetired, {
                    age: fmt(result.targetRetirementAge),
                    date: fmtDate(result.retirementDate),
                  })
                : tr(c.shareTextLeft, {
                    days: fmt(result.totalRemainingDays),
                    y: fmt(result.remainingYears),
                    m: fmt(result.remainingMonths),
                    d: fmt(result.remainingDays),
                    date: fmtDate(result.retirementDate),
                  })
            }
            cardPayload={{
              title: c.title,
              subtitle: tr(c.targetSubtitleCard, {
                age: fmt(result.targetRetirementAge),
                date: fmtDate(result.retirementDate),
              }),
              primaryValue: result.alreadyRetired
                ? c.targetReachedCard
                : tr(c.daysRemainingCard, {
                    days: fmt(result.totalRemainingDays),
                  }),
              highlights: [
                {
                  label: c.timeRemainingCard,
                  value: `${fmt(result.remainingYears)}${dict.common.yShort} ${fmt(result.remainingMonths)}${dict.common.mShort} ${fmt(result.remainingDays)}${dict.common.dShort}`,
                },
                {
                  label: c.weeksRemainingCard,
                  value: fmt(result.totalRemainingWeeks),
                },
                {
                  label: c.targetDateCard,
                  value: fmtDate(result.retirementDate),
                },
                {
                  label: c.progressCard,
                  value: `${fmtDec(result.progressPercent, 1)}%`,
                },
              ],
            }}
            isDark={isDark}
          />
        </div>
      ) : (
        <div className="mt-4 rounded-[10px] border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
          <p className="text-[12px] font-medium text-slate-600 dark:text-slate-400">
            {c.emptyPrompt}
          </p>
        </div>
      )}
    </CalculatorShell>
  );
};
