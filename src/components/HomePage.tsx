import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { getBlogArticles } from '../data/blogArticles';
import {
  CALCULATORS_CATALOG,
  EXPLORE_CATEGORIES,
  getLocalizedCategory,
} from '../data/calculatorsCatalog';
import { useLanguage } from '../i18n';
import {
  calculateBirthdayCountdown,
  calculateExactAge,
  calculateLifeStatistics,
  validateDateInputs,
} from '../utils/dateCalculations';
import { buildLocalizedPath, PageRoute } from '../utils/seo';
import { CalculatorCard } from './CalculatorCard';
import { DateFieldsValue, DateInputGroup } from './DateInputGroup';
import {
  HeroTimeIllustration,
  LifeReportIllustration,
} from './illustrations/AbstractIllustrations';
import { LifeStatisticsSection } from './LifeStatisticsSection';
import { ShareResultBar } from './ShareResultBar';

interface HomePageProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtPad, fmtDate, tr } = useLanguage();
  const { isFavorite, toggleFavorite, recordUsage } = useActivity();
  const [fields, setFields] = useState<DateFieldsValue>(() =>
    sharedDob
      ? {
          day: String(sharedDob.getDate()),
          month: String(sharedDob.getMonth() + 1),
          year: String(sharedDob.getFullYear()),
        }
      : { day: '', month: '', year: '' }
  );
  const [activeDob, setActiveDob] = useState<Date | null>(sharedDob);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());
  const calculatorSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeDob) return;
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeDob]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validation = validateDateInputs(fields.day, fields.month, fields.year, {
      allowFuture: false,
      label: dict.common.dobLabel,
      lang,
      numeralMode,
    });

    if (!validation.valid || !validation.date) {
      setError(validation.error ?? dict.common.enterValidDob);
      return;
    }

    setError(null);
    setNow(new Date());
    setActiveDob(validation.date);
    onSaveDob(validation.date);
    recordUsage({
      id: 'age-calculator',
      title: 'Age Calculator',
      route: '/age-calculator',
      categoryLabel: 'Age & Birthday',
    });
  };

  const scrollToCalculator = () => {
    calculatorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const dayInput = document.getElementById('hero-dob-day');
    if (dayInput) dayInput.focus({ preventScroll: true });
  };

  const age = activeDob ? calculateExactAge(activeDob, now) : null;
  const countdown = activeDob ? calculateBirthdayCountdown(activeDob, now, lang) : null;
  const lifeStats = activeDob ? calculateLifeStatistics(activeDob, now) : null;

  const popularCalculators = CALCULATORS_CATALOG.filter((c) => c.popular).slice(0, 6);
  const latestBlogs = getBlogArticles(lang).slice(0, 3);

  return (
    <div>
      {/* Hero Section with Premium Subtle Gradient & Code-Generated Time Illustration */}
      <section className="bg-ageora-hero animate-ageora-gradient border-b border-[#E5E7EB]/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6 lg:px-6 lg:py-7">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-6">
            <div className="animate-ageora-fade md:col-span-7 lg:col-span-7">
              <p className="text-[11px] font-semibold tracking-wide text-[#2563EB] dark:text-blue-400">
                {dict.home.eyebrow}
              </p>
              <h1 className="mt-1.5 text-balance text-[25px] font-extrabold leading-tight tracking-tight text-[#142B45] sm:text-[31px] dark:text-white">
                {dict.home.heroTitle}
              </h1>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#4B5563] sm:text-[14px] dark:text-slate-300">
                {dict.home.heroSubtitle}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={scrollToCalculator}
                  className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-[8px] bg-gradient-to-r from-[#142B45] to-[#2563EB] px-[16px] text-[13px] font-semibold text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm whitespace-nowrap"
                >
                  <span>{dict.home.calculateMyAge}</span>
                  <ArrowRight className="h-[15px] w-[15px]" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/explore')}
                  className="inline-flex h-[38px] items-center justify-center rounded-[8px] border border-[#142B45]/15 bg-white/90 px-[14px] text-[12px] font-semibold text-[#142B45] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
                >
                  {dict.home.exploreAllTools}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center md:col-span-5 md:justify-end">
              <HeroTimeIllustration className="w-full max-w-[230px] sm:max-w-[270px] md:max-w-[320px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Age Calculator & Quick Statistics Dashboard */}
      <section
        ref={calculatorSectionRef}
        className="bg-ageora-calc-band border-b border-[#E5E7EB]/80 dark:border-slate-800/80"
      >
        <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6 lg:px-6 space-y-3">
          <form
            onSubmit={handleCalculate}
            noValidate
            className="rounded-[12px] border border-[#E5E7EB] bg-white/95 p-3.5 shadow-xs backdrop-blur-xs sm:p-5 dark:border-slate-800 dark:bg-[#101726]/95"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-[15px] font-bold text-[#142B45] sm:text-[17px] dark:text-white">
                  {dict.home.mainCalcTitle}
                </h2>
                <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
                  {dict.home.mainCalcSubtitle}
                </p>
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-[#EAF2FA] to-blue-100/70 text-[#2563EB] dark:from-[#142B45] dark:to-blue-950/70 dark:text-blue-400">
                <Calendar className="h-4 w-4" />
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <DateInputGroup
                  idPrefix="hero-dob"
                  value={fields}
                  onChange={(next) => {
                    setFields(next);
                    if (error) setError(null);
                  }}
                  error={error}
                  onSubmit={() => handleCalculate()}
                />
              </div>
              <div className="lg:col-span-4">
                <button
                  type="submit"
                  className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-[#2563EB] px-[14px] text-[13px] font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {dict.home.calculateMyAge}
                </button>
              </div>
            </div>
          </form>

          {/* Compact Quick Statistics Strip */}
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#EAF2FA]/60 p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/35 dark:border-slate-800 dark:from-[#101726] dark:to-[#142B45]/40">
              <p className="text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                {dict.home.statYourAge}
              </p>
              <p className="mt-1 font-mono-num text-[20px] font-bold leading-tight text-[#142B45] dark:text-white truncate">
                {age
                  ? `${fmt(age.years)}${dict.common.yShort} ${fmt(age.months)}${dict.common.mShort} ${fmt(age.days)}${dict.common.dShort}`
                  : '—'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400 truncate">
                {age
                  ? `${fmt(age.years)} ${dict.common.yearsOldLower}`
                  : dict.home.statEnterDob}
              </p>
            </div>

            <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#F5F1E9]/70 p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/35 dark:border-slate-800 dark:from-[#101726] dark:to-[#162134]">
              <p className="text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                {dict.home.statDaysLived}
              </p>
              <p className="mt-1 font-mono-num text-[20px] font-bold leading-tight text-[#142B45] dark:text-white truncate">
                {age ? fmt(age.totalDays) : '—'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400 truncate">
                {age
                  ? `${fmt(age.totalWeeks)} ${dict.home.statWeeksSuffix}`
                  : dict.home.statExactCalendarDays}
              </p>
            </div>

            <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#EAF2FA]/60 p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/35 dark:border-slate-800 dark:from-[#101726] dark:to-[#142B45]/40">
              <p className="text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                {dict.home.statNextBirthday}
              </p>
              <p className="mt-1 font-mono-num text-[20px] font-bold leading-tight text-[#142B45] dark:text-white truncate">
                {countdown
                  ? countdown.isBirthdayToday
                    ? dict.common.today
                    : `${fmt(countdown.remainingTotalDays)}${dict.common.dShort}`
                  : '—'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400 truncate">
                {countdown
                  ? tr(dict.home.statTurning, {
                      age: fmt(countdown.turningAge),
                      weekday: countdown.nextBirthdayWeekday,
                    })
                  : dict.home.statUpcomingCountdown}
              </p>
            </div>

            <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-br from-white to-[#F5F1E9]/70 p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/35 dark:border-slate-800 dark:from-[#101726] dark:to-[#162134]">
              <p className="text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                {dict.home.statSecondsLived}
              </p>
              <p className="mt-1 font-mono-num text-[20px] font-bold leading-tight text-[#2563EB] dark:text-blue-400 truncate">
                {age ? fmt(age.totalSeconds) : '—'}
              </p>
              <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400 truncate">
                {age ? dict.home.statLiveSecondCounter : dict.home.statUpdatesLive}
              </p>
            </div>
          </div>

          {/* Compact Dashboard Result Panel */}
          {activeDob && age && countdown && lifeStats && (
            <div className="animate-ageora-fade space-y-3 pt-1">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
                <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-3.5 shadow-2xs sm:p-4 lg:col-span-7 dark:border-slate-800 dark:bg-[#101726]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[15px] font-bold text-[#142B45] dark:text-white">
                      {dict.home.exactAgeBreakdown}
                    </h3>
                    <span className="text-[11px] text-[#6B7280] dark:text-slate-400">
                      {dict.home.dobPrefix}: {fmtDate(activeDob)}
                    </span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-b from-[#EAF2FA]/80 to-white p-[10px] text-center dark:border-slate-800 dark:from-[#142B45]/50 dark:to-slate-900/60">
                      <p className="font-mono-num text-[28px] font-extrabold leading-tight text-[#2563EB] dark:text-blue-400">
                        {fmt(age.years)}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                        {dict.common.years}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-b from-[#FAFAF7] to-white p-[10px] text-center dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/60">
                      <p className="font-mono-num text-[28px] font-extrabold leading-tight text-[#142B45] dark:text-white">
                        {fmt(age.months)}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                        {dict.common.months}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[#E5E7EB] bg-gradient-to-b from-[#F5F1E9]/60 to-white p-[10px] text-center dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-900/60">
                      <p className="font-mono-num text-[28px] font-extrabold leading-tight text-[#142B45] dark:text-white">
                        {fmt(age.days)}
                      </p>
                      <p className="mt-0.5 text-[11px] font-medium text-[#6B7280] dark:text-slate-400">
                        {dict.common.days}
                      </p>
                    </div>
                  </div>

                  <ShareResultBar
                    shareTitle={dict.home.shareTitle}
                    shareText={tr(dict.home.shareText, {
                      years: fmt(age.years),
                      months: fmt(age.months),
                      days: fmt(age.days),
                      totalDays: fmt(age.totalDays),
                    })}
                    cardPayload={{
                      title: dict.home.cardTitle,
                      subtitle: tr(dict.home.cardSubtitle, {
                        date: fmtDate(activeDob),
                      }),
                      primaryValue: tr(dict.home.cardPrimary, {
                        years: fmt(age.years),
                        months: fmt(age.months),
                        days: fmt(age.days),
                      }),
                      highlights: [
                        {
                          label: dict.lifeStats.totalDaysLived,
                          value: fmt(age.totalDays),
                        },
                        {
                          label: dict.lifeStats.totalWeeksLived,
                          value: fmt(age.totalWeeks),
                        },
                        {
                          label: dict.lifeStats.totalHoursLived,
                          value: fmt(age.totalHours),
                        },
                        {
                          label: dict.home.statNextBirthday,
                          value: tr(dict.home.cardNextBirthdayDays, {
                            days: fmt(countdown.remainingTotalDays),
                          }),
                        },
                      ],
                    }}
                    isDark={isDark}
                  />
                </div>

                <div className="rounded-[12px] border border-[#E5E7EB] bg-gradient-to-br from-white via-[#FAFAF7] to-[#EAF2FA]/50 p-3.5 shadow-2xs sm:p-4 lg:col-span-5 dark:border-slate-800 dark:from-[#101726] dark:to-[#142B45]/40">
                  <h3 className="text-[15px] font-bold text-[#142B45] dark:text-white">
                    {dict.home.birthdayCountdown}
                  </h3>
                  <p className="mt-0.5 text-[12px] text-[#6B7280] dark:text-slate-400">
                    {countdown.isBirthdayToday
                      ? dict.home.happyBirthdayToday
                      : tr(dict.home.nextBirthdayLine, {
                          weekday: countdown.nextBirthdayWeekday,
                          date: fmtDate(countdown.nextBirthday),
                          age: fmt(countdown.turningAge),
                        })}
                  </p>

                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[
                      { label: dict.common.days, value: countdown.remainingTotalDays },
                      { label: dict.common.hrsShort, value: countdown.remainingHours },
                      { label: dict.common.minShort, value: countdown.remainingMinutes },
                      { label: dict.common.secShort, value: countdown.remainingSeconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-[10px] border border-[#E5E7EB] bg-white p-[10px] text-center dark:border-slate-800 dark:bg-slate-900/70"
                      >
                        <p className="font-mono-num text-[17px] font-bold leading-tight text-[#142B45] dark:text-white">
                          {fmtPad(unit.value)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#6B7280] dark:text-slate-400">
                          {unit.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#E5E7EB] pt-2.5 text-[11px] text-[#6B7280] dark:border-slate-800 dark:text-slate-400">
                    <span>
                      {tr(dict.home.monthsDaysLeft, {
                        months: fmt(countdown.remainingMonths),
                        days: fmt(countdown.remainingDays),
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('/birthday-countdown')}
                      className="font-semibold text-[#2563EB] hover:text-blue-700 dark:text-blue-400"
                    >
                      {dict.home.fullCountdown}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-3.5 shadow-2xs sm:p-4 dark:border-slate-800 dark:bg-[#101726]">
                <LifeStatisticsSection
                  dob={activeDob}
                  stats={lifeStats}
                  onNavigate={onNavigate}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Calculators with Soft Blue Radial Background */}
      <section className="bg-ageora-soft-radial">
        <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-[#142B45] sm:text-[20px] dark:text-white">
                {dict.home.popularTitle}
              </h2>
              <p className="mt-0.5 text-[12px] text-[#6B7280] dark:text-slate-400">
                {dict.home.popularSubtitle}
              </p>
            </div>
            <a
              href={buildLocalizedPath('/explore', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/explore');
              }}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] hover:text-blue-700 dark:text-blue-400 whitespace-nowrap"
            >
              <span>{dict.home.exploreAllTools}</span>
              <ArrowRight className="h-[14px] w-[14px]" />
            </a>
          </div>

          <div className="mt-3.5 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3">
            {popularCalculators.map((calc) => (
              <CalculatorCard
                key={calc.id}
                calculator={calc}
                isFavorite={isFavorite(calc.id)}
                onToggleFavorite={toggleFavorite}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Explore Categories with Warm Cream-to-Soft-Blue Gradient */}
      <section className="bg-ageora-cream-band border-y border-[#E5E7EB]/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-[#142B45] sm:text-[20px] dark:text-white">
                {dict.home.exploreCategoryTitle}
              </h2>
              <p className="mt-0.5 text-[12px] text-[#6B7280] dark:text-slate-400">
                {dict.home.exploreCategorySubtitle}
              </p>
            </div>
            <a
              href={buildLocalizedPath('/explore', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/explore');
              }}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] dark:text-blue-400 whitespace-nowrap"
            >
              <span>{dict.home.openExplorePage}</span>
              <ArrowRight className="h-[14px] w-[14px]" />
            </a>
          </div>

          <div className="mt-3.5 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-3">
            {EXPLORE_CATEGORIES.map((cat) => {
              const loc = getLocalizedCategory(cat, lang);
              const count = CALCULATORS_CATALOG.filter(
                (item) => item.exploreCategory === cat.id
              ).length;
              return (
                <a
                  key={cat.id}
                  href={buildLocalizedPath('/explore', lang)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/explore');
                  }}
                  className="group flex flex-col justify-between rounded-[12px] border border-[#E5E7EB] bg-white/95 p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-sm dark:border-slate-800 dark:bg-[#101726]/95"
                >
                  <div>
                    <span className="font-mono-num text-[11px] font-semibold text-[#2563EB] dark:text-blue-400">
                      {fmt(count)}{' '}
                      {count === 1 ? dict.common.toolSingular : dict.common.toolPlural}
                    </span>
                    <h3 className="mt-1 text-[14px] font-bold text-[#142B45] dark:text-white">
                      {loc.label}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#6B7280] dark:text-slate-400">
                      {loc.description}
                    </p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] dark:text-blue-400">
                    <span>{dict.common.browse}</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Deep Navy Life Report Promotion Card */}
      <section className="bg-[#FAFAF7] dark:bg-[#090D16]">
        <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
          <div className="bg-ageora-navy-card grid grid-cols-1 items-center gap-4 rounded-[14px] border border-[#142B45]/20 p-4 text-white shadow-sm sm:p-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E89B45]">
                <FileText className="h-3.5 w-3.5" />
                <span>{dict.home.lifeReportBadge}</span>
              </div>
              <h2 className="mt-1.5 text-balance text-[18px] font-bold text-white sm:text-[22px]">
                {dict.home.lifeReportTitle}
              </h2>
              <p className="mt-1 max-w-xl text-[12px] leading-relaxed text-slate-200 sm:text-[13px]">
                {dict.home.lifeReportDesc}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/life-report')}
                className="mt-4 inline-flex h-[38px] items-center justify-center gap-1.5 rounded-[8px] bg-[#E89B45] px-[16px] text-[13px] font-bold text-[#142B45] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f2a957] whitespace-nowrap"
              >
                <span>{dict.home.openLifeReport}</span>
                <ArrowRight className="h-[15px] w-[15px]" />
              </button>
            </div>

            <div className="hidden md:flex md:col-span-4 md:justify-end">
              <LifeReportIllustration className="w-full max-w-[200px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Articles with Subtle Cream-to-Off-White Gradient */}
      <section className="border-t border-[#E5E7EB]/80 bg-gradient-to-b from-[#F5F1E9]/55 via-[#FAFAF7] to-[#EAF2FA]/40 dark:border-slate-800/80 dark:from-[#0C1322] dark:to-[#090D16]">
        <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 lg:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-[18px] font-bold tracking-tight text-[#142B45] sm:text-[20px] dark:text-white">
                {dict.home.latestBlogTitle}
              </h2>
              <p className="mt-0.5 text-[12px] text-[#6B7280] dark:text-slate-400">
                {dict.home.latestBlogSubtitle}
              </p>
            </div>
            <a
              href={buildLocalizedPath('/blog', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#2563EB] dark:text-blue-400 whitespace-nowrap"
            >
              <span>{dict.home.allArticlesCount}</span>
              <ArrowRight className="h-[14px] w-[14px]" />
            </a>
          </div>

          <div className="mt-3.5 grid grid-cols-1 gap-3 md:grid-cols-3">
            {latestBlogs.map((article) => (
              <a
                key={article.slug}
                href={buildLocalizedPath(article.route, lang)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(article.route);
                }}
                className="group flex flex-col justify-between rounded-[12px] border border-[#E5E7EB] bg-white/95 p-3.5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-600/40 hover:shadow-sm dark:border-slate-800 dark:bg-[#101726]"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280] dark:text-slate-400">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="mt-1.5 text-[14px] font-bold leading-snug text-[#142B45] group-hover:text-[#2563EB] dark:text-white dark:group-hover:text-blue-400">
                    {article.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#6B7280] dark:text-slate-400">
                    {article.summary}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] dark:text-blue-400">
                  <span>{dict.common.readGuide}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Compact FAQ */}
      <section className="bg-[#FAFAF7] dark:bg-[#090D16]">
        <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 lg:px-6">
          <h2 className="text-[18px] font-bold tracking-tight text-[#142B45] sm:text-[20px] dark:text-white">
            {dict.home.faqTitle}
          </h2>
          <dl className="mt-3 divide-y divide-[#E5E7EB] rounded-[12px] border border-[#E5E7EB] bg-white shadow-2xs dark:divide-slate-800 dark:border-slate-800 dark:bg-[#101726]">
            {dict.home.faqs.map((item) => (
              <div key={item.question} className="p-3.5 sm:p-4">
                <dt className="text-[13px] font-bold text-[#142B45] sm:text-[14px] dark:text-white">
                  {item.question}
                </dt>
                <dd className="mt-1 text-[12px] leading-relaxed text-[#6B7280] dark:text-slate-300">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
};
