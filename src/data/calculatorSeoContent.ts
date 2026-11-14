import { Language } from '../i18n/types';
import { BlogArticleSlug, KnownRoute } from '../utils/seo';

export interface CalculatorSeoGuideData {
  introduction: string;
  howToCalculate: string;
  steps: string[];
  formula: string;
  examples: {
    scenario: string;
    calculation: string;
    result: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedBlogSlugs: BlogArticleSlug[];
}

export const CALCULATOR_SEO_CONTENT: Partial<Record<KnownRoute, CalculatorSeoGuideData>> = {
  '/age-calculator': {
    introduction:
      'Determining your chronological age accurately requires more than dividing elapsed days by 365. Because calendar months range from 28 to 31 days and leap years add February 29 every four years (with century exceptions), true calendar subtraction in your local timezone ensures exact years, months, and days alongside live second-by-second totals.',
    howToCalculate:
      'Calendar age is calculated by comparing your birth year, month, and day against the current local date. When the current day of the month is smaller than your birth day, days are borrowed from the immediately preceding calendar month rather than using a fixed 30-day average.',
    steps: [
      'Enter your birth Day, Month, and Year in the input fields above.',
      'Click "Calculate Age" to validate the date against the Gregorian calendar (including leap-year rules).',
      'Review your exact chronological age in Years, Months, and Days plus cumulative totals down to live seconds.',
      'Scroll down to inspect your next birthday countdown and Life Statistics benchmark.',
    ],
    formula:
      'Years = CurrentYear − BirthYear (adjusted by −1 if CurrentMonth/Day precedes BirthMonth/Day); Days = PrevMonthDays − min(BirthDay, PrevMonthDays) + CurrentDay when borrowing.',
    examples: [
      {
        scenario: 'Birth date: August 15, 1998 · Reference date: November 13, 2026',
        calculation:
          '2026 − 1998 = 28 years. August 15 to October 15 is 2 full months; October 15 to November 13 is 29 days.',
        result: '28 years, 2 months, and 29 days (10,317 total days).',
      },
      {
        scenario: 'Month-end boundary: January 31, 2000 · Reference date: March 1, 2001',
        calculation:
          'From Jan 31, 2000 to Jan 31, 2001 is 1 year; clamped to Feb 28, 2001 gives 1 month; Feb 28 to Mar 1 adds 1 day.',
        result: '1 year, 1 month, and 1 day.',
      },
    ],
    faqs: [
      {
        question: 'Why does Ageora not divide total milliseconds by 30.4375 to get months?',
        answer:
          'Dividing by an average month length creates drift around 28-day Februaries and 31-day months. Ageora steps through real calendar months so your age transitions cleanly on your exact birth day.',
      },
      {
        question: 'What happens if I enter a date in the future?',
        answer:
          'The calculator validates against your local calendar date and shows a clear error message if a future birth date is entered.',
      },
      {
        question: 'Are the heartbeats and breaths figures exact medical measurements?',
        answer:
          'No. They are clearly labeled approximate estimates derived from general resting averages (72 beats/min and 16 breaths/min) multiplied by your lived minutes.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-exact-age',
      'how-many-days-have-i-been-alive',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/birthday-countdown': {
    introduction:
      'A birthday countdown converts the gap between the exact current second in your local timezone and midnight at the start of your upcoming birthday into days, hours, minutes, and seconds.',
    howToCalculate:
      'First, the calculator locates your birth month and day in the current calendar year. If that date has already passed (or is today), it targets the same month and day in the next year, then subtracts your current local timestamp from that target midnight.',
    steps: [
      'Provide your birth Day, Month, and Year.',
      'Click "Start Countdown" to lock in your next birthday target in your device’s local timezone.',
      'Watch the live Days, Hours, Minutes, and Seconds display tick down in real time.',
      'Check the upcoming milestone birthdays table to see which weekdays future landmark birthdays fall on.',
    ],
    formula:
      'RemainingSeconds = floor((NextBirthdayMidnightTimestamp − CurrentLocalTimestamp) / 1000); Hours = floor((RemainingSeconds mod 86400) / 3600).',
    examples: [
      {
        scenario: 'Birth date: December 1, 1995 · Current time: November 13, 2026 at 12:00 PM',
        calculation:
          'Next birthday is December 1, 2026 at 00:00. Elapsed distance is 17 full days and 12 hours.',
        result: '17 days, 12 hours, 00 minutes, 00 seconds (turning 31).',
      },
      {
        scenario: 'Leap-day birth: February 29, 2000 · Reference year: 2026 (non-leap year)',
        calculation:
          'Since February 2026 ends on the 28th, Ageora aligns the non-leap annual observance to March 1, 2026.',
        result: 'Next annual birthday observed on March 1.',
      },
    ],
    faqs: [
      {
        question: 'Does the countdown adjust automatically for Daylight Saving Time?',
        answer:
          'Yes. Because target midnight is constructed in local calendar time, the browser’s local Date engine accounts for regional timezone offsets.',
      },
      {
        question: 'What does the countdown show on my actual birthday?',
        answer:
          'On your birthday, the tool displays a Happy Birthday message for your current age and begins counting down to next year’s celebration.',
      },
      {
        question: 'How are February 29 birthdays handled in non-leap years?',
        answer:
          'In non-leap years, Ageora maps the annual birthday to March 1 and displays a transparent note explaining the leap-year alignment.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-next-birthday',
      'how-does-a-leap-year-affect-age-calculation',
      'how-many-seconds-are-in-a-year',
    ],
  },

  '/next-birthday': {
    introduction:
      'Beyond knowing how many days remain until your cake, the Next Birthday Calculator reveals the exact weekday of your next birthday, the age you will turn, and a multi-decade preview of milestone birthdays such as 30, 40, 50, and beyond.',
    howToCalculate:
      'Each common year of 365 days equals 52 weeks plus 1 extra day, so your birthday normally advances by one weekday per year—or two weekdays whenever February 29 sits between consecutive birthdays.',
    steps: [
      'Enter your Day, Month, and Year of birth.',
      'Click "Find Next Birthday" to compute your upcoming birthday date and weekday.',
      'Review your turning age and exact calendar months and days remaining.',
      'Browse the Upcoming Milestone Birthdays list for future decade dates.',
    ],
    formula:
      'TurningAge = NextBirthdayYear − BirthYear; WeekdayIndex = (BirthWeekdayIndex + ElapsedDays) mod 7.',
    examples: [
      {
        scenario: 'Birth date: July 4, 1996 · Reference date: November 13, 2026',
        calculation:
          'July 4, 2026 has passed, so the next birthday is July 4, 2027, which falls on a Sunday.',
        result: 'Sunday, July 4, 2027 (Turning 31 years old).',
      },
      {
        scenario: 'Milestone check: 40th birthday for someone born August 15, 1998',
        calculation: '1998 + 40 = 2038; August 15, 2038 falls on a Sunday.',
        result: '40th Birthday on Sunday, August 15, 2038.',
      },
    ],
    faqs: [
      {
        question: 'Why does my birthday fall on a different day of the week each year?',
        answer:
          'Because 365 is not evenly divisible by 7 (365 = 52 × 7 + 1), your birthday shifts forward by one weekday after a common year and two weekdays after a leap-day span.',
      },
      {
        question: 'Which milestone ages are listed automatically?',
        answer:
          'The timeline automatically filters milestone ages (18, 21, 25, 30, 40, 50, 60, 75, and 100) to show your next upcoming six landmarks.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-next-birthday',
      'how-to-find-your-day-of-birth',
      'how-to-calculate-age-in-different-years',
    ],
  },

  '/age-difference-calculator': {
    introduction:
      'Whether comparing siblings, partners, classmates, or historical figures, finding the exact age gap requires calendar subtraction between the earlier birth date and the later birth date so every leap day and 31-day month is respected.',
    howToCalculate:
      'The calculator orders the two valid dates chronologically, takes the earlier birth date as the start point and the later birth date as the end point, and computes both the calendar breakdown (years, months, days) and absolute elapsed days.',
    steps: [
      'Optionally enter names for both people to personalize your comparison summary.',
      'Input the Day, Month, and Year of birth for Person 1 and Person 2.',
      'Click "Calculate Age Difference" to view the exact gap in years, months, weeks, and total days.',
      'Download a PNG comparison card or copy the text summary to share.',
    ],
    formula:
      'EarlierDate = min(DOB1, DOB2); LaterDate = max(DOB1, DOB2); TotalDays = round((LaterDate − EarlierDate) / 86,400,000 ms).',
    examples: [
      {
        scenario: 'Person A: April 12, 1995 · Person B: September 25, 1998',
        calculation:
          'From Apr 12, 1995 to Apr 12, 1998 is 3 years; to Sep 12 is 5 months; to Sep 25 is 13 days.',
        result: '3 years, 5 months, and 13 days apart (1,262 total days).',
      },
      {
        scenario: 'Same-year siblings: February 1, 2004 · October 1, 2004 (leap year)',
        calculation:
          'February 2004 has 29 days, adding one extra day to the total day count between February and October.',
        result: '0 years, 8 months, and 0 days apart (243 total days).',
      },
    ],
    faqs: [
      {
        question: 'Does the order in which I enter the two birth dates matter?',
        answer:
          'No. The calculator automatically identifies which birth date came first so the difference is always positive and accurate.',
      },
      {
        question: 'Why does total days sometimes differ by 1 day for the same number of years?',
        answer:
          'A 4-year span can contain either one leap year (1,461 days) or zero leap years across a non-leap century boundary such as 1900 (1,460 days).',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-difference-between-two-people',
      'how-to-calculate-your-exact-age',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/who-is-older': {
    introduction:
      'Settling a friendly debate over who was born first takes seconds when you compare two exact calendar dates. Even people born in the same month or week can verify the exact number of days separating them.',
    howToCalculate:
      'We compare the normalized local timestamps of both birth dates. Whichever date has the smaller chronological timestamp represents the older individual, and the difference is reported in total days, weeks, months, and years.',
    steps: [
      'Enter optional names for both people.',
      'Fill in the birth Day, Month, and Year for each person.',
      'Click "Compare Who Is Older" to see the clear winner and exact day difference.',
    ],
    formula:
      'OlderPerson = DOB1 < DOB2 ? Person1 : (DOB2 < DOB1 ? Person2 : SameDay); DayLead = abs(DOB1 − DOB2) / 86,400,000.',
    examples: [
      {
        scenario: 'Alex: March 3, 2001 · Sam: March 19, 2001',
        calculation: 'Both were born in March 2001; March 3 precedes March 19 by 16 days.',
        result: 'Alex is older by 16 days (2 weeks and 2 days).',
      },
      {
        scenario: 'Twin comparison: May 10, 2002 · May 10, 2002',
        calculation: 'Both calendar dates match identically.',
        result: 'Born on the exact same day (0 days apart).',
      },
    ],
    faqs: [
      {
        question: 'What if both people were born on the exact same date?',
        answer:
          'The tool detects identical dates and clearly states that both people were born on the exact same day with a 0-day difference.',
      },
      {
        question: 'Are names stored anywhere when I type them?',
        answer:
          'No. Everything runs locally in browser memory and disappears when you close or refresh the tab.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-difference-between-two-people',
      'how-to-find-your-day-of-birth',
    ],
  },

  '/friendship-calculator': {
    introduction:
      'Long-lasting friendships accumulate thousands of shared days before you realize it. The Friendship Calculator measures the exact duration from the day you met or became friends to today, highlighting upcoming 1,000-day and annual milestones.',
    howToCalculate:
      'Using the friendship start date as the origin and today’s local date as the endpoint, the tool performs full calendar subtraction for years, months, and days while also computing total elapsed days and the next milestone multiple.',
    steps: [
      'Optionally type both friends’ names to label your result card.',
      'Enter the Day, Month, and Year your friendship started.',
      'Click "Calculate Duration" to see total days, weeks, hours, next anniversary, and next day milestone.',
    ],
    formula:
      'DaysTogether = floor((TodayMidnight − StartDateMidnight) / 86,400,000); NextMilestone = min(M in MilestoneList where M > DaysTogether).',
    examples: [
      {
        scenario: 'Friendship started: September 1, 2019 · Current date: November 13, 2026',
        calculation:
          'Sep 1, 2019 to Sep 1, 2026 is 7 years; Sep 1 to Nov 1 is 2 months; Nov 1 to Nov 13 is 12 days.',
        result: '7 years, 2 months, and 12 days (2,630 total days).',
      },
      {
        scenario: 'Next milestone check for 2,630 days',
        calculation: 'Next standard landmark in the sequence after 2,000 is 3,000 days.',
        result: '3,000-day friendship milestone in 370 days.',
      },
    ],
    faqs: [
      {
        question: 'What if I only remember the month and year we became friends?',
        answer:
          'You can use the 1st of that month as an approximate anchor date to estimate your total months and years of friendship.',
      },
      {
        question: 'Which day milestones are tracked automatically?',
        answer:
          'Ageora tracks 100, 250, 500, 1,000, 1,500, 2,000, 3,000, 5,000, 7,500, 10,000, and every 5,000 days thereafter.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-friendship-duration',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/love-duration-calculator': {
    introduction:
      'Every relationship milestone—from your first 100 days to your 10th anniversary—deserves an accurate count. The Love Duration Calculator transforms your relationship start date into exact years, months, days, hours, and your next anniversary countdown.',
    howToCalculate:
      'By subtracting your anniversary start date from the current local calendar date, the calculator avoids approximate 30-day months so your monthly and yearly anniversaries align on the exact calendar day.',
    steps: [
      'Optionally enter both partner names.',
      'Enter the Day, Month, and Year your relationship began.',
      'Click "Calculate Duration" to reveal total days together, next anniversary date, and next day milestone.',
    ],
    formula:
      'CalendarGap = CalendarDiff(StartDate, Today); NextAnniversary = NextAnnualOccurrence(StartMonth, StartDay).',
    examples: [
      {
        scenario: 'Relationship start: February 14, 2021 · Reference date: November 13, 2026',
        calculation:
          'Feb 14, 2021 to Feb 14, 2026 is 5 years; Feb 14 to Oct 14 is 8 months; Oct 14 to Nov 13 is 30 days.',
        result: '5 years, 8 months, and 30 days (2,098 days together).',
      },
      {
        scenario: 'Upcoming anniversary from November 13, 2026',
        calculation: 'Next February 14 falls on February 14, 2027.',
        result: '93 days until your next anniversary.',
      },
    ],
    faqs: [
      {
        question: 'What if our anniversary is February 29?',
        answer:
          'In non-leap years, the anniversary tracker aligns to March 1 so the countdown continues smoothly every year.',
      },
      {
        question: 'Can I save or share our relationship card?',
        answer:
          'Yes. Use the Share Result Bar below the results to copy text, share on WhatsApp/Facebook, or download a PNG card.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-friendship-duration',
      'how-to-calculate-your-next-birthday',
    ],
  },

  '/zodiac-calculator': {
    introduction:
      'Western astrology divides the Sun’s apparent annual path into twelve 30-degree signs. By matching your birth month and day against the standard Western tropical zodiac calendar, this tool identifies your sign, element, ruling planet, and modality.',
    howToCalculate:
      'Your Western sun sign depends solely on your birth month and day (for example, March 21 through April 19 corresponds to Aries). Ageora evaluates exact month-day boundary rules for all twelve signs.',
    steps: [
      'Enter your Day, Month, and Year of birth.',
      'Click "Find Zodiac Sign" to match your birth date to its Western zodiac window.',
      'Explore your sign’s element (Fire, Earth, Air, Water), ruling planet, modality, and traits.',
    ],
    formula:
      'ZodiacSign = LookupRange(BirthMonth, BirthDay) across standard 12-sign tropical calendar windows.',
    examples: [
      {
        scenario: 'Birth date: August 15, 1998',
        calculation: 'August 15 falls inside July 23 – August 22.',
        result: 'Leo (Fire sign, Fixed modality, ruled by the Sun).',
      },
      {
        scenario: 'Cusp boundary check: March 20 vs. March 21',
        calculation: 'March 20 concludes Pisces (Feb 19 – Mar 20); March 21 opens Aries (Mar 21 – Apr 19).',
        result: 'March 20 is Pisces; March 21 is Aries.',
      },
    ],
    faqs: [
      {
        question: 'Why do people born around the 19th–23rd sometimes hear they are "on the cusp"?',
        answer:
          'The astronomical moment the Sun crosses into the next sign can shift by a few hours depending on the year and timezone. Standard date calculators use the primary calendar cutoffs.',
      },
      {
        question: 'Does this tool calculate Moon or Rising signs?',
        answer:
          'No. Calculating Moon and Rising (Ascendant) signs requires exact birth time and geographic coordinates; this tool determines your Western Sun sign from your birth date.',
      },
    ],
    relatedBlogSlugs: [
      'what-is-my-zodiac-sign',
      'how-to-find-your-day-of-birth',
    ],
  },

  '/day-born-calculator': {
    introduction:
      'Ever wondered whether you arrived on a quiet Sunday morning or a busy Friday? The Day Born Calculator finds the exact weekday of any birth date since 1900, alongside its ordinal day of the year, week number, and leap-year classification.',
    howToCalculate:
      'The browser’s Gregorian calendar engine maps your validated year, month, and day to its exact 0–6 weekday index (Sunday through Saturday) and counts elapsed days since January 1 of your birth year.',
    steps: [
      'Enter your Day, Month, and Year of birth.',
      'Click "Find Day Born" to compute the weekday.',
      'Check whether you were born in a leap year, which week of the year you arrived, and total days since birth.',
    ],
    formula:
      'DayOfYear = floor((BirthDate − Jan1OfBirthYear) / 86,400,000) + 1; Weekday = GregorianDayIndex(Year, Month, Day).',
    examples: [
      {
        scenario: 'Birth date: August 15, 1998',
        calculation: '1998 was a common year starting on Thursday; August 15 is day #227.',
        result: 'Born on a Saturday (Week 33 of 1998).',
      },
      {
        scenario: 'Birth date: February 29, 2000',
        calculation: '2000 was divisible by 400, making it a century leap year; Feb 29 is day #60.',
        result: 'Born on a Tuesday (Leap Year).',
      },
    ],
    faqs: [
      {
        question: 'Is this accurate for dates in the early 1900s?',
        answer:
          'Yes. The Gregorian calendar rules—including skipping leap days on 1900 while keeping 2000—are accurately enforced back to 1900.',
      },
      {
        question: 'How is "Day of Year" counted?',
        answer:
          'January 1 is Day #1, and December 31 is Day #365 in a common year or Day #366 in a leap year.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-find-your-day-of-birth',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/future-age-calculator': {
    introduction:
      'Planning ahead for 2027, 2030, 2040, 2050, or a long-term savings target is easier when you know your exact age on both January 1 and your birthday in those future years.',
    howToCalculate:
      'For each target year, your birthday age is simply TargetYear − BirthYear, while your exact age on January 1 of that year uses calendar subtraction from your birth date to January 1.',
    steps: [
      'Enter your Date of Birth.',
      'Optionally type any custom future year (up to 2200) alongside the preset milestones 2027, 2030, 2040, and 2050.',
      'Click "Calculate Future Age" to inspect both your birthday age and January 1 age in each target year.',
    ],
    formula:
      'AgeOnFutureBirthday = TargetYear − BirthYear; FutureBirthdayWeekday = Weekday(TargetYear, BirthMonth, BirthDay).',
    examples: [
      {
        scenario: 'Birth date: August 15, 1998 · Target year: 2030',
        calculation: '2030 − 1998 = 32 on August 15, 2030; on Jan 1, 2030, you are 31y 4m 17d.',
        result: '32 years old on Thursday, August 15, 2030.',
      },
      {
        scenario: 'Birth date: August 15, 1998 · Target year: 2050',
        calculation: '2050 − 1998 = 52 on August 15, 2050.',
        result: '52 years old on Monday, August 15, 2050.',
      },
    ],
    faqs: [
      {
        question: 'Why does the card show both my birthday age and my age on January 1?',
        answer:
          'Many financial and demographic projections define age as of January 1 of a calendar year, whereas personal milestones happen on your actual birthday.',
      },
      {
        question: 'Can I calculate my age in 2075 or 2100?',
        answer:
          'Yes. Enter any year up to 2200 in the Custom Year field to include it in your timeline.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-in-different-years',
      'how-to-calculate-your-exact-age',
    ],
  },

  '/retirement-calculator': {
    introduction:
      'Visualizing retirement in exact days and weeks makes long-term planning tangible. By pairing your date of birth with your chosen target retirement age, this calculator reveals your target retirement date and live progress percentage.',
    howToCalculate:
      'Your target retirement date is constructed by adding your chosen Retirement Age to your birth year (with February 29 mapped to March 1 in non-leap target years). Remaining days and calendar years/months/days are then computed from today.',
    steps: [
      'Enter your Day, Month, and Year of birth.',
      'Set your Target Retirement Age (between 18 and 100; defaults to 65).',
      'Click "Calculate Retirement" to view remaining years, months, days, weeks, and progress percentage.',
    ],
    formula:
      'RetirementDate = BirthdayInYear(BirthYear + TargetAge); RemainingDays = round((RetirementDate − Today) / 86,400,000).',
    examples: [
      {
        scenario: 'Birth date: August 15, 1998 · Target Retirement Age: 65',
        calculation: '1998 + 65 = 2063 -> Target date August 15, 2063.',
        result: 'Exact remaining years, months, and days until August 15, 2063.',
      },
      {
        scenario: 'Early retirement goal: Born June 10, 1990 · Target Age: 55',
        calculation: '1990 + 55 = 2045 -> Target date June 10, 2045.',
        result: 'Countdown to June 10, 2045 with completion progress bar.',
      },
    ],
    faqs: [
      {
        question: 'Does this calculator estimate pension payouts or investment returns?',
        answer:
          'No. It is purely a calendar and timeline calculator showing the exact time remaining until a chosen milestone age.',
      },
      {
        question: 'What if I have already passed my target retirement age?',
        answer:
          'The calculator indicates that you have already reached the target age, displays the exact date it occurred, and sets progress to 100%.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-in-different-years',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/million-seconds-calculator': {
    introduction:
      'A single year contains over 31.5 million seconds, meaning most adults pass 1 billion seconds shortly before turning 32. The Million Seconds Calculator tracks your live second count and predicts the exact date of your next 50M, 100M, or 1 Billion second milestone.',
    howToCalculate:
      'Seconds lived are derived from the exact millisecond difference between local midnight on your birth date and your current local clock, divided by 1,000 and rendered in millions.',
    steps: [
      'Enter your Date of Birth.',
      'Click "Calculate Seconds" to start the live million-second counter.',
      'Check the date of your next major 50M/100M second milestone and your 1 Billion Seconds anniversary.',
    ],
    formula:
      'MillionsLived = floor((NowTimestamp − BirthMidnightTimestamp) / 1000) / 1,000,000; 1BillionDate = BirthMidnight + 10^9 seconds.',
    examples: [
      {
        scenario: '1 Billion Seconds landmark',
        calculation: '1,000,000,000 seconds ÷ 86,400 seconds/day = 11,574.074 days (~31.69 years).',
        result: 'Occurs roughly 251 days after your 31st birthday.',
      },
      {
        scenario: '500 Million Seconds landmark',
        calculation: '500,000,000 ÷ 86,400 = 5,787.037 days (~15.84 years).',
        result: 'Occurs around age 15 years and 10 months.',
      },
    ],
    faqs: [
      {
        question: 'Why does 1 billion seconds happen around age 31.7?',
        answer:
          'Because one common year has 31,536,000 seconds (31,622,400 in a leap year), 1,000,000,000 seconds equals approximately 31 years, 8 months, and 8 days.',
      },
      {
        question: 'Does the counter assume midnight as my birth time?',
        answer:
          'Yes. When no exact birth hour is specified, midnight (00:00 local time) on your birth date is used as the clean standard reference.',
      },
    ],
    relatedBlogSlugs: [
      'how-many-seconds-are-in-a-year',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/life-report': {
    introduction:
      'My Life Report brings together your exact chronological age, birth weekday, lived days, weeks, hours, minutes, next birthday, Western zodiac sign, and 80-year benchmark into one clean, exportable PNG summary card.',
    howToCalculate:
      'Every number on the Life Report card is computed simultaneously in your browser from your birth date using local calendar math, then drawn at 1200×1480px resolution onto an HTML5 Canvas so only the card itself is saved.',
    steps: [
      'Optionally enter your name to personalize the card header.',
      'Input your Day, Month, and Year of birth and click "Generate Report".',
      'Click "Download as PNG" to save the standalone report card image, or use Share / Copy Report.',
    ],
    formula:
      'Combines CalendarAge(DOB), Weekday(DOB), CumulativeTotals(DOB), WesternZodiac(DOB), and IllustrativeBenchmark(Elapsed / 80 Years).',
    examples: [
      {
        scenario: 'Generating a birthday keepsake card',
        calculation:
          'Enter your birth date once to populate exact lived totals, next birthday countdown, and zodiac sign.',
        result: 'Clean 1200×1480px PNG card matching your current Light or Dark theme.',
      },
      {
        scenario: 'Mobile PNG export',
        calculation:
          'Canvas rendering avoids fragile DOM screenshot bugs and generates a sharp PNG blob directly on mobile or desktop.',
        result: 'Instant file download without uploading any data.',
      },
    ],
    faqs: [
      {
        question: 'Does "Download as PNG" capture the rest of the website?',
        answer:
          'No. Ageora draws only the dedicated Life Report card onto an offscreen high-resolution canvas, so headers, footers, and other page sections are never included in your image.',
      },
      {
        question: 'Is my name or birth date uploaded when I generate the card?',
        answer:
          'Never. Both the report calculation and PNG image creation happen 100% inside your own browser.',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-exact-age',
      'how-many-days-have-i-been-alive',
      'what-is-my-zodiac-sign',
    ],
  },
};

export const CALCULATOR_SEO_CONTENT_BN: Partial<Record<KnownRoute, CalculatorSeoGuideData>> = {
  '/age-calculator': {
    introduction:
      'সঠিক বয়স নির্ণয় মানে শুধু মোট দিনকে ৩৬৫ দিয়ে ভাগ করা নয়। যেহেতু প্রতিটি মাস ২৮ থেকে ৩১ দিনের হয় এবং অধিবর্ষে (লিপ ইয়ার) ফেব্রুয়ারিতে ২৯ দিন থাকে, তাই স্থানীয় টাইমজোন ও আসল ক্যালেন্ডার বিয়োগ পদ্ধতি অনুসরণ করলে বছর, মাস, দিন এবং প্রতি সেকেন্ডের নিখুঁত হিসাব পাওয়া যায়।',
    howToCalculate:
      'বর্তমান বছর, মাস ও দিনের সাথে আপনার জন্মসাল, মাস ও দিন তুলনা করে ক্যালেন্ডার বয়স হিসাব করা হয়। বর্তমান দিন জন্মদিনের চেয়ে ছোট হলে গড় ৩০ দিন না ধরে ঠিক আগের ক্যালেন্ডার মাসের প্রকৃত দিনসংখ্যা ধার নেওয়া হয়।',
    steps: [
      'উপরের ইনপুট বক্সে আপনার জন্মের দিন, মাস এবং বছর লিখুন।',
      '"বয়স হিসাব করুন" বাটনে ক্লিক করে গ্রেগরিয়ান ক্যালেন্ডার অনুযায়ী তারিখ যাচাই করুন।',
      'বছর, মাস, দিনসহ সপ্তাহ, ঘণ্টা, মিনিট ও লাইভ সেকেন্ডের মোট হিসাব দেখুন।',
      'নিচে স্ক্রল করে আপনার পরবর্তী জন্মদিন এবং জীবনের পরিসংখ্যান বেঞ্চমার্ক দেখুন।',
    ],
    formula:
      'বছর = বর্তমান বছর − জন্মসাল (বর্তমান মাস/দিন জন্মতারিখের আগে হলে ১ বিয়োগ); দিন ধার নেওয়ার ক্ষেত্রে = পূর্ববর্তী মাসের দিন − min(জন্মদিন, পূর্ববর্তী মাসের দিন) + বর্তমান দিন।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮ · হিসাবের তারিখ: ১৩ নভেম্বর ২০২৬',
        calculation:
          '২০২৬ − ১৯৯৮ = ২৮ বছর। ১৫ আগস্ট থেকে ১৫ অক্টোবর ২ পূর্ণ মাস; ১৫ অক্টোবর থেকে ১৩ নভেম্বর ২৯ দিন।',
        result: '২৮ বছর, ২ মাস এবং ২৯ দিন (মোট ১০,৩১৭ দিন)।',
      },
      {
        scenario: 'মাসের শেষ তারিখ: ৩১ জানুয়ারি ২০০০ · হিসাবের তারিখ: ১ মার্চ ২০০১',
        calculation:
          '৩১ জানু ২০০০ থেকে ৩১ জানু ২০০১ পর্যন্ত ১ বছর; ২৮ ফেব্রু ২০০১ পর্যন্ত ১ মাস এবং ১ মার্চ পর্যন্ত আরও ১ দিন।',
        result: '১ বছর, ১ মাস এবং ১ দিন।',
      },
    ],
    faqs: [
      {
        question: 'এজিওরা কেন মোট সময়কে ৩০.৪৩৭৫ দিয়ে ভাগ করে মাস বের করে না?',
        answer:
          'গড় দিন দিয়ে ভাগ করলে ২৮ দিনের ফেব্রুয়ারি ও ৩১ দিনের মাসের কারণে ১–২ দিনের ভুল দেখা দেয়। এজিওরা প্রকৃত ক্যালেন্ডার মাস ধরে হিসাব করে, যাতে আপনার জন্মদিনেই বয়স সঠিকভাবে পরিবর্তিত হয়।',
      },
      {
        question: 'ভবিষ্যতের কোনো তারিখ দিলে কী হবে?',
        answer:
          'ক্যালকুলেটর আপনার ডিভাইসের বর্তমান তারিখের সাথে যাচাই করে ভবিষ্যতের জন্মতারিখ দিলে স্পষ্ট ত্রুটি বার্তা দেখাবে।',
      },
      {
        question: 'হৃদস্পন্দন ও শ্বাসপ্রশ্বাসের সংখ্যা কি মেডিকেল পরিমাপ?',
        answer:
          'না। এগুলো বিশ্রামকালীন সাধারণ গড় (প্রতি মিনিটে ৭২ বার হৃদস্পন্দন এবং ১৬ বার শ্বাস) ও আপনার মোট মিনিটের ভিত্তিতে আনুমানিক হিসাব।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-exact-age',
      'how-many-days-have-i-been-alive',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/birthday-countdown': {
    introduction:
      'জন্মদিন কাউন্টডাউন আপনার স্থানীয় সময়ের বর্তমান সেকেন্ড থেকে আসন্ন জন্মদিনের রাত ১২:০০টা পর্যন্ত সময়ের ব্যবধানকে দিন, ঘণ্টা, মিনিট ও সেকেন্ডে রূপান্তর করে।',
    howToCalculate:
      'প্রথমে ক্যালকুলেটর চলতি বছরে আপনার জন্মমাস ও দিন খুঁজে বের করে। সেই তারিখ ইতোমধ্যে পার হয়ে গেলে (অথবা আজই হলে) পরের বছরের একই তারিখকে লক্ষ্য ধরে বর্তমান স্থানীয় সময় বিয়োগ করা হয়।',
    steps: [
      'আপনার জন্মের দিন, মাস এবং বছর নির্বাচন করুন।',
      '"কাউন্টডাউন শুরু করুন" বাটনে ক্লিক করে পরবর্তী জন্মদিন নির্ধারণ করুন।',
      'লাইভ দিন, ঘণ্টা, মিনিট ও সেকেন্ডের টিকটিক কাউন্টার দেখুন।',
      'ভবিষ্যতের গুরুত্বপূর্ণ জন্মদিনগুলো কোন বারে পড়বে তা মাইলফলক তালিকা থেকে দেখুন।',
    ],
    formula:
      'বাকি সেকেন্ড = floor((পরবর্তী জন্মদিন মধ্যরাতের টাইমস্ট্যাম্প − বর্তমান স্থানীয় টাইমস্ট্যাম্প) / ১০০০)।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১ ডিসেম্বর ১৯৯৫ · বর্তমান সময়: ১৩ নভেম্বর ২০২৬ দুপুর ১২:০০',
        calculation:
          'পরবর্তী জন্মদিন ১ ডিসেম্বর ২০২৬ রাত ০০:০০। ব্যবধান ১৭ পূর্ণ দিন এবং ১২ ঘণ্টা।',
        result: '১৭ দিন, ১২ ঘণ্টা, ০০ মিনিট, ০০ সেকেন্ড (৩১ বছরে পদার্পণ)।',
      },
      {
        scenario: 'অধিবর্ষের জন্ম: ২৯ ফেব্রুয়ারি ২০০০ · ২০২৬ সাল (সাধারণ বছর)',
        calculation:
          '২০২৬ সালে ফেব্রুয়ারি ২৮ দিনে শেষ হওয়ায় এজিওরা সাধারণ বছরে ১ মার্চ ২০২৬ তারিখে জন্মদিন হিসাব করে।',
        result: 'পরবর্তী বার্ষিক জন্মদিন ১ মার্চে পালিত হবে।',
      },
    ],
    faqs: [
      {
        question: 'আমার আসল জন্মদিনের দিন কাউন্টডাউনে কী দেখাবে?',
        answer:
          'জন্মদিনের দিন টুলটি আপনার বর্তমান বয়সসহ শুভ জন্মদিন শুভেচ্ছা দেখাবে এবং পরের বছরের জন্মদিনের কাউন্টডাউন শুরু করবে।',
      },
      {
        question: '২৯ ফেব্রুয়ারিতে জন্ম হলে সাধারণ বছরে কীভাবে হিসাব হয়?',
        answer:
          'অধিবর্ষ ছাড়া অন্যান্য বছরে ১ মার্চকে পরবর্তী জন্মদিন হিসেবে ধরা হয় এবং একটি স্পষ্ট ব্যাখ্যাও দেখানো হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-next-birthday',
      'how-does-a-leap-year-affect-age-calculation',
      'how-many-seconds-are-in-a-year',
    ],
  },

  '/next-birthday': {
    introduction:
      'জন্মদিন আসতে কত দিন বাকি তা জানার পাশাপাশি পরবর্তী জন্মদিন ক্যালকুলেটর আপনাকে দেখাবে আপনার আগামী জন্মদিন সপ্তাহের কোন বারে পড়ছে, আপনি কত বছরে পা দেবেন এবং ৩০, ৪০, ৫০-এর মতো মাইলফলক জন্মদিনের তারিখ।',
    howToCalculate:
      'প্রতিটি ৩৬৫ দিনের সাধারণ বছরে ৫২ সপ্তাহ + ১ দিন থাকে। তাই প্রতি সাধারণ বছরে আপনার জন্মদিন ১ বার সামনে এগোয় এবং মাঝে ২৯ ফেব্রুয়ারি থাকলে ২ বার এগিয়ে যায়।',
    steps: [
      'আপনার জন্মের দিন, মাস ও বছর লিখুন।',
      '"পরবর্তী জন্মদিন খুঁজুন" বাটনে ক্লিক করুন।',
      'আসন্ন জন্মদিনের তারিখ, বার এবং বাকি মাস ও দিন দেখে নিন।',
      'নিচে আসন্ন মাইলফলক জন্মদিনের তালিকা দেখুন।',
    ],
    formula:
      'আসন্ন বয়স = পরবর্তী জন্মদিন বছর − জন্মসাল; বার সূচক = (জন্মবারের সূচক + মোট অতিবাহিত দিন) mod ৭।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ৪ জুলাই ১৯৯৬ · হিসাবের তারিখ: ১৩ নভেম্বর ২০২৬',
        calculation: '২০২৬ সালের ৪ জুলাই পার হয়েছে, তাই পরবর্তী জন্মদিন ৪ জুলাই ২০২৭ (রবিবার)।',
        result: 'রবিবার, ৪ জুলাই ২০২৭ (৩১তম জন্মদিন)।',
      },
      {
        scenario: 'মাইলফলক পরীক্ষা: ১৫ আগস্ট ১৯৯৮ জন্মের ৪০তম জন্মদিন',
        calculation: '১৯৯৮ + ৪০ = ২০৩৮; ১৫ আগস্ট ২০৩৮ রবিবার পড়বে।',
        result: '৪০তম জন্মদিন রবিবার, ১৫ আগস্ট ২০৩৮।',
      },
    ],
    faqs: [
      {
        question: 'প্রতি বছর আমার জন্মদিন আলাদা বারে পড়ে কেন?',
        answer:
          'কারণ ৩৬৫ সংখ্যাটি ৭ দিয়ে বিভাজ্য নয় (৩৬৫ = ৫২ × ৭ + ১)। তাই প্রতি সাধারণ বছরে জন্মদিন ১ দিন এবং অধিবর্ষ পেরোলে ২ দিন পরের বারে চলে যায়।',
      },
      {
        question: 'কোন কোন মাইলফলক বয়স স্বয়ংক্রিয়ভাবে দেখানো হয়?',
        answer:
          '১৮, ২১, ২৫, ৩০, ৪০, ৫০, ৬০, ৭৫ এবং ১০০ বছর বয়সের মধ্য থেকে আপনার আসন্ন ৬টি মাইলফলক দেখানো হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-next-birthday',
      'how-to-find-your-day-of-birth',
      'how-to-calculate-age-in-different-years',
    ],
  },

  '/age-difference-calculator': {
    introduction:
      'ভাই-বোন, জীবনসঙ্গী, বন্ধু বা দুইজন পরিচিত মানুষের বয়সের সঠিক ব্যবধান বের করতে আগের জন্মতারিখ ও পরের জন্মতারিখের মধ্যে প্রকৃত ক্যালেন্ডার বিয়োগ প্রয়োজন, যাতে প্রতিটি লিপ ইয়ার ও ৩১ দিনের মাস সঠিকভাবে গণনা হয়।',
    howToCalculate:
      'ক্যালকুলেটর প্রথমে দুইটি জন্মতারিখকে সময়ানুক্রমে সাজায়—আগের তারিখকে শুরু এবং পরের তারিখকে শেষ ধরে বছর, মাস, দিন ও মোট দিনের ব্যবধান নির্ণয় করে।',
    steps: [
      'চাইলে দুইজনের নাম লিখুন যাতে রিপোর্ট কার্ড আরও ব্যক্তিগত হয়।',
      'প্রথম ব্যক্তি ও দ্বিতীয় ব্যক্তির জন্মের দিন, মাস ও বছর দিন।',
      '"বয়সের পার্থক্য হিসাব করুন" বাটনে ক্লিক করে বছর, মাস, সপ্তাহ ও মোট দিনের ব্যবধান দেখুন।',
      'শেয়ার করতে পিএনজি কার্ড ডাউনলোড করুন বা টেক্সট কপি করুন।',
    ],
    formula:
      'পূর্বের তারিখ = min(DOB1, DOB2); পরের তারিখ = max(DOB1, DOB2); মোট দিন = round((পরের তারিখ − পূর্বের তারিখ) / ৮৬,৪০০,০০০ মি.সে.)।',
    examples: [
      {
        scenario: 'ব্যক্তি ১: ১২ এপ্রিল ১৯৯৫ · ব্যক্তি ২: ২৫ সেপ্টেম্বর ১৯৯৮',
        calculation:
          '১২ এপ্রি ১৯৯৫ থেকে ১২ এপ্রি ১৯৯৮ = ৩ বছর; ১২ সেপ্টে পর্যন্ত ৫ মাস; ২৫ সেপ্টে পর্যন্ত ১৩ দিন।',
        result: '৩ বছর, ৫ মাস এবং ১৩ দিন (মোট ১,২৬২ দিন)।',
      },
      {
        scenario: 'একই বছরের ব্যবধান: ১ ফেব্রুয়ারি ২০০৪ · ১ অক্টোবর ২০০৪ (অধিবর্ষ)',
        calculation: '২০০৪ সালের ফেব্রুয়ারিতে ২৯ দিন থাকায় মোট দিনসংখ্যায় ১ দিন বেশি যোগ হয়।',
        result: '০ বছর, ৮ মাস, ০ দিন (মোট ২৪৩ দিন)।',
      },
    ],
    faqs: [
      {
        question: 'দুইজনের জন্মতারিখ কোন ক্রমে দিচ্ছি তা কি গুরুত্বপূর্ণ?',
        answer:
          'না। ক্যালকুলেটর স্বয়ংক্রিয়ভাবে আগের ও পরের জন্মতারিখ শনাক্ত করে সবসময় সঠিক ও ধনাত্মক ব্যবধান দেখায়।',
      },
      {
        question: 'একই বছর ব্যবধান হওয়া সত্ত্বেও কখনো মোট দিন ১ দিন কম-বেশি হয় কেন?',
        answer:
          '৪ বছরের ব্যবধানে সাধারণত ১টি অধিবর্ষ (১,৪৬১ দিন) থাকে, তবে ১৯০০ সালের মতো শতাব্দী বছর লিপ ইয়ার না হওয়ায় সেখানে ০টি অধিবর্ষ (১,৪৬০ দিন) হতে পারে।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-difference-between-two-people',
      'how-to-calculate-your-exact-age',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/who-is-older': {
    introduction:
      'দুইজনের মধ্যে কে আগে জন্মেছেন—এই মজার বিতর্কের সমাধান এখন কয়েক সেকেন্ডেই সম্ভব। এমনকি একই মাস বা একই সপ্তাহে জন্ম হলেও ঠিক কত দিনের ব্যবধান তা নিখুঁতভাবে জানা যায়।',
    howToCalculate:
      'দুইটি জন্মতারিখের স্থানীয় টাইমস্ট্যাম্প তুলনা করা হয়। যার জন্মতারিখ আগে তিনিই বড় এবং দুই তারিখের মধ্যবর্তী ব্যবধান দিন, সপ্তাহ, মাস ও বছরে প্রদর্শিত হয়।',
    steps: [
      'চাইলে উভয় ব্যক্তির নাম লিখুন।',
      'দুইজনের জন্মের দিন, মাস ও বছর পূরণ করুন।',
      '"কে বড় তুলনা করুন" বাটনে ক্লিক করে ফলাফল দেখুন।',
    ],
    formula:
      'বড় ব্যক্তি = DOB1 < DOB2 ? ব্যক্তি ১ : (DOB2 < DOB1 ? ব্যক্তি ২ : একই দিন); দিনের ব্যবধান = abs(DOB1 − DOB2) / ৮৬,৪০০,০০০।',
    examples: [
      {
        scenario: 'আরিফ: ৩ মার্চ ২০০১ · সামি: ১৯ মার্চ ২০০১',
        calculation: 'উভয়েই ২০০১ সালের মার্চে জন্মেছেন; ৩ মার্চ ১৯ মার্চের চেয়ে ১৬ দিন আগে।',
        result: 'আরিফ ১৬ দিনের বড় (২ সপ্তাহ ও ২ দিন)।',
      },
      {
        scenario: 'যমজ বা একই দিন: ১০ মে ২০০২ · ১০ মে ২০০২',
        calculation: 'উভয় ক্যালেন্ডার তারিখ সম্পূর্ণ এক।',
        result: 'ঠিক একই দিনে জন্ম (০ দিনের ব্যবধান)।',
      },
    ],
    faqs: [
      {
        question: 'দুইজনের জন্মতারিখ একদম একই হলে কী দেখাবে?',
        answer:
          'টুলটি সাথে সাথেই জানিয়ে দেবে যে উভয়েই ঠিক একই দিনে জন্মগ্রহণ করেছেন এবং বয়সের পার্থক্য ০ দিন।',
      },
      {
        question: 'আমি যে নাম লিখছি তা কি কোথাও সংরক্ষণ করা হয়?',
        answer:
          'না। সব হিসাব আপনার ব্রাউজারের মেমোরিতেই থাকে এবং পেজ রিলোড বা বন্ধ করলে মুছে যায়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-difference-between-two-people',
      'how-to-find-your-day-of-birth',
    ],
  },

  '/friendship-calculator': {
    introduction:
      'দীর্ঘদিনের বন্ধুত্বে কখন যে হাজার হাজার দিন পেরিয়ে যায় তা বোঝাই যায় না। বন্ধুত্ব ক্যালকুলেটর আপনার বন্ধু হওয়ার প্রথম দিন থেকে আজ পর্যন্ত সঠিক সময়কাল এবং আসন্ন ১,০০০ দিনের মাইলফলক হিসাব করে।',
    howToCalculate:
      'বন্ধুত্ব শুরুর তারিখ থেকে আজকের স্থানীয় তারিখ পর্যন্ত পূর্ণ ক্যালেন্ডার বিয়োগ করে বছর, মাস, দিন ও মোট অতিবাহিত দিন বের করা হয়।',
    steps: [
      'চাইলে দুই বন্ধুর নাম লিখুন।',
      'যে দিন, মাস ও বছরে বন্ধুত্ব শুরু হয়েছিল তা দিন।',
      '"সময়কাল হিসাব করুন" বাটনে ক্লিক করে মোট দিন, সপ্তাহ, ঘণ্টা ও আসন্ন মাইলফলক দেখুন।',
    ],
    formula:
      'একসাথে দিন = floor((আজকের মধ্যরাত − শুরুর মধ্যরাত) / ৮৬,৪০০,০০০); পরবর্তী মাইলফলক = একসাথে দিনের পরবর্তী মাইলফলক সংখ্যা।',
    examples: [
      {
        scenario: 'বন্ধুত্ব শুরু: ১ সেপ্টেম্বর ২০১৯ · বর্তমান তারিখ: ১৩ নভেম্বর ২০২৬',
        calculation: '১ সেপ্টে ২০১৯ থেকে ১ সেপ্টে ২০২৬ = ৭ বছর; নভে ১ পর্যন্ত ২ মাস; নভে ১৩ পর্যন্ত ১২ দিন।',
        result: '৭ বছর, ২ মাস এবং ১২ দিন (মোট ২,৬৩০ দিন)।',
      },
      {
        scenario: '২,৬৩০ দিনের পর পরবর্তী মাইলফলক',
        calculation: '২,০০০-এর পরের স্ট্যান্ডার্ড মাইলফলক হলো ৩,০০০ দিন।',
        result: '৩,০০০ দিনের মাইলফলক আসতে ৩৭০ দিন বাকি।',
      },
    ],
    faqs: [
      {
        question: 'শুধু মাস আর বছর মনে থাকলে কী করব?',
        answer:
          'আপনি সেই মাসের ১ তারিখ ধরে হিসাব শুরু করতে পারেন, এতে বছর ও মাসের আনুমানিক সুন্দর হিসাব পাওয়া যাবে।',
      },
      {
        question: 'কোন কোন দিনের মাইলফলক হিসাব করা হয়?',
        answer:
          '১০০, ২৫০, ৫০০, ১,০০০, ১,৫০০, ২,০০০, ৩,০০০, ৫,০০০, ৭,৫০০, ১০,০০০ এবং তার পর প্রতি ৫,০০০ দিনের মাইলফলক দেখানো হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-friendship-duration',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/love-duration-calculator': {
    introduction:
      'সম্পর্কের প্রথম ১০০ দিন হোক বা ১০ম বার্ষিকী—প্রতিটি মাইলফলকই বিশেষ। ভালোবাসা সময়কাল ক্যালকুলেটর আপনার সম্পর্ক শুরুর তারিখকে বছর, মাস, দিন, ঘণ্টা এবং পরবর্তী বার্ষিকীর কাউন্টডাউনে রূপান্তর করে।',
    howToCalculate:
      'সম্পর্ক শুরুর তারিখ থেকে আজকের স্থানীয় তারিখ ক্যালেন্ডার নিয়মে বিয়োগ করা হয়, যাতে প্রতি মাসের ও বছরের নির্দিষ্ট তারিখে বার্ষিকী মিলে যায়।',
    steps: [
      'চাইলে উভয় সঙ্গীর নাম লিখুন।',
      'সম্পর্ক শুরুর দিন, মাস ও বছর নির্বাচন করুন।',
      '"সময়কাল হিসাব করুন" বাটনে ক্লিক করে মোট দিন, পরবর্তী বার্ষিকী ও মাইলফলক দেখুন।',
    ],
    formula:
      'সময়কাল = CalendarDiff(শুরুর তারিখ, আজ); পরবর্তী বার্ষিকী = NextAnnualOccurrence(শুরুর মাস, শুরুর দিন)।',
    examples: [
      {
        scenario: 'সম্পর্ক শুরু: ১৪ ফেব্রুয়ারি ২০২১ · বর্তমান তারিখ: ১৩ নভেম্বর ২০২৬',
        calculation: '১৪ ফেব্রু ২০২১ থেকে ১৪ ফেব্রু ২০২৬ = ৫ বছর; ১৪ অক্টো পর্যন্ত ৮ মাস; ১৩ নভে পর্যন্ত ৩০ দিন।',
        result: '৫ বছর, ৮ মাস এবং ৩০ দিন (একসাথে ২,০৯৮ দিন)।',
      },
      {
        scenario: '১৩ নভেম্বর ২০২৬ থেকে পরবর্তী বার্ষিকী',
        calculation: 'পরবর্তী ১৪ ফেব্রুয়ারি পড়বে ১৪ ফেব্রুয়ারি ২০২৭ তারিখে।',
        result: 'পরবর্তী বার্ষিকীর ৯৩ দিন বাকি।',
      },
    ],
    faqs: [
      {
        question: 'আমাদের বার্ষিকী ২৯ ফেব্রুয়ারি হলে কী হবে?',
        answer:
          'অধিবর্ষ ছাড়া অন্যান্য বছরে বার্ষিকীর কাউন্টডাউন ১ মার্চে সমন্বয় করা হয় যাতে প্রতি বছর হিসাব ঠিক থাকে।',
      },
      {
        question: 'আমি কি আমাদের সম্পর্কের কার্ড সেভ বা শেয়ার করতে পারব?',
        answer:
          'হ্যাঁ। ফলাফলের নিচে থাকা শেয়ার বার থেকে টেক্সট কপি, হোয়াটসঅ্যাপ/ফেসবুকে শেয়ার অথবা পিএনজি কার্ড ডাউনলোড করতে পারবেন।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-friendship-duration',
      'how-to-calculate-your-next-birthday',
    ],
  },

  '/zodiac-calculator': {
    introduction:
      'ওয়েস্টার্ন জ্যোতিষশাস্ত্র সূর্যের বার্ষিক আপাত পথকে বারোটি ৩০-ডিগ্রি রাশিতে ভাগ করে। জন্মমাস ও দিনের ভিত্তিতে এই টুল আপনার সূর্য রাশি, উপাদান, অধিপতি গ্রহ এবং চারিত্রিক বৈশিষ্ট্য নির্ণয় করে।',
    howToCalculate:
      'ওয়েস্টার্ন সূর্য রাশি শুধুমাত্র জন্মমাস ও দিনের ওপর নির্ভর করে (যেমন ২১ মার্চ থেকে ১৯ এপ্রিল পর্যন্ত মেষ রাশি)। এজিওরা বারোটি রাশির নির্ভুল তারিখ সীমা যাচাই করে।',
    steps: [
      'আপনার জন্মের দিন, মাস ও বছর লিখুন।',
      '"রাশি জানুন" বাটনে ক্লিক করে আপনার ওয়েস্টার্ন রাশি বের করুন।',
      'আপনার রাশির উপাদান (অগ্নি, পৃথিবী, বায়ু, জল), অধিপতি গ্রহ ও মূল বৈশিষ্ট্য পড়ুন।',
    ],
    formula:
      'রাশি = ১২টি ওয়েস্টার্ন ট্রপিক্যাল রাশিচক্রের তারিখ সীমার মধ্যে (জন্মমাস, জন্মদিন) মিলিয়ে দেখা।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮',
        calculation: '১৫ আগস্ট তারিখটি ২৩ জুলাই – ২২ আগস্ট সীমার মধ্যে পড়ে।',
        result: 'সিংহ রাশি (অগ্নি উপাদান, ফিক্সড মোডালিটি, অধিপতি সূর্য)।',
      },
      {
        scenario: 'সীমানা পরীক্ষা: ২০ মার্চ বনাম ২১ মার্চ',
        calculation: '২০ মার্চ মীন রাশির শেষ দিন (১৯ ফেব্রু – ২০ মার্চ); ২১ মার্চ মেষ রাশির শুরু।',
        result: '২০ মার্চ মীন রাশি; ২১ মার্চ মেষ রাশি।',
      },
    ],
    faqs: [
      {
        question: '১৯ থেকে ২৩ তারিখের মধ্যে জন্মানো ব্যক্তিদের "কাস্প" বলা হয় কেন?',
        answer:
          'সূর্য এক রাশি থেকে অন্য রাশিতে প্রবেশ করার সঠিক সময় প্রতি বছর কয়েক ঘণ্টা এগোতে বা পেছাতে পারে। সাধারণ তারিখ ক্যালকুলেটর প্রচলিত মূল তারিখ সীমা ব্যবহার করে।',
      },
      {
        question: 'এই টুল কি চন্দ্র রাশি বা লগ্ন নির্ণয় করে?',
        answer:
          'না। চন্দ্র রাশি বা লগ্ন বের করতে জন্মের সঠিক সময় ও স্থানের অক্ষাংশ-দ্রাঘিমাংশ প্রয়োজন; এই টুল জন্মতারিখ অনুযায়ী ওয়েস্টার্ন সূর্য রাশি জানায়।',
      },
    ],
    relatedBlogSlugs: [
      'what-is-my-zodiac-sign',
      'how-to-find-your-day-of-birth',
    ],
  },

  '/day-born-calculator': {
    introduction:
      'আপনি কি শান্ত রবিবারের সকালে জন্মেছিলেন নাকি ব্যস্ত শুক্রবারে? জন্মবার ক্যালকুলেটর ১৯০০ সাল থেকে আজ পর্যন্ত যেকোনো জন্মতারিখের সঠিক বার, বছরের কততম দিন, সপ্তাহ নম্বর ও অধিবর্ষের তথ্য বের করে।',
    howToCalculate:
      'ব্রাউজারের গ্রেগরিয়ান ক্যালেন্ডার ইঞ্জিন আপনার যাচাইকৃত তারিখকে ০ থেকে ৬ পর্যন্ত বার সূচকে (রবিবার থেকে শনিবার) রূপান্তর করে এবং ১ জানুয়ারি থেকে অতিবাহিত দিন গণনা করে।',
    steps: [
      'আপনার জন্মের দিন, মাস ও বছর লিখুন।',
      '"জন্মবার জানুন" বাটনে ক্লিক করুন।',
      'আপনি কোন বারে জন্মেছিলেন, লিপ ইয়ার ছিল কি না এবং বছরের কততম সপ্তাহ ছিল তা দেখুন।',
    ],
    formula:
      'বছরের দিন = floor((জন্মতারিখ − জন্মসালের ১ জানুয়ারি) / ৮৬,৪০০,০০০) + ১।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮',
        calculation: '১৯৯৮ সাধারণ বছর ছিল এবং ১৫ আগস্ট ছিল বছরের ২২৭তম দিন।',
        result: 'শনিবারে জন্ম (১৯৯৮ সালের ৩৩তম সপ্তাহ)।',
      },
      {
        scenario: 'জন্মতারিখ: ২৯ ফেব্রুয়ারি ২০০০',
        calculation: '২০০০ সংখ্যাটি ৪০০ দিয়ে বিভাজ্য হওয়ায় এটি অধিবর্ষ; ২৯ ফেব্রুয়ারি ৬০তম দিন।',
        result: 'মঙ্গলবারে জন্ম (অধিবর্ষ)।',
      },
    ],
    faqs: [
      {
        question: '১৯০০ সালের শুরুর দিকের তারিখের জন্যও কি এটি সঠিক?',
        answer:
          'হ্যাঁ। ১৯০০ সালে লিপ ইয়ার না হওয়া এবং ২০০০ সালে লিপ ইয়ার হওয়ার গ্রেগরিয়ান নিয়মসহ ১৯০০ সাল থেকে সম্পূর্ণ নির্ভুলভাবে কাজ করে।',
      },
      {
        question: '"বছরের কততম দিন" কীভাবে গণনা করা হয়?',
        answer:
          '১ জানুয়ারিকে ১ম দিন ধরা হয় এবং ৩১ ডিসেম্বর সাধারণ বছরে ৩৬৫তম বা অধিবর্ষে ৩৬৬তম দিন হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-find-your-day-of-birth',
      'how-does-a-leap-year-affect-age-calculation',
    ],
  },

  '/future-age-calculator': {
    introduction:
      '২০২৭, ২০৩০, ২০৪০, ২০৫০ বা ভবিষ্যতের কোনো দীর্ঘমেয়াদী পরিকল্পনার জন্য সেই বছরগুলোর ১ জানুয়ারিতে এবং আপনার জন্মদিনে বয়স কত হবে তা আগেভাগেই জানা খুবই কার্যকর।',
    howToCalculate:
      'প্রতিটি লক্ষ্য বছরে আপনার জন্মদিনের বয়স হলো লক্ষ্য বছর − জন্মসাল, এবং ১ জানুয়ারির সঠিক বয়স ক্যালেন্ডার বিয়োগের মাধ্যমে বের করা হয়।',
    steps: [
      'আপনার জন্মতারিখ লিখুন।',
      'প্রিসেট ২০২৭, ২০৩০, ২০৪০, ২০৫০-এর পাশাপাশি চাইলে যেকোনো কাস্টম বছর (২২০০ পর্যন্ত) লিখুন।',
      '"ভবিষ্যৎ বয়স হিসাব করুন" বাটনে ক্লিক করে প্রতিটি বছরের ফলাফল দেখুন।',
    ],
    formula:
      'জন্মদিনে বয়স = লক্ষ্য বছর − জন্মসাল; ভবিষ্যৎ জন্মদিন বার = বার(লক্ষ্য বছর, জন্মমাস, জন্মদিন)।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮ · লক্ষ্য বছর: ২০৩০',
        calculation: '২০৩০ − ১৯৯৮ = ৩২ (১৫ আগস্ট ২০৩০); ১ জানুয়ারি ২০৩০ তারিখে ৩১ বছর ৪ মাস ১৭ দিন।',
        result: 'বৃহস্পতিবার, ১৫ আগস্ট ২০৩০ তারিখে ৩২ বছর পূর্ণ হবে।',
      },
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮ · লক্ষ্য বছর: ২০৫০',
        calculation: '২০৫০ − ১৯৯৮ = ৫২ (১৫ আগস্ট ২০৫০)।',
        result: 'সোমবার, ১৫ আগস্ট ২০৫০ তারিখে ৫২ বছর পূর্ণ হবে।',
      },
    ],
    faqs: [
      {
        question: 'কার্ডে জন্মদিনের বয়স ও ১ জানুয়ারির বয়স—দুটোই দেখানো হয় কেন?',
        answer:
          'অনেক আর্থিক ও সরকারি হিসাবে ১ জানুয়ারিকে ভিত্তি ধরে বয়স দেখা হয়, আবার ব্যক্তিগত মাইলফলক আপনার জন্মদিনেই পূর্ণ হয়।',
      },
      {
        question: 'আমি কি ২০৭৫ বা ২১০০ সালের বয়সও দেখতে পারব?',
        answer:
          'হ্যাঁ। কাস্টম বছর ঘরে ২২০০ সাল পর্যন্ত যেকোনো বছর লিখে ফলাফল দেখতে পারবেন।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-in-different-years',
      'how-to-calculate-your-exact-age',
    ],
  },

  '/retirement-calculator': {
    introduction:
      'অবসরের দিনগুলো দিন ও সপ্তাহে দেখতে পেলে দীর্ঘমেয়াদী পরিকল্পনা আরও বাস্তবসম্মত হয়। আপনার জন্মতারিখ ও কাঙ্ক্ষিত অবসরের বয়স দিলে এই টুল অবসরের তারিখ ও অগ্রগতির শতাংশ দেখায়।',
    howToCalculate:
      'জন্মসালের সাথে কাঙ্ক্ষিত অবসরের বয়স যোগ করে অবসরের লক্ষ্য তারিখ তৈরি করা হয় (২৯ ফেব্রুয়ারি জন্ম হলে সাধারণ বছরে ১ মার্চ ধরা হয়) এবং আজ থেকে বাকি সময় হিসাব করা হয়।',
    steps: [
      'আপনার জন্মের দিন, মাস ও বছর দিন।',
      'লক্ষ্য অবসরের বয়স নির্ধারণ করুন (১৮ থেকে ১০০; ডিফল্ট ৬৫)।',
      '"অবসর হিসাব করুন" বাটনে ক্লিক করে বাকি বছর, মাস, দিন, সপ্তাহ ও অগ্রগতির বার দেখুন।',
    ],
    formula:
      'অবসরের তারিখ = জন্মদিন(জন্মসাল + লক্ষ্য বয়স); বাকি দিন = round((অবসরের তারিখ − আজ) / ৮৬,৪০০,০০০)।',
    examples: [
      {
        scenario: 'জন্মতারিখ: ১৫ আগস্ট ১৯৯৮ · লক্ষ্য অবসর বয়স: ৬৫',
        calculation: '১৯৯৮ + ৬৫ = ২০৬৩ -> লক্ষ্য তারিখ ১৫ আগস্ট ২০৬৩।',
        result: '১৫ আগস্ট ২০৬৩ পর্যন্ত বাকি সঠিক বছর, মাস ও দিন।',
      },
      {
        scenario: 'দ্রুত অবসর পরিকল্পনা: জন্ম ১০ জুন ১৯৯০ · লক্ষ্য বয়স: ৫৫',
        calculation: '১৯৯০ + ৫৫ = ২০৪৫ -> লক্ষ্য তারিখ ১০ জুন ২০৪৫।',
        result: '১০ জুন ২০৪৫ পর্যন্ত কাউন্টডাউন ও প্রগ্রেস বার।',
      },
    ],
    faqs: [
      {
        question: 'এই টুল কি পেনশনের টাকা বা বিনিয়োগের রিটার্ন হিসাব করে?',
        answer:
          'না। এটি সম্পূর্ণভাবে একটি ক্যালেন্ডার ও সময়-গণনা টুল, যা নির্দিষ্ট অবসর বয়সে পৌঁছাতে বাকি সময় দেখায়।',
      },
      {
        question: 'আমার অবসরের লক্ষ্য বয়স ইতোমধ্যে পার হয়ে গেলে কী দেখাবে?',
        answer:
          'ক্যালকুলেটর জানিয়ে দেবে যে আপনি ইতোমধ্যে লক্ষ্য বয়স অতিক্রম করেছেন, তারিখ দেখাবে এবং অগ্রগতি ১০০% দেখাবে।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-age-in-different-years',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/million-seconds-calculator': {
    introduction:
      'একটি বছরেই সাড়ে ৩ কোটির বেশি সেকেন্ড থাকে—অর্থাৎ বেশিরভাগ মানুষ ৩২ বছর বয়সের আগেই ১ বিলিয়ন (১০০ কোটি) সেকেন্ড অতিক্রম করেন। এই ক্যালকুলেটর আপনার লাইভ সেকেন্ড গণনা করে এবং পরবর্তী ৫০ মিলিয়ন, ১০০ মিলিয়ন ও ১ বিলিয়ন সেকেন্ডের তারিখ জানায়।',
    howToCalculate:
      'জন্মতারিখের মধ্যরাত থেকে আপনার ডিভাইসের বর্তমান সময়ের মিলিসেকেন্ড পার্থক্যকে ১,০০০ দিয়ে ভাগ করে মোট সেকেন্ড ও মিলিয়নে রূপান্তর করা হয়।',
    steps: [
      'আপনার জন্মতারিখ লিখুন।',
      '"সেকেন্ড হিসাব করুন" বাটনে ক্লিক করে লাইভ কাউন্টার চালু করুন।',
      'আপনার পরবর্তী ৫০M/১০০M সেকেন্ড ও ১ বিলিয়ন সেকেন্ড পূর্ণ হওয়ার তারিখ দেখুন।',
    ],
    formula:
      'মিলিয়ন সেকেন্ড = floor((বর্তমান সময় − জন্ম মধ্যরাত) / ১০০০) / ১,০০০,০০০; ১ বিলিয়ন তারিখ = জন্ম মধ্যরাত + ১০^৯ সেকেন্ড।',
    examples: [
      {
        scenario: '১ বিলিয়ন সেকেন্ড মাইলফলক',
        calculation: '১,০০০,০০০,০০০ সেকেন্ড ÷ ৮৬,৪০০ সেকেন্ড/দিন = ১১,৫৭৪.০৭৪ দিন (~৩১.৬৯ বছর)।',
        result: 'আপনার ৩১তম জন্মদিনের প্রায় ২৫১ দিন পর এটি ঘটে।',
      },
      {
        scenario: '৫০০ মিলিয়ন সেকেন্ড মাইলফলক',
        calculation: '৫০০,০০০,০০০ ÷ ৮৬,৪০০ = ৫,৭৮৭.০৩৭ দিন (~১৫.৮৪ বছর)।',
        result: 'প্রায় ১৫ বছর ১০ মাস বয়সে এটি পূর্ণ হয়।',
      },
    ],
    faqs: [
      {
        question: 'প্রায় ৩১.৭ বছর বয়সে ১ বিলিয়ন সেকেন্ড পূর্ণ হয় কেন?',
        answer:
          'এক সাধারণ বছরে ৩১,৫৩৬,০০০ সেকেন্ড থাকে (লিপ ইয়ারে ৩১,৬২২,৪০০ সেকেন্ড)। তাই ১,০০০,০০০,০০০ সেকেন্ড সমান প্রায় ৩১ বছর ৮ মাস ৮ দিন।',
      },
      {
        question: 'কাউন্টার কি জন্মদিন রাত ১২:০০টা ধরে হিসাব করে?',
        answer:
          'হ্যাঁ। জন্মের নির্দিষ্ট ঘণ্টা উল্লেখ না থাকলে জন্মদিনের স্থানীয় মধ্যরাত (০০:০০) কে মানক ভিত্তি ধরা হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-many-seconds-are-in-a-year',
      'how-many-days-have-i-been-alive',
    ],
  },

  '/life-report': {
    introduction:
      'মাই লাইফ রিপোর্ট আপনার সঠিক বয়স, জন্মবার, অতিবাহিত দিন, সপ্তাহ, ঘণ্টা, মিনিট, পরবর্তী জন্মদিন, ওয়েস্টার্ন রাশি এবং ৮০ বছরের বেঞ্চমার্ককে একত্রে একটি সুন্দর ডাউনলোডযোগ্য পিএনজি কার্ডে রূপান্তর করে।',
    howToCalculate:
      'রিপোর্টের প্রতিটি সংখ্যা আপনার ব্রাউজারেই স্থানীয় ক্যালেন্ডার গণিত দিয়ে হিসাব হয় এবং ১২০০×১৪৮০ পিক্সেলের HTML5 ক্যানভাসে আঁকা হয়, যাতে শুধুমাত্র কার্ডটিই সেভ হয়।',
    steps: [
      'চাইলে কার্ডের শিরোনামের জন্য আপনার নাম লিখুন।',
      'আপনার জন্মের দিন, মাস ও বছর দিয়ে "রিপোর্ট তৈরি করুন" বাটনে ক্লিক করুন।',
      '"পিএনজি হিসেবে ডাউনলোড" বাটনে ক্লিক করে কার্ডটি সেভ করুন অথবা শেয়ার/কপি করুন।',
    ],
    formula:
      'ক্যালেন্ডার বয়স + জন্মবার + মোট অতিবাহিত সময় + ওয়েস্টার্ন রাশি + (অতিবাহিত সময় / ৮০ বছর)।',
    examples: [
      {
        scenario: 'জন্মদিনের স্মৃতি কার্ড তৈরি',
        calculation: 'একবার জন্মতারিখ দিলেই মোট দিন, সপ্তাহ, জন্মদিন ও রাশিসহ কার্ড তৈরি হয়।',
        result: 'লাইট বা ডার্ক থিম অনুযায়ী ঝকঝকে ১২০০×১৪৮০px পিএনজি কার্ড।',
      },
      {
        scenario: 'মোবাইলে পিএনজি এক্সপোর্ট',
        calculation: 'কোনো সার্ভার আপলোড ছাড়াই সরাসরি ব্রাউজারে দ্রুত পিএনজি ফাইল তৈরি হয়।',
        result: 'তাৎক্ষণিক ডাউনলোড, সম্পূর্ণ গোপন ও নিরাপদ।',
      },
    ],
    faqs: [
      {
        question: '"পিএনজি হিসেবে ডাউনলোড" করলে কি পুরো ওয়েবসাইটের স্ক্রিনশট হয়?',
        answer:
          'না। এজিওরা আলাদা অফস্ক্রিন ক্যানভাসে শুধুমাত্র আপনার লাইফ রিপোর্ট কার্ডটি আঁকে—হেডার, ফুটার বা অন্য কোনো অংশ ছবিতে আসে না।',
      },
      {
        question: 'কার্ড তৈরির সময় কি আমার নাম বা জন্মতারিখ সার্ভারে পাঠানো হয়?',
        answer:
          'কখনোই না। হিসাব থেকে শুরু করে ছবি তৈরি—সবকিছুই আপনার ব্রাউজারের ভেতরেই সম্পন্ন হয়।',
      },
    ],
    relatedBlogSlugs: [
      'how-to-calculate-your-exact-age',
      'how-many-days-have-i-been-alive',
      'what-is-my-zodiac-sign',
    ],
  },
};

export function getCalculatorSeoGuide(
  route: KnownRoute,
  lang: Language
): CalculatorSeoGuideData | undefined {
  return lang === 'bn'
    ? CALCULATOR_SEO_CONTENT_BN[route] ?? CALCULATOR_SEO_CONTENT[route]
    : CALCULATOR_SEO_CONTENT[route];
}
