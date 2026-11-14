import React, { useEffect, useState } from 'react';
import { Bookmark, Check, Copy, Download, Share2 } from 'lucide-react';
import { useActivity } from '../context/ActivityContext';
import { CALCULATORS_CATALOG, getLocalizedCalculator } from '../data/calculatorsCatalog';
import { getCalculatorSeoGuide } from '../data/calculatorSeoContent';
import { useLanguage } from '../i18n';
import { downloadLifeReportPng } from '../utils/cardExporter';
import {
  calculateBirthdayCountdown,
  calculateLifeStatistics,
  getDayBornInfo,
  getWesternZodiac,
  validateDateInputs,
} from '../utils/dateCalculations';
import { buildLocalizedPath, PageRoute } from '../utils/seo';
import { AdSlot } from './AdSlot';
import { CalculatorSeoGuide } from './CalculatorSeoGuide';
import { DateFieldsValue, DateInputGroup } from './DateInputGroup';
import {
  LifeReportIllustration,
  LifeStatisticsIllustration,
} from './illustrations/AbstractIllustrations';

interface LifeReportPageProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const LifeReportPage: React.FC<LifeReportPageProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmt, fmtDec, fmtDate, tr } = useLanguage();
  const { isFavorite, toggleFavorite, recordUsage } = useActivity();
  const saved = isFavorite('life-report');

  useEffect(() => {
    const meta = CALCULATORS_CATALOG.find((c) => c.id === 'life-report');
    const loc = meta ? getLocalizedCalculator(meta, lang) : null;
    recordUsage({
      id: 'life-report',
      title: loc?.title ?? dict.lifeReport.title,
      route: '/life-report',
      categoryLabel: loc?.exploreCategoryLabel ?? dict.lifeReport.breadcrumb,
    });
  }, [lang, dict, recordUsage]);

  const [name, setName] = useState('');
  const [fields, setFields] = useState<DateFieldsValue>(() =>
    sharedDob
      ? {
          day: String(sharedDob.getDate()),
          month: String(sharedDob.getMonth() + 1),
          year: String(sharedDob.getFullYear()),
        }
      : { day: '15', month: '8', year: '1998' }
  );
  const [activeDob, setActiveDob] = useState<Date | null>(() => sharedDob);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGenerate = (e?: React.FormEvent) => {
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
    setActiveDob(res.date);
    onSaveDob(res.date);
  };

  const stats = activeDob ? calculateLifeStatistics(activeDob) : null;
  const countdown = activeDob ? calculateBirthdayCountdown(activeDob, new Date(), lang) : null;
  const dayBorn = activeDob ? getDayBornInfo(activeDob, new Date(), lang, numeralMode) : null;
  const zodiac = activeDob
    ? getWesternZodiac(activeDob.getDate(), activeDob.getMonth() + 1, lang, numeralMode)
    : null;

  const ageHeadline =
    stats
      ? `${fmt(stats.years)} ${dict.common.years}, ${fmt(stats.months)} ${dict.common.months}, ${fmt(stats.days)} ${dict.common.days}`
      : '';

  const formattedSummary =
    activeDob && stats && countdown && dayBorn && zodiac
      ? [
          `${name.trim() ? `${name.trim()} · ` : ''}${dict.lifeReport.title} (${dict.brand.name})`,
          `${dict.home.statYourAge}: ${ageHeadline}`,
          `${dict.common.dobLabel}: ${fmtDate(activeDob)} (${dayBorn.weekday})`,
          `${dict.lifeReport.daysLived}: ${fmt(stats.totalDays)}`,
          `${dict.lifeReport.weeksLived}: ${fmt(stats.totalWeeks)}`,
          `${dict.lifeReport.hoursLived}: ${fmt(stats.totalHours)}`,
          `${dict.lifeReport.minutesLived}: ${fmt(stats.totalMinutes)}`,
          `${dict.lifeReport.nextBirthday}: ${fmtDate(countdown.nextBirthday)} (${fmt(countdown.remainingTotalDays)}${dict.common.dShort})`,
          `${dict.lifeReport.zodiacSign}: ${zodiac.sign}`,
          `${dict.lifeReport.progressTitle}: ${fmtDec(stats.lifeProgressPercent, 1)}%`,
          '',
          `${dict.brand.name} — ${dict.brand.tagline}`,
        ].join('\n')
      : '';

  const handleDownloadPng = async () => {
    if (!activeDob || !stats || !countdown || !dayBorn || !zodiac) return;
    setDownloading(true);
    setFeedback(null);
    try {
      await downloadLifeReportPng({
        userName: name.trim(),
        ageLabel: ageHeadline,
        dateOfBirth: fmtDate(activeDob),
        dayOfBirth: dayBorn.weekday,
        daysLived: fmt(stats.totalDays),
        weeksLived: fmt(stats.totalWeeks),
        hoursLived: fmt(stats.totalHours),
        minutesLived: fmt(stats.totalMinutes),
        nextBirthday: fmtDate(countdown.nextBirthday),
        zodiacSign: `${zodiac.symbol} ${zodiac.sign}`,
        lifeProgressPercent: stats.lifeProgressPercent,
        lifeProgressPercentText: `${fmtDec(stats.lifeProgressPercent, 1)}%`,
        darkTheme: isDark,
        lang,
      });
      setFeedback(dict.lifeReport.downloadedFeedback);
    } catch {
      setFeedback(dict.lifeReport.downloadErrorFeedback);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyReport = async () => {
    if (!formattedSummary) return;
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setFeedback(dict.lifeReport.copyErrorFeedback);
    }
  };

  const handleShare = async () => {
    if (!formattedSummary) return;
    const shareUrl = window.location.href;
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: dict.lifeReport.shareTitle,
          text: formattedSummary,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    await handleCopyReport();
    setFeedback(dict.lifeReport.copiedFeedback);
  };

  const introText = getCalculatorSeoGuide('/life-report', lang)?.introduction;

  return (
    <div>
      <div className="bg-ageora-subpage-header border-b border-[#E5E7EB]/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#6B7280] dark:text-slate-400"
          >
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="transition-colors hover:text-[#2563EB] dark:hover:text-blue-400"
            >
              {dict.nav.home}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-[#142B45] dark:text-slate-200">
              {dict.lifeReport.breadcrumb}
            </span>
          </nav>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-balance text-[23px] font-extrabold leading-tight tracking-tight text-[#142B45] sm:text-[27px] dark:text-white">
                {dict.lifeReport.title}
              </h1>
              <p className="mt-1 max-w-2xl text-[12px] text-[#4B5563] sm:text-[13px] dark:text-slate-300">
                {dict.lifeReport.subtitle}
              </p>
              {introText && (
                <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-[#6B7280] dark:text-slate-400">
                  {introText}
                </p>
              )}

              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => toggleFavorite('life-report')}
                  aria-pressed={saved}
                  className={`inline-flex h-[34px] shrink-0 items-center justify-center gap-1.5 rounded-[8px] border px-[14px] text-[12px] font-semibold transition-all duration-200 whitespace-nowrap ${
                    saved
                      ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-400'
                      : 'border-[#E5E7EB] bg-white/90 text-[#142B45] hover:bg-white dark:border-slate-800 dark:bg-[#101726] dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className="h-[15px] w-[15px]" fill={saved ? 'currentColor' : 'none'} />
                  <span>{saved ? dict.common.saved : dict.common.saveFavorite}</span>
                </button>
              </div>
            </div>

            <div className="hidden sm:flex sm:w-40 lg:w-48 shrink-0 items-center justify-end">
              <LifeReportIllustration className="w-full" />
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
        <AdSlot placement="aboveCalculator" className="mb-4" />

        {/* Compact Input Form */}
        <form
          onSubmit={handleGenerate}
          noValidate
          className="rounded-[12px] border border-slate-200 bg-white p-3.5 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-[#101726]"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
            <div className="md:col-span-4">
              <label
                htmlFor="life-report-name"
                className="mb-1 block text-[12px] font-medium text-slate-500 dark:text-slate-400"
              >
                {dict.lifeReport.nameLabel}
              </label>
              <input
                id="life-report-name"
                type="text"
                maxLength={40}
                placeholder={dict.lifeReport.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white px-2.5 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="md:col-span-5">
              <DateInputGroup
                idPrefix="report-dob"
                value={fields}
                onChange={(next) => {
                  setFields(next);
                  if (error) setError(null);
                }}
                error={error}
                onSubmit={() => handleGenerate()}
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="flex h-[38px] w-full items-center justify-center rounded-[8px] bg-gradient-to-r from-[#142B45] to-[#2563EB] px-[14px] text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                {dict.lifeReport.generateBtn}
              </button>
            </div>
          </div>
        </form>

        {/* Premium Gradient Visual Life Report Card */}
        {activeDob && stats && countdown && dayBorn && zodiac ? (
          <div className="animate-ageora-fade mt-4">
            <div className="bg-ageora-report-card mx-auto max-w-2xl rounded-[14px] border border-[#142B45]/15 p-4 shadow-sm sm:p-6 dark:border-slate-700/80">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-slate-700/70">
                <div className="flex items-center gap-2">
                  <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-gradient-to-br from-[#142B45] to-[#2563EB] text-white">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 7.5V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[14px] font-bold tracking-tight text-[#142B45] dark:text-white">
                    {dict.brand.name}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {dict.lifeReport.cardHeader}
                </span>
              </div>

            <div className="mt-3">
              <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                {name.trim()
                  ? tr(dict.lifeReport.overviewNamed, { name: name.trim() })
                  : dict.lifeReport.overviewDefault}
              </p>
              <h2 className="mt-1 text-[24px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[28px] dark:text-white">
                {ageHeadline}
              </h2>
              <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400">
                {dict.lifeReport.bornOnLine}{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {dayBorn.weekday}
                </span>
                , {fmtDate(activeDob)} · {zodiac.symbol} {zodiac.sign}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: dict.lifeReport.daysLived, value: fmt(stats.totalDays) },
                { label: dict.lifeReport.weeksLived, value: fmt(stats.totalWeeks) },
                { label: dict.lifeReport.hoursLived, value: fmt(stats.totalHours) },
                { label: dict.lifeReport.minutesLived, value: fmt(stats.totalMinutes) },
                {
                  label: dict.lifeReport.nextBirthday,
                  value: `${fmtDate(countdown.nextBirthday)} (${fmt(countdown.remainingTotalDays)}${dict.common.dShort})`,
                },
                {
                  label: dict.lifeReport.zodiacSign,
                  value: `${zodiac.symbol} ${zodiac.sign}`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60"
                >
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-mono-num text-[15px] font-bold text-slate-900 sm:text-[17px] dark:text-white truncate">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-[10px] border border-slate-200/80 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="w-[88px] shrink-0">
                  <LifeStatisticsIllustration progressPercent={stats.lifeProgressPercent} />
                </div>
                <div className="w-full min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-[#142B45] dark:text-slate-200">
                      {dict.lifeReport.progressTitle}
                    </span>
                    <span className="font-mono-num text-[15px] font-bold text-[#2563EB] dark:text-blue-400">
                      {fmtDec(stats.lifeProgressPercent, 1)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#E89B45]"
                      style={{ width: `${Math.min(100, Math.max(1, stats.lifeProgressPercent))}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    {dict.lifeReport.progressNote}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {dict.brand.tagline}
              </span>
              <span>{dict.brand.domain}</span>
            </div>
          </div>

          <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPng}
              disabled={downloading}
              className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60 whitespace-nowrap"
            >
              <Download className="h-[15px] w-[15px]" />
              <span>
                {downloading ? dict.lifeReport.preparingPng : dict.lifeReport.downloadPng}
              </span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <Share2 className="h-[15px] w-[15px]" />
              <span>{dict.common.share}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              {copied ? (
                <Check className="h-[15px] w-[15px] text-emerald-600" />
              ) : (
                <Copy className="h-[15px] w-[15px]" />
              )}
              <span>
                {copied ? dict.lifeReport.reportCopied : dict.lifeReport.copyReport}
              </span>
            </button>
          </div>

          <div className="mx-auto mt-2 flex max-w-2xl items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(formattedSummary)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4"
            >
              {dict.lifeReport.shareWhatsApp}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== 'undefined'
                  ? window.location.href
                  : 'https://ageora.app/life-report'
              )}&quote=${encodeURIComponent(formattedSummary)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-4"
            >
              {dict.lifeReport.shareFacebook}
            </a>
          </div>

          {feedback && (
            <p className="mt-2 text-center text-[11px] font-medium text-blue-600 dark:text-blue-400">
              {feedback}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 rounded-[10px] border border-dashed border-slate-300 bg-slate-50/50 p-5 text-center dark:border-slate-700 dark:bg-slate-900/30">
          <p className="text-[14px] font-semibold text-slate-900 dark:text-white">
            {dict.lifeReport.emptyTitle}
          </p>
          <p className="mt-1 text-[12px] text-slate-600 dark:text-slate-400">
            {dict.lifeReport.emptyDesc}
          </p>
        </div>
      )}

      <AdSlot placement="belowCalculatorResult" className="mt-4" />

      <CalculatorSeoGuide route="/life-report" onNavigate={onNavigate} />
      </section>
    </div>
  );
};
