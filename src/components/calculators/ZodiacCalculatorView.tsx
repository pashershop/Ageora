import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import {
  getWesternZodiac,
  validateDateInputs,
} from '../../utils/dateCalculations';
import { PageRoute } from '../../utils/seo';
import { CalculatorShell } from '../CalculatorShell';
import { DateFieldsValue, DateInputGroup } from '../DateInputGroup';
import { ShareResultBar } from '../ShareResultBar';

interface ZodiacCalculatorViewProps {
  sharedDob: Date | null;
  onSaveDob: (dob: Date) => void;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
}

export const ZodiacCalculatorView: React.FC<ZodiacCalculatorViewProps> = ({
  sharedDob,
  onSaveDob,
  onNavigate,
  isDark,
}) => {
  const { lang, numeralMode, dict, fmtDate, tr } = useLanguage();
  const c = dict.calculators.zodiac;

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

  const zodiac = activeDob
    ? getWesternZodiac(
        activeDob.getDate(),
        activeDob.getMonth() + 1,
        lang,
        numeralMode
      )
    : null;

  return (
    <CalculatorShell
      title={c.title}
      description={c.description}
      categoryLabel={c.categoryLabel}
      currentRoute="/zodiac-calculator"
      onNavigate={onNavigate}
    >
      <form onSubmit={handleCalculate} noValidate>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <DateInputGroup
              idPrefix="zodiac-dob"
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

      {activeDob && zodiac ? (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-slate-200 bg-blue-50 text-2xl text-blue-600 dark:border-slate-800 dark:bg-blue-950/50 dark:text-blue-400">
              {zodiac.symbol}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {tr(c.bornLine, {
                  range: zodiac.dateRange,
                  date: fmtDate(activeDob),
                })}
              </p>
              <h2 className="mt-0.5 text-[26px] font-extrabold leading-tight text-slate-900 sm:text-[28px] dark:text-white">
                {zodiac.sign}
              </h2>
            </div>
          </div>

          <p className="max-w-2xl text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300">
            {zodiac.description}
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {c.element}
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-slate-900 sm:text-[17px] dark:text-white">
                {zodiac.element}
              </p>
            </div>
            <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {c.rulingPlanet}
              </p>
              <p className="mt-0.5 truncate text-[15px] font-bold text-slate-900 sm:text-[17px] dark:text-white">
                {zodiac.rulingPlanet}
              </p>
            </div>
            <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-[10px] dark:border-slate-800 dark:bg-slate-900/60">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {c.modality}
              </p>
              <p className="mt-0.5 text-[15px] font-bold text-slate-900 sm:text-[17px] dark:text-white">
                {zodiac.modality}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {c.traitsTitle}
            </p>
            <p className="mt-1 text-[13px] font-medium text-slate-800 dark:text-slate-200">
              {zodiac.traits.join('  ·  ')}
            </p>
          </div>

          <ShareResultBar
            shareTitle={c.shareTitle}
            shareText={tr(c.shareText, {
              sign: zodiac.sign,
              element: zodiac.element,
              planet: zodiac.rulingPlanet,
            })}
            cardPayload={{
              title: c.title,
              subtitle: tr(dict.home.cardSubtitle, { date: fmtDate(activeDob) }),
              primaryValue: `${zodiac.symbol} ${zodiac.sign}`,
              highlights: [
                { label: c.dateRange, value: zodiac.dateRange },
                { label: c.element, value: zodiac.element },
                { label: c.rulingPlanet, value: zodiac.rulingPlanet },
                { label: c.modality, value: zodiac.modality },
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
