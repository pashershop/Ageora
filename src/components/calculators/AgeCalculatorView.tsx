import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  calculateBirthdayCountdown,
  calculateLifeStatistics,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { LifeStatisticsSection } from '../LifeStatisticsSection';
import { ShareResultBar } from '../ShareResultBar';

interface AgeCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const AgeCalculatorView: React.FC<AgeCalculatorViewProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtPad, fmtDate, tr } = useLanguage();
  const c = dict.calculators.age;

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
      setError(res.error ?? dict.common.enterValidDob);
      return;
    }
    setError(null);
    setNow(new Date());
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const stats = activeDob ? calculateLifeStatistics(activeDob, now) : null;
  const countdown = activeDob
    ? calculateBirthdayCountdown(activeDob, now, lang)
    : null;

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/age-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DateInputGroup
              idPrefix="age-calc-dob"
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

      {activeDob && stats && countdown ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          {/* Primary Breakdown */}
          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {tr(c.bornPrefix, { date: fmtDate(activeDob) })}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-[10px] border border-blue-200/80 bg-gradient-to-br from-[#EAF2FA] to-white p-[10px] text-center dark:border-blue-900/50 dark:from-[#142B45]/75 dark:to-slate-900/60">
                <p className="font-mono-num text-[28px] font-extrabold leading-tight text-blue-600 dark:text-blue-400">
                  {fmt(stats.years)}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {dict.common.years}
                </p>
              </div>
              <div className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#FAFAF7] to-white p-[10px] text-center dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/50">
                <p className="font-mono-num text-[28px] font-extrabold leading-tight text-[#142B45] dark:text-white">
                  {fmt(stats.months)}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {dict.common.months}
                </p>
              </div>
              <div className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#F5F1E9]/70 to-white p-[10px] text-center dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/50">
                <p className="font-mono-num text-[28px] font-extrabold leading-tight text-[#142B45] dark:text-white">
                  {fmt(stats.days)}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {dict.common.days}
                </p>
              </div>
            </div>
          </div>

          {/* Live Birthday Countdown Strip */}
          <div className="rounded-[10px] border border-slate-200 bg-gradient-to-br from-[#EAF2FA]/65 via-white to-[#F5F1E9]/55 p-3 dark:border-slate-800 dark:from-[#142B45]/45 dark:via-slate-900/60 dark:to-slate-900/80">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[14px] font-bold text-[#142B45] dark:text-white">
                {c.nextCountdownTitle}
              </h2>
              <span className="text-[11px] text-slate-600 dark:text-slate-400">
                {tr(c.turningInline, {
                  weekday: countdown.nextBirthdayWeekday,
                  date: fmtDate(countdown.nextBirthday),
                  age: fmt(countdown.turningAge),
                })}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {[
                { label: dict.common.days, value: countdown.remainingTotalDays },
                { label: dict.common.hours, value: countdown.remainingHours },
                { label: dict.common.minShort, value: countdown.remainingMinutes },
                { label: dict.common.secShort, value: countdown.remainingSeconds },
              ].map((u) => (
                <div
                  key={u.label}
                  className="rounded-[8px] border border-slate-200/90 bg-white/95 p-[10px] text-center dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="font-mono-num text-[17px] font-bold leading-tight text-[#142B45] dark:text-white">
                    {fmtPad(u.value, 2)}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {u.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Life Statistics */}
          <LifeStatisticsSection dob={activeDob} stats={stats} onNavigate={onNavigate} />

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              years: fmt(stats.years),
              months: fmt(stats.months),
              days: fmt(stats.days),
              totalDays: fmt(stats.totalDays),
              daysLeft: fmt(countdown.remainingTotalDays),
            })}
            cardPayload={{
              title: c.cardTitle,
              subtitle: tr(dict.home.cardSubtitle, { date: fmtDate(activeDob) }),
              primaryValue: tr(dict.home.cardPrimary, {
                years: fmt(stats.years),
                months: fmt(stats.months),
                days: fmt(stats.days),
              }),
              highlights: [
                { label: c.totalMonths, value: fmt(stats.totalMonths) },
                { label: c.totalWeeks, value: fmt(stats.totalWeeks) },
                { label: c.totalDays, value: fmt(stats.totalDays) },
                { label: c.totalHours, value: fmt(stats.totalHours) },
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
