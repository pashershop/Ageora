import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateMillionSeconds,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface MillionSecondsCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const MillionSecondsCalculatorView: React.FC<
  MillionSecondsCalculatorViewProps
> = ({ sharedDob, onSaveDob, onNavigate, isDark }) => {
  const { lang, numeralMode, dict, fmt, fmtDec, fmtDate, tr } = useLanguage();
  const c = dict.calculators.millionSeconds;

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
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!activeDob) return;
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, [activeDob]);

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
    setNow(new Date());
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const result = activeDob ? calculateMillionSeconds(activeDob, now) : null;

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/million-seconds-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DateInputGroup
              idPrefix="msec-dob"
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

      {activeDob && result ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {tr(c.bornLive, { date: fmtDate(activeDob) })}
            </p>
            <h2 className="mt-0.5 font-mono-num text-[24px] font-extrabold leading-tight text-blue-600 sm:text-[28px] dark:text-blue-400">
              {tr(c.millionSecondsUnit, {
                val: fmtDec(result.millionsLived, 4),
              })}
            </h2>
            <p className="mt-1 font-mono-num text-[12px] text-slate-600 dark:text-slate-400">
              {tr(c.exactTotal, { seconds: fmt(result.totalSeconds) })}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {tr(c.nextMilestoneTitle, {
                  m: fmt(result.nextMilestoneMillions),
                })}
              </p>
              <p className="mt-1 text-[17px] font-bold text-slate-900 dark:text-white">
                {fmtDate(result.nextMilestoneDate)}
              </p>
              <p className="mt-0.5 font-mono-num text-[11px] text-slate-500 dark:text-slate-400">
                {tr(c.daysSecondsLeft, {
                  days: fmt(result.daysRemaining),
                  seconds: fmt(result.secondsRemaining),
                })}
              </p>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {c.billionTitle}
              </p>
              <p className="mt-1 text-[17px] font-bold text-slate-900 dark:text-white">
                {fmtDate(result.billionSecondsDate)}
              </p>
              <p className="mt-0.5 text-[11px] text-blue-600 dark:text-blue-400">
                {result.passedBillion ? c.passedBillion : c.upcomingBillion}
              </p>
            </div>
          </div>

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              millions: fmtDec(result.millionsLived, 2),
              totalSeconds: fmt(result.totalSeconds),
              nextM: fmt(result.nextMilestoneMillions),
              date: fmtDate(result.nextMilestoneDate),
            })}
            cardPayload={{
              title: c.title,
              subtitle: tr(dict.home.cardSubtitle, { date: fmtDate(activeDob) }),
              primaryValue: tr(c.millionSecondsUnit, {
                val: fmtDec(result.millionsLived, 2),
              }),
              highlights: [
                {
                  label: c.totalSecondsCard,
                  value: fmt(result.totalSeconds),
                },
                {
                  label: c.nextMilestoneCard,
                  value: tr(c.nextMilestoneVal, {
                    m: fmt(result.nextMilestoneMillions),
                  }),
                },
                {
                  label: c.milestoneDateCard,
                  value: fmtDate(result.nextMilestoneDate),
                },
                {
                  label: c.billionCard,
                  value: fmtDate(result.billionSecondsDate),
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
