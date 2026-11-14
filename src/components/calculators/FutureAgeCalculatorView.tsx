import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateFutureAges,
  normalizeAsciiDigits,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface FutureAgeCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const FutureAgeCalculatorView: React.FC<FutureAgeCalculatorViewProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtRaw, fmtDate, tr } = useLanguage();
  const c = dict.calculators.futureAge;

  const [fields, setFields] = useState<DateFieldsValue>(() =>
    sharedDob
      ? {
          day: String(sharedDob.getDate()),
          month: String(sharedDob.getMonth() + 1),
          year: String(sharedDob.getFullYear()),
        }
      : { day: '15', month: '8', year: '1998' }
  );
  const [customYear, setCustomYear] = useState('2060');
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

    const asciiCustomYear = normalizeAsciiDigits(customYear.trim());
    const parsedCustom = Number(asciiCustomYear);
    if (
      asciiCustomYear &&
      (!Number.isInteger(parsedCustom) ||
        parsedCustom < res.date.getFullYear() ||
        parsedCustom > 2200)
    ) {
      setError(
        tr(c.customYearError, { minYear: fmtRaw(res.date.getFullYear()) })
      );
      return;
    }

    setError(null);
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const parsedCustomNum = Number(normalizeAsciiDigits(customYear.trim()));
  const baseYears = [2027, 2030, 2040, 2050];
  const yearsList =
    activeDob &&
    Number.isInteger(parsedCustomNum) &&
    parsedCustomNum >= activeDob.getFullYear() &&
    parsedCustomNum <= 2200 &&
    !baseYears.includes(parsedCustomNum)
      ? [...baseYears, parsedCustomNum].sort((a, b) => a - b)
      : baseYears;

  const entries = activeDob
    ? calculateFutureAges(activeDob, yearsList, lang)
    : [];

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/future-age-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <DateInputGroup
              idPrefix="future-dob"
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
              htmlFor="future-custom-year"
              className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
            >
              {c.customYearLabel}
            </label>
            <input
              id="future-custom-year"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={customYear}
              onChange={(e) => {
                setCustomYear(e.target.value.replace(/[^\d০-৯]/g, '').slice(0, 4));
                if (error) setError(null);
              }}
              placeholder={fmtRaw('2060')}
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

      {activeDob && entries.length > 0 ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {tr(c.projectedPrefix, { date: fmtDate(activeDob) })}
            </p>
            <h2 className="mt-0.5 text-[18px] font-bold text-slate-900 sm:text-[19px] dark:text-white">
              {c.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {entries.map((entry) => (
              <div
                key={entry.year}
                className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono-num text-[12px] font-semibold text-blue-600 dark:text-blue-400">
                    {tr(c.yearLabel, { year: fmtRaw(entry.year) })}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {entry.birthdayWeekday}
                  </span>
                </div>
                <p className="mt-1 font-mono-num text-[24px] font-extrabold leading-tight text-slate-900 dark:text-white">
                  {fmt(entry.ageOnBirthday)} {dict.common.yearsOld}
                </p>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                  {tr(c.onBirthday, { date: fmtDate(entry.birthdayDate) })}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {tr(c.onJan1, {
                    year: fmtRaw(entry.year),
                    y: fmt(entry.ageOnJan1.years),
                    m: fmt(entry.ageOnJan1.months),
                    d: fmt(entry.ageOnJan1.days),
                  })}
                </p>
              </div>
            ))}
          </div>

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              date: fmtDate(activeDob),
              summary: entries
                .slice(0, 4)
                .map(
                  (e) =>
                    `${fmtRaw(e.year)}: ${tr(c.yearsSuffix, {
                      age: fmt(e.ageOnBirthday),
                    })}`
                )
                .join(', '),
            })}
            cardPayload={{
              title: c.title,
              subtitle: tr(dict.home.cardSubtitle, { date: fmtDate(activeDob) }),
              primaryValue: entries
                .slice(0, 4)
                .map(
                  (e) =>
                    `${fmtRaw(e.year)}: ${fmt(e.ageOnBirthday)}${dict.common.yShort}`
                )
                .join(' · '),
              highlights: entries.slice(0, 4).map((e) => ({
                label: tr(c.ageInYear, { year: fmtRaw(e.year) }),
                value: tr(c.yearsSuffix, { age: fmt(e.ageOnBirthday) }),
              })),
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
