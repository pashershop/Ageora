import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  getDayBornInfo,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface DayBornCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const DayBornCalculatorView: React.FC<DayBornCalculatorViewProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtDate, tr } = useLanguage();
  const c = dict.calculators.dayBorn;

  const [fields, setFields] = useState<DateFieldsValue>(() =>
    sharedDob
      ? {
          day: String(sharedDob.getDate()),
          month: String(sharedDob.getMonth() + 1),
          year: String(sharedDob.getFullYear()),
        }
      : { day: '15', month: '8', year: '1998' }
  );
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
    setError(null);
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const info = activeDob
    ? getDayBornInfo(activeDob, new Date(), lang, numeralMode)
    : null;

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/day-born-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DateInputGroup
              idPrefix="dayborn-dob"
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
          <div className="md:col-span-4">
            <button
              type="submit"
              className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {c.btn}
            </button>
          </div>
        </div>
      </form>

      {activeDob && info ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {fmtDate(activeDob)}
            </p>
            <h2 className="mt-0.5 text-[24px] font-extrabold leading-tight text-slate-900 sm:text-[28px] dark:text-white">
              {c.bornPrefix}{' '}
              <span className="text-blue-600 dark:text-blue-400">
                {info.weekday}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { label: c.dayOfYear, value: `#${fmt(info.dayOfYear)}` },
              {
                label: c.weekOfYear,
                value: tr(c.weekVal, { week: fmt(info.weekOfYear) }),
              },
              {
                label: c.birthYearType,
                value: info.isLeapYear ? c.leapYear : c.commonYear,
              },
              {
                label: c.daysSinceBirth,
                value: fmt(info.daysSinceBirth),
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

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              weekday: info.weekday,
              date: info.formattedDate,
              dayOfYear: fmt(info.dayOfYear),
            })}
            cardPayload={{
              title: c.title,
              subtitle: info.formattedDate,
              primaryValue: tr(c.cardPrimary, { weekday: info.weekday }),
              highlights: [
                { label: c.dayOfYear, value: `#${fmt(info.dayOfYear)}` },
                {
                  label: c.weekOfYear,
                  value: tr(c.weekVal, { week: fmt(info.weekOfYear) }),
                },
                {
                  label: c.birthYearCard,
                  value: info.isLeapYear ? c.leapYear : c.commonYear,
                },
                { label: c.daysLivedCard, value: fmt(info.daysSinceBirth) },
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
