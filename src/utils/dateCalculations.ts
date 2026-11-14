import {
  applyNumeralMode,
  formatReadableDateLocalized,
  MONTH_NAMES_BY_LANG,
  WEEKDAY_NAMES_BY_LANG,
} from '../i18n/helpers';
import { Language, NumeralMode } from '../i18n/types';

export interface DateValidationResult {
  valid: boolean;
  date?: Date;
  error?: string;
}

export interface ExactAgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface BirthdayCountdownResult {
  nextBirthday: Date;
  turningAge: number;
  isBirthdayToday: boolean;
  isLeapling: boolean;
  remainingTotalDays: number;
  remainingMonths: number;
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
  nextBirthdayWeekday: string;
}

export interface LifeStatisticsResult extends ExactAgeResult {
  approxHeartbeats: number;
  approxBreaths: number;
  lifeProgressPercent: number;
  referenceLifespanYears: number;
  approxSleepYears: number;
}

export interface AgeDifferenceResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  olderPerson: 1 | 2 | 0;
}

export interface DurationResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextAnniversary: Date;
  daysUntilNextAnniversary: number;
  nextMilestoneDays: number;
  daysUntilNextMilestone: number;
}

export interface ZodiacInfo {
  sign: string;
  symbol: string;
  dateRange: string;
  element: string;
  rulingPlanet: string;
  modality: string;
  traits: string[];
  description: string;
}

export interface DayBornInfo {
  weekday: string;
  formattedDate: string;
  dayOfYear: number;
  weekOfYear: number;
  isLeapYear: boolean;
  season: string;
  daysSinceBirth: number;
}

export interface FutureAgeEntry {
  year: number;
  ageOnBirthday: number;
  birthdayDate: Date;
  birthdayWeekday: string;
  ageOnJan1: { years: number; months: number; days: number };
}

export interface RetirementResult {
  targetRetirementAge: number;
  retirementDate: Date;
  alreadyRetired: boolean;
  remainingYears: number;
  remainingMonths: number;
  remainingDays: number;
  totalRemainingDays: number;
  totalRemainingWeeks: number;
  progressPercent: number;
}

export interface MillionSecondsResult {
  totalSeconds: number;
  millionsLived: number;
  nextMilestoneMillions: number;
  nextMilestoneSeconds: number;
  nextMilestoneDate: Date;
  secondsRemaining: number;
  daysRemaining: number;
  billionSecondsDate: Date;
  passedBillion: boolean;
}

export const MONTH_NAMES = [
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
] as const;

export const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export function normalizeAsciiDigits(input: string): string {
  const bnDigits = '০১২৩৪৫৬৭৮৯';
  return input.replace(/[০-৯]/g, (ch) => {
    const idx = bnDigits.indexOf(ch);
    return idx >= 0 ? String(idx) : ch;
  });
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(month: number, year: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return 31;
}

export function createLocalDate(year: number, month: number, day: number): Date {
  const d = new Date(year, month - 1, day, 0, 0, 0, 0);
  d.setFullYear(year);
  return d;
}

export function formatReadableDate(
  date: Date,
  lang: Language = 'en',
  numeralMode: NumeralMode = 'bn'
): string {
  return formatReadableDateLocalized(date, lang, numeralMode);
}

export function validateDateInputs(
  dayRaw: string | number,
  monthRaw: string | number,
  yearRaw: string | number,
  options?: {
    allowFuture?: boolean;
    minYear?: number;
    maxYear?: number;
    label?: string;
    lang?: Language;
    numeralMode?: NumeralMode;
  }
): DateValidationResult {
  const lang = options?.lang ?? 'en';
  const numeralMode = options?.numeralMode ?? 'bn';
  const label = options?.label ?? (lang === 'bn' ? 'তারিখ' : 'Date');
  const minYear = options?.minYear ?? 1900;
  const maxYear = options?.maxYear ?? 2150;

  const dayStr = normalizeAsciiDigits(String(dayRaw).trim());
  const monthStr = normalizeAsciiDigits(String(monthRaw).trim());
  const yearStr = normalizeAsciiDigits(String(yearRaw).trim());

  const nFmt = (v: number | string) => applyNumeralMode(v, lang, numeralMode);

  if (!dayStr || !monthStr || !yearStr) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label}: অনুগ্রহ করে দিন, মাস এবং বছর লিখুন।`
          : `${label}: Please enter day, month, and year.`,
    };
  }

  if (!/^\d+$/.test(dayStr) || !/^\d+$/.test(monthStr) || !/^\d+$/.test(yearStr)) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label}: তারিখের ঘরগুলোতে শুধুমাত্র সঠিক সংখ্যা দিন।`
          : `${label}: Date fields must contain valid numbers only.`,
    };
  }

  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (year < minYear || year > maxYear) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label}: বছর অবশ্যই ${nFmt(minYear)} থেকে ${nFmt(maxYear)}-এর মধ্যে হতে হবে।`
          : `${label}: Year must be between ${minYear} and ${maxYear}.`,
    };
  }

  if (month < 1 || month > 12) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label}: মাস অবশ্যই ${nFmt(1)} থেকে ${nFmt(12)}-এর মধ্যে হতে হবে।`
          : `${label}: Month must be between 1 and 12.`,
    };
  }

  const maxDays = getDaysInMonth(month, year);
  if (day < 1 || day > maxDays) {
    if (month === 2 && day === 29 && !isLeapYear(year)) {
      return {
        valid: false,
        error:
          lang === 'bn'
            ? `${label}: ${nFmt(year)} লিপ ইয়ার নয়, তাই ফেব্রুয়ারি মাসে ২৮ দিন।`
            : `${label}: ${year} is not a leap year, so February only has 28 days.`,
      };
    }
    const monthLabel = MONTH_NAMES_BY_LANG[lang][month - 1];
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label}: ${monthLabel} ${nFmt(year)} মাসে মাত্র ${nFmt(maxDays)} দিন রয়েছে।`
          : `${label}: ${monthLabel} ${year} only has ${maxDays} days.`,
    };
  }

  const parsed = createLocalDate(year, month, day);
  const now = new Date();
  const todayStart = createLocalDate(now.getFullYear(), now.getMonth() + 1, now.getDate());

  if (!options?.allowFuture && parsed.getTime() > todayStart.getTime()) {
    return {
      valid: false,
      error:
        lang === 'bn'
          ? `${label} ভবিষ্যতের হতে পারে না। অনুগ্রহ করে আজ বা তার আগের তারিখ দিন।`
          : `${label} cannot be in the future. Please select today or an earlier date.`,
    };
  }

  return { valid: true, date: parsed };
}

export function getCalendarDiff(startDate: Date, endDate: Date): {
  years: number;
  months: number;
  days: number;
} {
  let start = startDate;
  let end = endDate;
  if (start.getTime() > end.getTime()) {
    start = endDate;
    end = startDate;
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    const prevMonthLastDay = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    const clampedStartDay = Math.min(start.getDate(), prevMonthLastDay);
    days = prevMonthLastDay - clampedStartDay + end.getDate();
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function calculateExactAge(dob: Date, now: Date = new Date()): ExactAgeResult {
  const { years, months, days } = getCalendarDiff(dob, now);
  const diffMs = Math.max(0, now.getTime() - dob.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

function getBirthdayInYear(dob: Date, targetYear: number): Date {
  const dobMonth = dob.getMonth() + 1;
  const dobDay = dob.getDate();
  if (dobMonth === 2 && dobDay === 29 && !isLeapYear(targetYear)) {
    return createLocalDate(targetYear, 3, 1);
  }
  return createLocalDate(targetYear, dobMonth, dobDay);
}

export function calculateBirthdayCountdown(
  dob: Date,
  now: Date = new Date(),
  lang: Language = 'en'
): BirthdayCountdownResult {
  const isLeapling = dob.getMonth() === 1 && dob.getDate() === 29;
  const todayStart = createLocalDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const thisYearBirthday = getBirthdayInYear(dob, now.getFullYear());

  const isBirthdayToday =
    now.getFullYear() >= dob.getFullYear() &&
    thisYearBirthday.getTime() === todayStart.getTime();

  let nextBirthday = thisYearBirthday;
  if (thisYearBirthday.getTime() <= todayStart.getTime()) {
    nextBirthday = getBirthdayInYear(dob, now.getFullYear() + 1);
  }

  const turningAge = nextBirthday.getFullYear() - dob.getFullYear();
  const diffMs = Math.max(0, nextBirthday.getTime() - now.getTime());

  const totalRemainingSeconds = Math.floor(diffMs / 1000);
  const remainingTotalDays = Math.floor(totalRemainingSeconds / 86400);
  const remainingHours = Math.floor((totalRemainingSeconds % 86400) / 3600);
  const remainingMinutes = Math.floor((totalRemainingSeconds % 3600) / 60);
  const remainingSeconds = totalRemainingSeconds % 60;

  const nextDayBoundary = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0 ? 0 : 1),
    0,
    0,
    0,
    0
  );
  const calDiff =
    nextDayBoundary.getTime() <= nextBirthday.getTime()
      ? getCalendarDiff(nextDayBoundary, nextBirthday)
      : { years: 0, months: 0, days: 0 };

  return {
    nextBirthday,
    turningAge,
    isBirthdayToday,
    isLeapling,
    remainingTotalDays,
    remainingMonths: calDiff.years * 12 + calDiff.months,
    remainingDays: calDiff.days,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
    nextBirthdayWeekday: WEEKDAY_NAMES_BY_LANG[lang][nextBirthday.getDay()],
  };
}

export function calculateLifeStatistics(
  dob: Date,
  now: Date = new Date()
): LifeStatisticsResult {
  const age = calculateExactAge(dob, now);
  const referenceLifespanYears = 80;
  // Average resting estimates: ~72 heartbeats/min, ~16 breaths/min, ~8h/24h sleep
  const approxHeartbeats = Math.round(age.totalMinutes * 72);
  const approxBreaths = Math.round(age.totalMinutes * 16);
  const approxSleepYears = Number(((age.totalDays / 365.2425) * (8 / 24)).toFixed(1));

  const referenceEndDate = getBirthdayInYear(dob, dob.getFullYear() + referenceLifespanYears);
  const totalReferenceMs = Math.max(1, referenceEndDate.getTime() - dob.getTime());
  const elapsedMs = Math.max(0, now.getTime() - dob.getTime());
  const rawPercent = (elapsedMs / totalReferenceMs) * 100;
  const lifeProgressPercent = Math.min(100, Math.max(0, Number(rawPercent.toFixed(2))));

  return {
    ...age,
    approxHeartbeats,
    approxBreaths,
    lifeProgressPercent,
    referenceLifespanYears,
    approxSleepYears,
  };
}

export function calculateAgeDifference(dob1: Date, dob2: Date): AgeDifferenceResult {
  const t1 = dob1.getTime();
  const t2 = dob2.getTime();
  const olderPerson: 1 | 2 | 0 = t1 < t2 ? 1 : t2 < t1 ? 2 : 0;
  const earlier = t1 <= t2 ? dob1 : dob2;
  const later = t1 <= t2 ? dob2 : dob1;

  const { years, months, days } = getCalendarDiff(earlier, later);
  const totalDays = Math.round((later.getTime() - earlier.getTime()) / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    olderPerson,
  };
}

export function calculateDurationBetween(startDate: Date, now: Date = new Date()): DurationResult {
  const { years, months, days } = getCalendarDiff(startDate, now);
  const diffMs = Math.max(0, now.getTime() - startDate.getTime());
  const totalMinutes = Math.floor(diffMs / 60000);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  const todayStart = createLocalDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
  let nextAnniversary = getBirthdayInYear(startDate, now.getFullYear());
  if (nextAnniversary.getTime() <= todayStart.getTime()) {
    nextAnniversary = getBirthdayInYear(startDate, now.getFullYear() + 1);
  }
  const daysUntilNextAnniversary = Math.round(
    (nextAnniversary.getTime() - todayStart.getTime()) / 86400000
  );

  const milestones = [100, 250, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000];
  const nextMilestoneDays =
    milestones.find((m) => m > totalDays) ?? Math.ceil((totalDays + 1) / 5000) * 5000;
  const daysUntilNextMilestone = nextMilestoneDays - totalDays;

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
    nextAnniversary,
    daysUntilNextAnniversary,
    nextMilestoneDays,
    daysUntilNextMilestone,
  };
}

export function getWesternZodiac(
  day: number,
  month: number,
  lang: Language = 'en',
  numeralMode: NumeralMode = 'bn'
): ZodiacInfo {
  const n = (s: string) => applyNumeralMode(s, lang, numeralMode);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return lang === 'bn'
      ? {
          sign: 'মেষ (Aries)',
          symbol: '♈',
          dateRange: n('২১ মার্চ – ১৯ এপ্রিল'),
          element: 'অগ্নি',
          rulingPlanet: 'মঙ্গল',
          modality: 'কার্ডিনাল',
          traits: ['সাহসী', 'উদ্যমী', 'স্পষ্টভাষী', 'অগ্রগামী'],
          description: 'রাশিচক্রের প্রথম রাশি, যা উদ্যোগ, স্পষ্ট পদক্ষেপ এবং সাহসী সূচনার প্রতীক।',
        }
      : {
          sign: 'Aries',
          symbol: '♈',
          dateRange: 'March 21 – April 19',
          element: 'Fire',
          rulingPlanet: 'Mars',
          modality: 'Cardinal',
          traits: ['Courageous', 'Energetic', 'Direct', 'Pioneering'],
          description: 'First sign of the zodiac, associated with initiative, clarity of action, and bold beginnings.',
        };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return lang === 'bn'
      ? {
          sign: 'বৃষ (Taurus)',
          symbol: '♉',
          dateRange: n('২০ এপ্রিল – ২০ মে'),
          element: 'পৃথিবী',
          rulingPlanet: 'শুক্র',
          modality: 'স্থির',
          traits: ['বাস্তববাদী', 'ধৈর্যশীল', 'বিশ্বস্ত', 'শিল্পরসিক'],
          description: 'স্থিরতা, ধৈর্য এবং দীর্ঘস্থায়ী প্রতিশ্রুতির সঙ্গে যুক্ত একটি পৃথিবী উপাদানের রাশি।',
        }
      : {
          sign: 'Taurus',
          symbol: '♉',
          dateRange: 'April 20 – May 20',
          element: 'Earth',
          rulingPlanet: 'Venus',
          modality: 'Fixed',
          traits: ['Grounded', 'Patient', 'Reliable', 'Appreciative'],
          description: 'An Earth sign anchored by steadiness, sensory appreciation, and enduring commitment.',
        };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return lang === 'bn'
      ? {
          sign: 'মিথুন (Gemini)',
          symbol: '♊',
          dateRange: n('২১ মে – ২০ জুন'),
          element: 'বায়ু',
          rulingPlanet: 'বুধ',
          modality: 'পরিবর্তনশীল',
          traits: ['কৌতূহলী', 'মানিয়ে নেওয়ার ক্ষমতাসম্পন্ন', 'বাকপটু', 'বুদ্ধিদীপ্ত'],
          description: 'কৌতূহল, সংলাপ এবং নতুন ধারণার সংযোগে অনুপ্রাণিত একটি বায়ু উপাদানের রাশি।',
        }
      : {
          sign: 'Gemini',
          symbol: '♊',
          dateRange: 'May 21 – June 20',
          element: 'Air',
          rulingPlanet: 'Mercury',
          modality: 'Mutable',
          traits: ['Curious', 'Adaptable', 'Expressive', 'Quick-witted'],
          description: 'An Air sign driven by curiosity, dialogue, and connecting distinct ideas.',
        };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return lang === 'bn'
      ? {
          sign: 'কর্কট (Cancer)',
          symbol: '♋',
          dateRange: n('২১ জুন – ২২ জুলাই'),
          element: 'জল',
          rulingPlanet: 'চন্দ্র',
          modality: 'কার্ডিনাল',
          traits: ['অন্তর্দৃষ্টিসম্পন্ন', 'রক্ষণশীল', 'সহানুভূতিশীল', 'দৃঢ়চেতা'],
          description: 'স্মৃতি, পরিবার এবং গভীর আবেগের সঙ্গে যুক্ত একটি জল উপাদানের রাশি।',
        }
      : {
          sign: 'Cancer',
          symbol: '♋',
          dateRange: 'June 21 – July 22',
          element: 'Water',
          rulingPlanet: 'Moon',
          modality: 'Cardinal',
          traits: ['Intuitive', 'Protective', 'Empathetic', 'Tenacious'],
          description: 'A Water sign deeply attuned to memory, home, and emotional resonance.',
        };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return lang === 'bn'
      ? {
          sign: 'সিংহ (Leo)',
          symbol: '♌',
          dateRange: n('২৩ জুলাই – ২২ আগস্ট'),
          element: 'অগ্নি',
          rulingPlanet: 'সূর্য',
          modality: 'স্থির',
          traits: ['উদারহৃদয়', 'সৃজনশীল', 'আত্মবিশ্বাসী', 'বিশ্বস্ত'],
          description: 'উষ্ণতা, সৃজনশীল নেতৃত্ব এবং আনুগত্যের প্রতীক একটি অগ্নি উপাদানের রাশি।',
        }
      : {
          sign: 'Leo',
          symbol: '♌',
          dateRange: 'July 23 – August 22',
          element: 'Fire',
          rulingPlanet: 'Sun',
          modality: 'Fixed',
          traits: ['Warmhearted', 'Creative', 'Confident', 'Generous'],
          description: 'A Fire sign radiating expressive warmth, creative leadership, and loyalty.',
        };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return lang === 'bn'
      ? {
          sign: 'কন্যা (Virgo)',
          symbol: '♍',
          dateRange: n('২৩ আগস্ট – ২২ সেপ্টেম্বর'),
          element: 'পৃথিবী',
          rulingPlanet: 'বুধ',
          modality: 'পরিবর্তনশীল',
          traits: ['বিশ্লেষণধর্মী', 'সুশৃঙ্খল', 'চিন্তাশীল', 'পর্যবেক্ষণশীল'],
          description: 'সূক্ষ্মতা, বিচক্ষণতা এবং বাস্তবিক যত্নশীলতা দ্বারা পরিচালিত একটি পৃথিবী উপাদানের রাশি।',
        }
      : {
          sign: 'Virgo',
          symbol: '♍',
          dateRange: 'August 23 – September 22',
          element: 'Earth',
          rulingPlanet: 'Mercury',
          modality: 'Mutable',
          traits: ['Analytical', 'Methodical', 'Thoughtful', 'Observant'],
          description: 'An Earth sign guided by craftsmanship, discernment, and practical care.',
        };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return lang === 'bn'
      ? {
          sign: 'তুলা (Libra)',
          symbol: '♎',
          dateRange: n('২৩ সেপ্টেম্বর – ২২ অক্টোবর'),
          element: 'বায়ু',
          rulingPlanet: 'শুক্র',
          modality: 'কার্ডিনাল',
          traits: ['কূটনৈতিক', 'ভারসাম্যপূর্ণ', 'ন্যায়পরায়ণ', 'সৌহার্দ্যপূর্ণ'],
          description: 'সুষম ভারসাম্য, অংশীদারিত্ব এবং সুন্দর দৃষ্টিভঙ্গির প্রতি আকৃষ্ট একটি বায়ু উপাদানের রাশি।',
        }
      : {
          sign: 'Libra',
          symbol: '♎',
          dateRange: 'September 23 – October 22',
          element: 'Air',
          rulingPlanet: 'Venus',
          modality: 'Cardinal',
          traits: ['Diplomatic', 'Balanced', 'Fair-minded', 'Harmonious'],
          description: 'An Air sign drawn to symmetry, partnership, and thoughtful perspective.',
        };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return lang === 'bn'
      ? {
          sign: 'বৃশ্চিক (Scorpio)',
          symbol: '♏',
          dateRange: n('২৩ অক্টোবর – ২১ নভেম্বর'),
          element: 'জল',
          rulingPlanet: 'প্লুটো ও মঙ্গল',
          modality: 'স্থির',
          traits: ['গভীর দৃষ্টিসম্পন্ন', 'দৃঢ়সংকল্পবদ্ধ', 'মনোযোগী', 'উদ্ভাবনী'],
          description: 'গভীর অন্তর্দৃষ্টি, নীরব দৃঢ়তা এবং রূপান্তরের জন্য পরিচিত একটি জল উপাদানের রাশি।',
        }
      : {
          sign: 'Scorpio',
          symbol: '♏',
          dateRange: 'October 23 – November 21',
          element: 'Water',
          rulingPlanet: 'Pluto & Mars',
          modality: 'Fixed',
          traits: ['Perceptive', 'Resolute', 'Focused', 'Resourceful'],
          description: 'A Water sign known for depth of insight, quiet determination, and transformation.',
        };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return lang === 'bn'
      ? {
          sign: 'ধনু (Sagittarius)',
          symbol: '♐',
          dateRange: n('২২ নভেম্বর – ২১ ডিসেম্বর'),
          element: 'অগ্নি',
          rulingPlanet: 'বৃহস্পতি',
          modality: 'পরিবর্তনশীল',
          traits: ['আশাবাদী', 'দার্শনিক', 'অ্যাডভেঞ্চারপ্রিয়', 'অকপট'],
          description: 'নতুন দিগন্ত অন্বেষণ, জ্ঞান ও স্পষ্ট ভাবনার দিকে ধাবিত একটি অগ্নি উপাদানের রাশি।',
        }
      : {
          sign: 'Sagittarius',
          symbol: '♐',
          dateRange: 'November 22 – December 21',
          element: 'Fire',
          rulingPlanet: 'Jupiter',
          modality: 'Mutable',
          traits: ['Optimistic', 'Philosophical', 'Adventurous', 'Candid'],
          description: 'A Fire sign oriented toward exploration, broad horizons, and candid inquiry.',
        };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return lang === 'bn'
      ? {
          sign: 'মকর (Capricorn)',
          symbol: '♑',
          dateRange: n('২২ ডিসেম্বর – ১৯ জানুয়ারি'),
          element: 'পৃথিবী',
          rulingPlanet: 'শনি',
          modality: 'কার্ডিনাল',
          traits: ['শৃঙ্খলাবদ্ধ', 'কৌশলী', 'দৃঢ়প্রতিজ্ঞ', 'উচ্চাকাঙ্ক্ষী'],
          description: 'দীর্ঘমেয়াদি লক্ষ্য, সুশৃঙ্খল কাঠামো এবং ধৈর্যশীল অধ্যবসায়ের প্রতীক একটি পৃথিবী উপাদানের রাশি।',
        }
      : {
          sign: 'Capricorn',
          symbol: '♑',
          dateRange: 'December 22 – January 19',
          element: 'Earth',
          rulingPlanet: 'Saturn',
          modality: 'Cardinal',
          traits: ['Disciplined', 'Strategic', 'Steadfast', 'Ambitious'],
          description: 'An Earth sign marked by long-range focus, structure, and quiet endurance.',
        };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return lang === 'bn'
      ? {
          sign: 'কুম্ভ (Aquarius)',
          symbol: '♒',
          dateRange: n('২০ জানুয়ারি – ১৮ ফেব্রুয়ারি'),
          element: 'বায়ু',
          rulingPlanet: 'ইউরেনাস ও শনি',
          modality: 'স্থির',
          traits: ['স্বাধীনচেতা', 'সৃজনশীল', 'মানবতাবাদী', 'মৌলিক'],
          description: 'দূরদর্শী চিন্তাভাবনা, স্বাধীনতা এবং সামাজিক দৃষ্টিভঙ্গির জন্য পরিচিত একটি বায়ু উপাদানের রাশি।',
        }
      : {
          sign: 'Aquarius',
          symbol: '♒',
          dateRange: 'January 20 – February 18',
          element: 'Air',
          rulingPlanet: 'Uranus & Saturn',
          modality: 'Fixed',
          traits: ['Independent', 'Inventive', 'Humanitarian', 'Original'],
          description: 'An Air sign defined by forward thinking, independence, and community vision.',
        };
  }
  return lang === 'bn'
    ? {
        sign: 'মীন (Pisces)',
        symbol: '♓',
        dateRange: n('১৯ ফেব্রুয়ারি – ২০ মার্চ'),
        element: 'জল',
        rulingPlanet: 'নেপচুন ও বৃহস্পতি',
        modality: 'পরিবর্তনশীল',
        traits: ['কল্পনাপ্রবণ', 'দয়ালু', 'চিন্তাশীল', 'শিল্পীমনা'],
        description: 'সহানুভূতি, সৃজনশীলতা এবং সূক্ষ্ম অনুভূতির সঙ্গে গভীরভাবে যুক্ত একটি জল উপাদানের রাশি।',
      }
    : {
        sign: 'Pisces',
        symbol: '♓',
        dateRange: 'February 19 – March 20',
        element: 'Water',
        rulingPlanet: 'Neptune & Jupiter',
        modality: 'Mutable',
        traits: ['Imaginative', 'Compassionate', 'Reflective', 'Artistic'],
        description: 'A Water sign attuned to empathy, creativity, and subtle emotional nuance.',
      };
}

export function getDayBornInfo(
  dob: Date,
  now: Date = new Date(),
  lang: Language = 'en',
  numeralMode: NumeralMode = 'bn'
): DayBornInfo {
  const weekday = WEEKDAY_NAMES_BY_LANG[lang][dob.getDay()];
  const yearStart = createLocalDate(dob.getFullYear(), 1, 1);
  const dayOfYear = Math.floor((dob.getTime() - yearStart.getTime()) / 86400000) + 1;
  const weekOfYear = Math.ceil((dayOfYear + yearStart.getDay()) / 7);

  const m = dob.getMonth() + 1;
  const d = dob.getDate();
  let seasonKey: 'Winter' | 'Spring' | 'Summer' | 'Autumn' = 'Winter';
  if ((m === 3 && d >= 20) || m === 4 || m === 5 || (m === 6 && d < 21)) {
    seasonKey = 'Spring';
  } else if ((m === 6 && d >= 21) || m === 7 || m === 8 || (m === 9 && d < 22)) {
    seasonKey = 'Summer';
  } else if ((m === 9 && d >= 22) || m === 10 || m === 11 || (m === 12 && d < 21)) {
    seasonKey = 'Autumn';
  }

  const seasonMapBn: Record<typeof seasonKey, string> = {
    Winter: 'শীত',
    Spring: 'বসন্ত',
    Summer: 'গ্রীষ্ম',
    Autumn: 'শরৎ',
  };

  const todayStart = createLocalDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const daysSinceBirth = Math.max(0, Math.floor((todayStart.getTime() - dob.getTime()) / 86400000));

  return {
    weekday,
    formattedDate: formatReadableDate(dob, lang, numeralMode),
    dayOfYear,
    weekOfYear,
    isLeapYear: isLeapYear(dob.getFullYear()),
    season: lang === 'bn' ? seasonMapBn[seasonKey] : seasonKey,
    daysSinceBirth,
  };
}

export function calculateFutureAges(
  dob: Date,
  targetYears: number[] = [2027, 2030, 2040, 2050],
  lang: Language = 'en'
): FutureAgeEntry[] {
  return targetYears.map((year) => {
    const birthdayDate = getBirthdayInYear(dob, year);
    const ageOnBirthday = year - dob.getFullYear();
    const jan1 = createLocalDate(year, 1, 1);
    const ageOnJan1 =
      jan1.getTime() >= dob.getTime()
        ? getCalendarDiff(dob, jan1)
        : { years: 0, months: 0, days: 0 };

    return {
      year,
      ageOnBirthday,
      birthdayDate,
      birthdayWeekday: WEEKDAY_NAMES_BY_LANG[lang][birthdayDate.getDay()],
      ageOnJan1,
    };
  });
}

export function calculateRetirement(
  dob: Date,
  retirementAge: number,
  now: Date = new Date()
): RetirementResult {
  const safeAge = Math.max(18, Math.min(100, Math.round(retirementAge)));
  const retirementDate = getBirthdayInYear(dob, dob.getFullYear() + safeAge);
  const todayStart = createLocalDate(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const alreadyRetired = todayStart.getTime() >= retirementDate.getTime();
  const totalSpanMs = Math.max(1, retirementDate.getTime() - dob.getTime());
  const elapsedMs = Math.max(0, todayStart.getTime() - dob.getTime());
  const progressPercent = Math.min(100, Math.max(0, Number(((elapsedMs / totalSpanMs) * 100).toFixed(2))));

  if (alreadyRetired) {
    return {
      targetRetirementAge: safeAge,
      retirementDate,
      alreadyRetired: true,
      remainingYears: 0,
      remainingMonths: 0,
      remainingDays: 0,
      totalRemainingDays: 0,
      totalRemainingWeeks: 0,
      progressPercent: 100,
    };
  }

  const diff = getCalendarDiff(todayStart, retirementDate);
  const totalRemainingDays = Math.round((retirementDate.getTime() - todayStart.getTime()) / 86400000);
  const totalRemainingWeeks = Math.floor(totalRemainingDays / 7);

  return {
    targetRetirementAge: safeAge,
    retirementDate,
    alreadyRetired: false,
    remainingYears: diff.years,
    remainingMonths: diff.months,
    remainingDays: diff.days,
    totalRemainingDays,
    totalRemainingWeeks,
    progressPercent,
  };
}

export function calculateMillionSeconds(
  dob: Date,
  now: Date = new Date()
): MillionSecondsResult {
  const diffMs = Math.max(0, now.getTime() - dob.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const millionsLived = totalSeconds / 1_000_000;

  const step = totalSeconds >= 1_000_000_000 ? 100 : 50;
  const nextMilestoneMillions = Math.max(1, (Math.floor(millionsLived / step) + 1) * step);
  const nextMilestoneSeconds = nextMilestoneMillions * 1_000_000;
  const nextMilestoneDate = new Date(dob.getTime() + nextMilestoneSeconds * 1000);
  const secondsRemaining = Math.max(0, nextMilestoneSeconds - totalSeconds);
  const daysRemaining = Math.ceil(secondsRemaining / 86400);

  const billionSecondsDate = new Date(dob.getTime() + 1_000_000_000 * 1000);
  const passedBillion = totalSeconds >= 1_000_000_000;

  return {
    totalSeconds,
    millionsLived,
    nextMilestoneMillions,
    nextMilestoneSeconds,
    nextMilestoneDate,
    secondsRemaining,
    daysRemaining,
    billionSecondsDate,
    passedBillion,
  };
}
