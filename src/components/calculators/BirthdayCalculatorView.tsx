import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n';
import { WEEKDAY_NAMES_BY_LANG } from '../../i18n/helpers';
import {
  calculateBirthdayCountdown,
  createLocalDate,
  isLeapYear,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface BirthdayCalculatorViewProps {
  mode: 'countdown' | 'next-birthday';
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const BirthdayCalculatorView: React.FC<BirthdayCalculatorViewProps> = ({
  mode,
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtPad, fmtDate, tr } = useLanguage();
  const c = dict.calculators.birthday;

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

  const countdown = activeDob
    ? calculateBirthdayCountdown(activeDob, now, lang)
    : null;

  const milestoneAges = [18, 21, 25, 30, 40, 50, 60, 75, 100];
  const milestones =
    activeDob && countdown
      ? milestoneAges
          .filter((age) => age >= countdown.turningAge)
          .slice(0, 6)
          .map((age) => {
            const targetYear = activeDob.getFullYear() + age;
            const m = activeDob.getMonth() + 1;
            const d = activeDob.getDate();
            const date =
              m === 2 && d === 29 && !isLeapYear(targetYear)
                ? createLocalDate(targetYear, 3, 1)
                : createLocalDate(targetYear, m, d);
            return {
              age,
              date,
              weekday: WEEKDAY_NAMES_BY_LANG[lang][date.getDay()],
            };
          })
      : [];

  const isNextMode = mode === 'next-birthday';
  const pageTitle = isNextMode ? c.nextTitle : c.countdownTitle;

  return (
    <CalculatorShell
      title={pageTitle}
      description={isNextMode ? c.nextDesc : c.countdownDesc}
      categoryLabel={c.categoryLabel}
      currentRoute={isNextMode ? '/next-birthday' : '/birthday-countdown'}
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DateInputGroup
              idPrefix="bday-dob"
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
              {isNextMode ? c.findNextBtn : c.startBtn}
            </button>
          </div>
        </div>
      </form>

      {activeDob && countdown ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          {/* Top Summary */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {countdown.isBirthdayToday ? c.happyBirthday : c.nextBirthdayDate}
              </p>
              <h2 className="mt-0.5 text-[20px] font-bold text-slate-900 sm:text-[24px] dark:text-white">
                {countdown.nextBirthdayWeekday}, {fmtDate(countdown.nextBirthday)}
              </h2>
            </div>
            <div className="self-start rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 sm:self-auto dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {c.turningAge}
              </p>
              <p className="font-mono-num text-[17px] font-bold text-blue-600 dark:text-blue-400">
                {tr(c.turningAgeVal, { age: fmt(countdown.turningAge) })}
              </p>
            </div>
          </div>

          {countdown.isLeapling && (
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {c.leapNote}
            </p>
          )}

          {/* Live Countdown Tiles */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { label: c.daysRemaining, value: countdown.remainingTotalDays },
              { label: dict.common.hours, value: countdown.remainingHours },
              { label: dict.common.minutes, value: countdown.remainingMinutes },
              { label: dict.common.seconds, value: countdown.remainingSeconds },
            ].map((tile) => (
              <div
                key={tile.label}
                className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] text-center dark:border-slate-800 dark:bg-slate-900/60"
              >
                <p className="font-mono-num text-[24px] font-extrabold leading-tight text-slate-900 sm:text-[28px] dark:text-white">
                  {fmtPad(tile.value, 2)}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>

          {/* Calendar Breakdown + Milestones */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="rounded-[10px] border border-slate-200 bg-white p-3 lg:col-span-5 dark:border-slate-800 dark:bg-slate-900/40">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                {c.calendarBreakdown}
              </h3>
              <dl className="mt-2.5 space-y-2 text-[12px]">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">
                    {c.monthsDaysLeft}
                  </dt>
                  <dd className="font-mono-num font-semibold text-slate-900 dark:text-white">
                    {fmt(countdown.remainingMonths)}
                    {dict.common.mShort} {fmt(countdown.remainingDays)}
                    {dict.common.dShort}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">
                    {c.dayOfWeek}
                  </dt>
                  <dd className="font-semibold text-slate-900 dark:text-white">
                    {countdown.nextBirthdayWeekday}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 dark:text-slate-400">
                    {dict.common.dobLabel}
                  </dt>
                  <dd className="font-mono-num font-medium text-slate-700 dark:text-slate-300">
                    {fmtDate(activeDob)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-white p-3 lg:col-span-7 dark:border-slate-800 dark:bg-slate-900/40">
              <h3 className="text-[13px] font-semibold text-slate-900 dark:text-white">
                {c.upcomingMilestones}
              </h3>
              {milestones.length > 0 ? (
                <div className="mt-2 divide-y divide-slate-200 dark:divide-slate-800">
                  {milestones.map((m) => (
                    <div
                      key={m.age}
                      className="flex items-center justify-between py-1.5 text-[12px]"
                    >
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {tr(c.milestoneLabel, { age: fmt(m.age) })}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {m.weekday}, {fmtDate(m.date)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400">
                  {c.milestoneSurpassed}
                </p>
              )}
            </div>
          </div>

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              age: fmt(countdown.turningAge),
              weekday: countdown.nextBirthdayWeekday,
              date: fmtDate(countdown.nextBirthday),
              days: fmt(countdown.remainingTotalDays),
            })}
            cardPayload={{
              title: pageTitle,
              subtitle: tr(c.cardSubtitle, {
                age: fmt(countdown.turningAge),
                weekday: countdown.nextBirthdayWeekday,
              }),
              primaryValue: fmtDate(countdown.nextBirthday),
              highlights: [
                {
                  label: c.daysRemaining,
                  value: fmt(countdown.remainingTotalDays),
                },
                {
                  label: c.monthsDaysLabel,
                  value: `${fmt(countdown.remainingMonths)}${dict.common.mShort} ${fmt(countdown.remainingDays)}${dict.common.dShort}`,
                },
                { label: c.dayOfWeek, value: countdown.nextBirthdayWeekday },
                {
                  label: c.turningAge,
                  value: tr(c.yearsSuffix, { age: fmt(countdown.turningAge) }),
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
