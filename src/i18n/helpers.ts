import { Language, NumeralMode } from './types';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'] as const;

export const MONTH_NAMES_BY_LANG: Record<Language, readonly string[]> = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  bn: [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ],
};

export const MONTH_SHORT_BY_LANG: Record<Language, readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  bn: [
    'জানু',
    'ফেব্রু',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টে',
    'অক্টো',
    'নভে',
    'ডিসে',
  ],
};

export const WEEKDAY_NAMES_BY_LANG: Record<Language, readonly string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  bn: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
};

export function toBanglaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export function applyNumeralMode(
  input: string | number,
  lang: Language,
  numeralMode: NumeralMode
): string {
  const str = String(input);
  if (lang === 'bn' && numeralMode === 'bn') {
    return toBanglaDigits(str);
  }
  return str;
}

export function formatNum(
  value: number | string,
  lang: Language,
  numeralMode: NumeralMode
): string {
  const formatted =
    typeof value === 'number' ? value.toLocaleString('en-US') : String(value);
  return applyNumeralMode(formatted, lang, numeralMode);
}

export function formatDecimal(
  value: number,
  decimals: number,
  lang: Language,
  numeralMode: NumeralMode
): string {
  const fixed = value.toFixed(decimals);
  return applyNumeralMode(fixed, lang, numeralMode);
}

export function formatPaddedNum(
  value: number,
  length: number,
  lang: Language,
  numeralMode: NumeralMode
): string {
  const padded = String(value).padStart(length, '0');
  return applyNumeralMode(padded, lang, numeralMode);
}

export function formatReadableDateLocalized(
  date: Date,
  lang: Language,
  numeralMode: NumeralMode
): string {
  const monthName = MONTH_NAMES_BY_LANG[lang][date.getMonth()];
  const day = applyNumeralMode(date.getDate(), lang, numeralMode);
  const year = applyNumeralMode(date.getFullYear(), lang, numeralMode);
  if (lang === 'bn') {
    return `${day} ${monthName}, ${year}`;
  }
  return `${monthName} ${day}, ${year}`;
}

export function getLocalizedWeekday(date: Date, lang: Language): string {
  return WEEKDAY_NAMES_BY_LANG[lang][date.getDay()];
}

export function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}
