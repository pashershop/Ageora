import { Language } from '../i18n/types';
import { BlogArticleSlug, KnownRoute } from '../utils/seo';

export interface BlogArticle {
  slug: BlogArticleSlug;
  route: `/blog/${BlogArticleSlug}`;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
  examples: {
    title: string;
    detail: string;
  }[];
  relatedCalculators: {
    label: string;
    route: KnownRoute;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'how-to-calculate-your-exact-age',
    route: '/blog/how-to-calculate-your-exact-age',
    title: 'How to Calculate Your Exact Age?',
    category: 'Calendar Math',
    readingTime: '4 min read',
    summary:
      'Learn how exact chronological age is calculated in years, months, and days without month-length drift.',
    introduction:
      'Most people know their age in whole years immediately, yet finding the exact combination of years, months, and days on any given date often produces off-by-one or off-by-two errors when calculated with rough averages. The Gregorian calendar contains 28-day, 29-day, 30-day, and 31-day months, meaning exact age relies on calendar borrowing rather than simple division.',
    sections: [
      {
        heading: 'Why Millisecond Division Produces Errors',
        paragraphs: [
          'A quick shortcut often used in basic scripts is dividing total elapsed days by 365.25 for years and 30.4375 for months. While close over long horizons, this approach frequently reports 0 days when a birthday is actually tomorrow, or jumps a month early in February.',
          'True chronological age aligns directly with calendar anniversaries: a full year completes only when the current month and day reach your birth month and day, and a full month completes on the matching day number of each month.',
        ],
      },
      {
        heading: 'The Calendar Subtraction Method',
        paragraphs: [
          'Write down the target date (Year, Month, Day) above your birth date (Year, Month, Day). Start with the Days column: if the target day is greater than or equal to your birth day, subtract directly.',
          'If the target day is smaller, borrow the exact number of days from the month immediately preceding the target month (28 or 29 for February, 30 for April/June/September/November, 31 for the rest), reduce the target month by 1, and clamp your birth day if the borrowed month has fewer days (such as January 31 moving into February).',
        ],
      },
    ],
    examples: [
      {
        title: 'Standard Date: Born May 10, 1995 on November 13, 2026',
        detail:
          'Years: 2026 − 1995 = 31. Months: November (11) − May (5) = 6. Days: 13 − 10 = 3. Exact age: 31 years, 6 months, and 3 days.',
      },
      {
        title: 'Borrowing Across Months: Born March 25, 2000 on June 10, 2026',
        detail:
          'Years: 26. Days: 10 − 25 requires borrowing May’s 31 days -> (31 − 25) + 10 = 16 days, while Months decreases from 3 to 2. Exact age: 26 years, 2 months, and 16 days.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Exact Age Calculator',
        route: '/age-calculator',
        description: 'Compute your years, months, days, and live seconds instantly.',
      },
      {
        label: 'My Life Report',
        route: '/life-report',
        description: 'Turn your exact age and stats into a downloadable PNG summary card.',
      },
    ],
    faqs: [
      {
        question: 'Does time of day affect my calendar age?',
        answer:
          'Standard legal and everyday age calculations count calendar dates from midnight in your local timezone, though live second counters measure exact elapsed seconds since 00:00 on your birth date.',
      },
      {
        question: 'How does Ageora handle months with 31 days when borrowing?',
        answer:
          'Ageora checks the exact number of days in the preceding calendar month in the target year rather than assuming 30 days.',
      },
    ],
  },
  {
    slug: 'how-many-days-have-i-been-alive',
    route: '/blog/how-many-days-have-i-been-alive',
    title: 'How Many Days Have I Been Alive?',
    category: 'Life Milestones',
    readingTime: '4 min read',
    summary:
      'See how total days lived are counted across common years and leap years, plus when people hit 10,000 days.',
    introduction:
      'Knowing your age in days puts time in a fresh perspective. Someone turning 27 has already experienced nearly 10,000 sunrises, while a 55-year-old has crossed 20,000 days. Because leap years add an extra day roughly every four years, multiplying your age by 365 alone will fall short by several days.',
    sections: [
      {
        heading: 'Counting Days Across Common and Leap Years',
        paragraphs: [
          'Every common calendar year contributes 365 days, and every leap year where February 29 falls between your birth date and today contributes 366 days.',
          'To count manually, sum the remaining days in your birth year after your birthday, add 365 for each full common year in between, add 366 for each full leap year in between, and add the days elapsed in the current year.',
        ],
      },
      {
        heading: 'Popular Day-Count Milestones',
        paragraphs: [
          'The 10,000-day milestone occurs at roughly 27 years and 4.5 months—an increasingly popular milestone to celebrate alongside traditional decade birthdays.',
          '20,000 days arrives around age 54 years and 9 months, and 25,000 days arrives near age 68 years and 5 months.',
        ],
      },
    ],
    examples: [
      {
        title: '10,000 Days Benchmark',
        detail:
          '10,000 days ÷ 365.2425 days/year ≈ 27.38 years, or 27 years, 4 months, and roughly 17 days depending on leap years.',
      },
      {
        title: 'Checking Leap Days in a 20-Year Span',
        detail:
          'Between 2005 and 2025, leap days occurred in 2008, 2012, 2016, 2020, and 2024 (5 extra days), giving 20 × 365 + 5 = 7,305 days.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Age Calculator',
        route: '/age-calculator',
        description: 'View your exact total days, weeks, hours, and minutes lived.',
      },
      {
        label: 'Million Seconds Calculator',
        route: '/million-seconds-calculator',
        description: 'Convert your days lived into live millions of seconds.',
      },
    ],
    faqs: [
      {
        question: 'Why does my Day Count change at local midnight?',
        answer:
          'A full calendar day completes every 24 hours at 00:00 in your local timezone, incrementing your Days Lived total by 1.',
      },
      {
        question: 'Can I share my total days lived on social media?',
        answer:
          'Yes. You can use My Life Report to generate a PNG card showcasing your exact Days Lived, Weeks Lived, and Hours Lived.',
      },
    ],
  },
  {
    slug: 'how-to-calculate-age-difference-between-two-people',
    route: '/blog/how-to-calculate-age-difference-between-two-people',
    title: 'How to Calculate Age Difference Between Two People?',
    category: 'Relationships',
    readingTime: '4 min read',
    summary:
      'Step-by-step rules for comparing two birth dates to find the exact difference in years, months, and days.',
    introduction:
      'Comparing two people’s ages requires subtracting the earlier birth date from the later birth date. Simply subtracting birth years ignores the months and days within the year—for example, someone born in December 1999 and someone born in January 2000 are only one month apart despite having birth years in different decades.',
    sections: [
      {
        heading: 'Ordering Two Dates Chronologically',
        paragraphs: [
          'Always identify the earlier date first. That earlier date serves as the starting point (representing the older individual), and the later date serves as the ending point.',
          'Once ordered, apply standard calendar subtraction: calculate years, months, and days from the earlier date to the later date, and separately compute the exact number of 24-hour calendar days between them.',
        ],
      },
      {
        heading: 'Calendar Difference vs. Total Days',
        paragraphs: [
          'Two pairs of birthdays can share the exact same year-month-day gap (such as 2 years, 0 months, 0 days) yet differ by 1 in their total day count if one pair spans a leap year containing February 29 and the other does not.',
        ],
      },
    ],
    examples: [
      {
        title: 'Decade Boundary: December 20, 1999 vs. January 15, 2000',
        detail:
          'Despite the year difference of 1, the actual gap is 0 years, 0 months, and 26 days.',
      },
      {
        title: 'Multi-Year Gap: April 12, 1995 vs. September 25, 1998',
        detail:
          'From Apr 12, 1995 to Apr 12, 1998 is 3 years; Apr 12 to Sep 12 is 5 months; Sep 12 to Sep 25 is 13 days -> 3 years, 5 months, 13 days (1,262 days).',
      },
    ],
    relatedCalculators: [
      {
        label: 'Age Difference Calculator',
        route: '/age-difference-calculator',
        description: 'Compare two birth dates in years, months, weeks, and total days.',
      },
      {
        label: 'Who Is Older?',
        route: '/who-is-older',
        description: 'See immediately who is older and by exactly how many days.',
      },
    ],
    faqs: [
      {
        question: 'How do you handle two people born in different timezones?',
        answer:
          'Standard age difference calculators compare calendar birth dates directly as recorded on official birth certificates without applying timezone offsets.',
      },
      {
        question: 'Can I compare any two dates, not just birthdays?',
        answer:
          'Yes. Any two valid calendar dates between 1900 and today can be compared using the Age Difference Calculator.',
      },
    ],
  },
  {
    slug: 'how-to-find-your-day-of-birth',
    route: '/blog/how-to-find-your-day-of-birth',
    title: 'How to Find Your Day of Birth?',
    category: 'Calendar Math',
    readingTime: '4 min read',
    summary:
      'Understand how calendar math determines the exact weekday of any birth date using Gregorian cycle rules.',
    introduction:
      'Unless someone in your family specifically remembered whether you were born on a Tuesday morning or a Friday night, you usually need a perpetual calendar or mathematical algorithm to verify your birth weekday. Fortunately, the Gregorian calendar repeats its weekday structure predictably over 400-year cycles.',
    sections: [
      {
        heading: 'How Weekday Formulas Work',
        paragraphs: [
          'Each common year of 365 days equals 52 full weeks plus 1 remainder day. That single remainder day means the same calendar date advances by one weekday every common year and by two weekdays whenever February 29 falls in between.',
          'Classical methods such as Zeller’s congruence and John Conway’s Doomsday algorithm rely on anchor dates (like 4/4, 6/6, 8/8, 10/10, and 12/12, which always share the same weekday in any given year) to determine any date’s weekday mentally in seconds.',
        ],
      },
      {
        heading: 'Why Century Leap Rules Matter',
        paragraphs: [
          'Years divisible by 100 (such as 1900) are not leap years unless also divisible by 400 (such as 2000). Any accurate weekday lookup from 1900 onward must account for 1900 being a common year while 2000 was a leap year.',
        ],
      },
    ],
    examples: [
      {
        title: 'Doomsday Anchor Check for 2026',
        detail:
          'In 2026, the Doomsday anchor weekday is Saturday (April 4, June 6, August 8, October 10, and December 12 are all Saturdays). Counting from August 8 (Saturday) to August 15 gives Saturday + 7 days = Saturday.',
      },
      {
        title: 'Same Date One Year Later',
        detail:
          'August 15, 2026 is a Saturday; because 2027 is not a leap year, August 15, 2027 shifts forward 1 weekday to Sunday.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Day Born Calculator',
        route: '/day-born-calculator',
        description: 'Look up your birth weekday, day of year, and week number instantly.',
      },
      {
        label: 'Next Birthday Calculator',
        route: '/next-birthday',
        description: 'See which weekday your upcoming birthdays will land on.',
      },
    ],
    faqs: [
      {
        question: 'When does a calendar repeat the exact same weekdays for every date?',
        answer:
          'Depending on leap-year alignment, a common year’s calendar typically repeats every 6 or 11 years, while a leap-year calendar repeats every 28 years (within the same century cycle).',
      },
      {
        question: 'Does the Day Born Calculator work for 1900–2026?',
        answer:
          'Yes. It accurately resolves every date from 1900 to the present using local Gregorian calendar rules.',
      },
    ],
  },
  {
    slug: 'what-is-my-zodiac-sign',
    route: '/blog/what-is-my-zodiac-sign',
    title: 'What Is My Zodiac Sign?',
    category: 'Zodiac & Culture',
    readingTime: '5 min read',
    summary:
      'A complete reference to Western zodiac sign date ranges, elements, modalities, and cusp boundary dates.',
    introduction:
      'Western astrology organizes the year into twelve 30-degree sectors along the ecliptic—the Sun’s apparent annual path across the sky. Each sector corresponds to a Sun sign spanning roughly 30 days, categorized into four classical elements (Fire, Earth, Air, Water) and three modalities (Cardinal, Fixed, Mutable).',
    sections: [
      {
        heading: 'The 12 Western Zodiac Signs and Dates',
        paragraphs: [
          'Aries (Mar 21 – Apr 19) · Taurus (Apr 20 – May 20) · Gemini (May 21 – Jun 20) · Cancer (Jun 21 – Jul 22) · Leo (Jul 23 – Aug 22) · Virgo (Aug 23 – Sep 22).',
          'Libra (Sep 23 – Oct 22) · Scorpio (Oct 23 – Nov 21) · Sagittarius (Nov 22 – Dec 21) · Capricorn (Dec 22 – Jan 19) · Aquarius (Jan 20 – Feb 18) · Pisces (Feb 19 – Mar 20).',
        ],
      },
      {
        heading: 'Elements, Modalities, and Cusp Dates',
        paragraphs: [
          'Fire signs (Aries, Leo, Sagittarius) and Air signs (Gemini, Libra, Aquarius) are paired alongside Earth signs (Taurus, Virgo, Capricorn) and Water signs (Cancer, Scorpio, Pisces).',
          'Because Earth’s orbit takes about 365.2422 days rather than exactly 365, the exact hour the Sun enters a new sign shifts slightly each year—which is why dates around the 19th through 23rd are commonly called cusp boundaries.',
        ],
      },
    ],
    examples: [
      {
        title: 'Boundary Example: November 21 vs. November 22',
        detail:
          'Under standard Western calendar boundaries, November 21 falls in Scorpio (Oct 23 – Nov 21), while November 22 begins Sagittarius (Nov 22 – Dec 21).',
      },
      {
        title: 'Mid-Sign Example: August 15',
        detail:
          'August 15 sits comfortably inside Leo (July 23 – August 22), a Fixed Fire sign ruled by the Sun.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Zodiac Calculator',
        route: '/zodiac-calculator',
        description: 'Look up your sign, element, ruling planet, and traits from your DOB.',
      },
      {
        label: 'My Life Report',
        route: '/life-report',
        description: 'Include your zodiac sign on your personalized PNG Life Report card.',
      },
    ],
    faqs: [
      {
        question: 'Is my Sun sign affected by my birth year?',
        answer:
          'Standard date-range calculators depend only on your birth month and day, though exact astronomical ephemerides on boundary days can vary by a few hours across leap cycles.',
      },
      {
        question: 'What is the difference between Western (Tropical) and Sidereal zodiac dates?',
        answer:
          'The Western tropical zodiac is anchored to the March equinox (Aries beginning around March 21), whereas sidereal systems align to background star constellations roughly 24 degrees shifted.',
      },
    ],
  },
  {
    slug: 'how-to-calculate-your-next-birthday',
    route: '/blog/how-to-calculate-your-next-birthday',
    title: 'How to Calculate Your Next Birthday?',
    category: 'Calendar Math',
    readingTime: '4 min read',
    summary:
      'Learn how next birthday countdowns compute remaining months, days, hours, and turning age.',
    introduction:
      'Calculating the countdown to your next birthday starts by deciding whether this year’s birthday is still ahead of you or has already passed. From there, counting the exact days and seconds depends on the lengths of each upcoming month and whether February 29 falls inside the countdown window.',
    sections: [
      {
        heading: 'Finding the Next Target Year',
        paragraphs: [
          'Compare today’s calendar month and day with your birth month and day. If your birthday is later in the year, your next birthday occurs in the current calendar year. If today is your birthday or your birthday already occurred earlier this year, the target moves to next year.',
        ],
      },
      {
        heading: 'Computing Months, Days, and Seconds Remaining',
        paragraphs: [
          'Once the target midnight is identified, total remaining days equal the exact calendar days between today and that date, while the live clock counts down the remaining hours, minutes, and seconds until 00:00 on your birthday.',
        ],
      },
    ],
    examples: [
      {
        title: 'Birthday Later This Year',
        detail:
          'On November 13, 2026, someone born December 1, 2000 has 18 calendar days remaining until turning 26 on Tuesday, December 1, 2026.',
      },
      {
        title: 'Birthday Earlier This Year',
        detail:
          'On November 13, 2026, someone born March 10, 2000 targets March 10, 2027 (turning 27), which is 117 days away.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Birthday Countdown',
        route: '/birthday-countdown',
        description: 'Watch a live second-by-second countdown to your next birthday.',
      },
      {
        label: 'Next Birthday Calculator',
        route: '/next-birthday',
        description: 'Preview your next birthday weekday and upcoming milestone ages.',
      },
    ],
    faqs: [
      {
        question: 'Why does a countdown sometimes show 365 days and other times 366 days?',
        answer:
          'If your birthday just passed and the upcoming 12-month span crosses February 29 of a leap year, the countdown starts at 366 days rather than 365.',
      },
    ],
  },
  {
    slug: 'how-many-seconds-are-in-a-year',
    route: '/blog/how-many-seconds-are-in-a-year',
    title: 'How Many Seconds Are in a Year?',
    category: 'Time & Units',
    readingTime: '3 min read',
    summary:
      'Exact breakdown of seconds in a 365-day common year, 366-day leap year, and mean Gregorian year.',
    introduction:
      'Time scales quickly when measured in seconds. A single minute contains 60 seconds, an hour holds 3,600, and a 24-hour day contains 86,400 seconds. Multiplying 86,400 by the length of the calendar year gives exact annual totals that vary slightly depending on whether the year is a leap year.',
    sections: [
      {
        heading: 'Common Year vs. Leap Year Seconds',
        paragraphs: [
          'In a standard 365-day common year: 365 × 24 × 60 × 60 = 31,536,000 seconds.',
          'In a 366-day leap year (with February 29): 366 × 24 × 60 × 60 = 31,622,400 seconds—an extra 86,400 seconds.',
          'Across the full 400-year Gregorian calendar cycle, the average year is 365.2425 days, which equals 31,556,952 seconds on average.',
        ],
      },
      {
        heading: 'What About 1 Billion Seconds?',
        paragraphs: [
          'Because each year holds roughly 31.55 million seconds, reaching 1,000,000,000 seconds takes approximately 31.69 years—meaning most people celebrate their 1 billion seconds milestone between their 31st and 32nd birthdays.',
        ],
      },
    ],
    examples: [
      {
        title: 'Quick Multiplication Check',
        detail:
          '1 day = 86,400 s · 1 week = 604,800 s · 30-day month = 2,592,000 s · 365-day year = 31,536,000 s.',
      },
      {
        title: '100 Million Seconds Milestone',
        detail:
          '100,000,000 ÷ 86,400 ≈ 1,157.4 days, which occurs right around 3 years and 2 months of age.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Million Seconds Calculator',
        route: '/million-seconds-calculator',
        description: 'See your exact millions of seconds lived and your 1B second date.',
      },
      {
        label: 'Age Calculator',
        route: '/age-calculator',
        description: 'Track your total seconds lived updating live every second.',
      },
    ],
    faqs: [
      {
        question: 'Do astronomical leap seconds change standard age calculations?',
        answer:
          'Leap seconds (occasional 1-second UTC adjustments for Earth’s rotation) are tracked by atomic timekeepers; standard calendar and JavaScript date calculations treat every day as 86,400 seconds.',
      },
    ],
  },
  {
    slug: 'how-does-a-leap-year-affect-age-calculation',
    route: '/blog/how-does-a-leap-year-affect-age-calculation',
    title: 'How Does a Leap Year Affect Age Calculation?',
    category: 'Calendar Math',
    readingTime: '4 min read',
    summary:
      'Learn how leap years work under Gregorian rules and how February 29 affects days lived and annual birthdays.',
    introduction:
      'Earth takes approximately 365.2422 days to orbit the Sun. Without adding an extra day nearly every four years, calendar seasons would gradually drift by roughly 24 days every century. Leap years keep our calendar aligned—and introduce fascinating nuances for age calculations.',
    sections: [
      {
        heading: 'The Three Leap Year Rules',
        paragraphs: [
          'A year is a leap year if it is divisible by 4—with one century exception: years divisible by 100 are NOT leap years unless they are also divisible by 400. That is why 2000 was a leap year, whereas 1900 was not and 2100 will not be.',
        ],
      },
      {
        heading: 'How Leap Years Change Days Lived and Feb 29 Birthdays',
        paragraphs: [
          'For everyone, each leap year passed adds 1 extra day to your Total Days Lived and shifts your upcoming birthday weekday forward by two days instead of one.',
          'For people born on February 29 (sometimes called leaplings), chronological age still increases every year—only the calendar date of February 29 appears every four years, so non-leap years are typically observed on either February 28 or March 1 depending on regional custom and legal jurisdiction.',
        ],
      },
    ],
    examples: [
      {
        title: 'Century Rule Example: 1900 vs. 2000',
        detail:
          '1900 ÷ 100 = 19, not divisible by 400 -> Common year (Feb 28). 2000 ÷ 400 = 5 -> Leap year (Feb 29).',
      },
      {
        title: 'Born Feb 29, 2000 on Feb 28, 2026',
        detail:
          'On February 28, 2026, a person born Feb 29, 2000 is 25 years, 11 months, and 30 days old; on March 1, 2026, they turn 26 years old.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Age Calculator',
        route: '/age-calculator',
        description: 'Calculate exact calendar age with full leap-year handling.',
      },
      {
        label: 'Day Born Calculator',
        route: '/day-born-calculator',
        description: 'Check whether your birth year was a leap year or common year.',
      },
    ],
    faqs: [
      {
        question: 'If I am born on February 29, am I really only a quarter of my age?',
        answer:
          'Chronological age counts full orbital years elapsed since birth, not the number of February 29 occurrences. A 24-year-old born on Feb 29 is still 24 years old chronologically.',
      },
    ],
  },
  {
    slug: 'how-to-calculate-friendship-duration',
    route: '/blog/how-to-calculate-friendship-duration',
    title: 'How to Calculate Friendship Duration?',
    category: 'Relationships',
    readingTime: '3 min read',
    summary:
      'Track exact friendship duration in years, months, days, and celebratory 1,000-day milestones.',
    introduction:
      'Friendships rarely come with an official contract, yet many close friends remember the exact first day of school, team practice, or trip where their friendship started. Measuring that span in calendar years, months, and total days turns a vague "we have been friends forever" into an exact timeline.',
    sections: [
      {
        heading: 'Choosing a Start Date',
        paragraphs: [
          'If you remember the exact day you met, enter it directly. If you only recall the month and year—such as September 2016 when university classes started—using the 1st of that month provides a clean, consistent anchor.',
        ],
      },
      {
        heading: 'Celebrating Day Milestones Alongside Anniversaries',
        paragraphs: [
          'While annual anniversaries mark years, day milestones like 1,000 days (~2.74 years), 2,500 days (~6.84 years), and 5,000 days (~13.69 years) offer memorable mid-year moments to celebrate.',
        ],
      },
    ],
    examples: [
      {
        title: '1,000 Days of Friendship',
        detail:
          'If you became friends on January 1, 2024, your 1,000th day of friendship occurs on September 27, 2026.',
      },
      {
        title: '10 Years of Friendship',
        detail:
          'Ten years spanning two leap years equals 3,652 days—nearly 87,648 hours of shared timeline.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Friendship Calculator',
        route: '/friendship-calculator',
        description: 'Calculate exact friendship years, months, days, and milestones.',
      },
      {
        label: 'Love Duration Calculator',
        route: '/love-duration-calculator',
        description: 'Track relationship duration and upcoming anniversary countdowns.',
      },
    ],
    faqs: [
      {
        question: 'Can I create a shareable PNG card of our friendship duration?',
        answer:
          'Yes. After calculating your friendship duration, click "Download Result Card" or share directly via WhatsApp or Copy Result.',
      },
    ],
  },
  {
    slug: 'how-to-calculate-age-in-different-years',
    route: '/blog/how-to-calculate-age-in-different-years',
    title: 'How to Calculate Age in Different Years?',
    category: 'Future Planning',
    readingTime: '4 min read',
    summary:
      'Learn how to calculate your exact age in 2027, 2030, 2040, 2050, or historical years depending on the reference date.',
    introduction:
      'When planning for retirement, milestone reunions, or checking how old you were during a historical event, you often need your age in a different calendar year. A common pitfall is forgetting that in any given year you actually hold two different whole-year ages: one before your birthday and one on or after your birthday.',
    sections: [
      {
        heading: 'Before Birthday vs. On or After Birthday',
        paragraphs: [
          'On your birthday in TargetYear, your age is simply TargetYear − BirthYear.',
          'Before your birthday in TargetYear (for instance, on January 1), your whole-year age is TargetYear − BirthYear − 1, plus the exact months and days elapsed since your previous birthday.',
        ],
      },
      {
        heading: 'Planning Multi-Decade Targets',
        paragraphs: [
          'Checking your age across 2027, 2030, 2040, and 2050 is particularly helpful when setting retirement target dates, passport renewals, or multi-year savings goals.',
        ],
      },
    ],
    examples: [
      {
        title: 'Born October 20, 1995 in Year 2040',
        detail:
          'On January 1, 2040, you are 44 years, 2 months, and 12 days old. On October 20, 2040, you turn 45.',
      },
      {
        title: 'Target Retirement Age Check',
        detail:
          'Someone born in 1998 aiming to retire at age 65 reaches that birthday in 1998 + 65 = 2063.',
      },
    ],
    relatedCalculators: [
      {
        label: 'Future Age Calculator',
        route: '/future-age-calculator',
        description: 'Preview your exact ages in 2027, 2030, 2040, 2050, or custom years.',
      },
      {
        label: 'Retirement Calculator',
        route: '/retirement-calculator',
        description: 'Calculate exact years, months, and days until your target retirement age.',
      },
    ],
    faqs: [
      {
        question: 'Can I check my age for any custom year beyond 2050?',
        answer:
          'Yes. The Future Age Calculator lets you enter any custom year up to 2200 alongside 2027, 2030, 2040, and 2050.',
      },
    ],
  },
];

export const BLOG_ARTICLES_BN: BlogArticle[] = [
  {
    slug: 'how-to-calculate-your-exact-age',
    route: '/blog/how-to-calculate-your-exact-age',
    title: 'কীভাবে আপনার সঠিক বয়স হিসাব করবেন?',
    category: 'ক্যালেন্ডার গণিত',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'মাসের দিনের তারতম্য ছাড়াই কীভাবে বছর, মাস ও দিনে নির্ভুল বয়স বের করা হয় তা জানুন।',
    introduction:
      'পূর্ণ বছরে নিজের বয়স প্রায় সবাই দ্রুত বলে দিতে পারেন, কিন্তু যেকোনো নির্দিষ্ট তারিখে বছর, মাস ও দিনের সঠিক সমন্বয় বের করতে গেলে গড় হিসাবের কারণে প্রায়ই ১–২ দিনের ভুল হয়। গ্রেগরিয়ান ক্যালেন্ডারে ২৮, ২৯, ৩০ ও ৩১ দিনের মাস থাকায় সঠিক বয়স নির্ণয়ের জন্য প্রকৃত ক্যালেন্ডার বিয়োগ পদ্ধতি প্রয়োজন।',
    sections: [
      {
        heading: 'গড় ভাগ করলে কেন ভুল হয়',
        paragraphs: [
          'অনেক সাধারণ প্রোগ্রামে মোট দিনকে ৩৬৫.২৫ দিয়ে ভাগ করে বছর এবং ৩০.৪৩৭৫ দিয়ে ভাগ করে মাস বের করা হয়। দীর্ঘ মেয়াদে এটি কাছাকাছি হলেও জন্মদিনের আগের দিনেই ০ দিন দেখানো বা ফেব্রুয়ারিতে এক মাস আগেই পরিবর্তন হওয়ার মতো ভুল তৈরি করে।',
          'প্রকৃত বয়স সবসময় ক্যালেন্ডারের নির্দিষ্ট তারিখের সাথে মিল রেখে এগোয়: বর্তমান মাস ও দিন জন্মতারিখে পৌঁছালেই কেবল এক পূর্ণ বছর বা মাস সম্পন্ন হয়।',
        ],
      },
      {
        heading: 'ক্যালেন্ডার বিয়োগ পদ্ধতি',
        paragraphs: [
          'উপরে লক্ষ্য তারিখ (বছর, মাস, দিন) এবং নিচে জন্মতারিখ (বছর, মাস, দিন) লিখুন। দিন কলাম থেকে শুরু করুন: বর্তমান দিন জন্মদিনের সমান বা বড় হলে সরাসরি বিয়োগ করুন।',
          'যদি বর্তমান দিন ছোট হয়, তবে লক্ষ্য মাসের ঠিক আগের মাসের প্রকৃত দিনসংখ্যা (ফেব্রুয়ারি ২৮/২৯, এপ্রিল/জুন/সেপ্টেম্বর/নভেম্বর ৩০ এবং বাকিগুলো ৩১) ধার নিন এবং মাস থেকে ১ কমিয়ে হিসাব করুন।',
        ],
      },
    ],
    examples: [
      {
        title: 'সাধারণ তারিখ: জন্ম ১০ মে ১৯৯৫, হিসাবের তারিখ ১৩ নভেম্বর ২০২৬',
        detail:
          'বছর: ২০২৬ − ১৯৯৫ = ৩১। মাস: নভেম্বর (১১) − মে (৫) = ৬। দিন: ১৩ − ১০ = ৩। সঠিক বয়স: ৩১ বছর, ৬ মাস ও ৩ দিন।',
      },
      {
        title: 'মাস ধার নেওয়া: জন্ম ২৫ মার্চ ২০০০, হিসাবের তারিখ ১০ জুন ২০২৬',
        detail:
          'বছর: ২৬। দিন: ১০ − ২৫ করতে মে মাসের ৩১ দিন ধার নিলে (৩১ − ২৫) + ১০ = ১৬ দিন এবং মাস ৩ থেকে কমে ২ হয়। সঠিক বয়স: ২৬ বছর, ২ মাস ও ১৬ দিন।',
      },
    ],
    relatedCalculators: [
      {
        label: 'সঠিক বয়স ক্যালকুলেটর',
        route: '/age-calculator',
        description: 'বছর, মাস, দিন ও লাইভ সেকেন্ড তাৎক্ষণিকভাবে হিসাব করুন।',
      },
      {
        label: 'মাই লাইফ রিপোর্ট',
        route: '/life-report',
        description: 'আপনার বয়স ও পরিসংখ্যান দিয়ে ডাউনলোডযোগ্য পিএনজি কার্ড তৈরি করুন।',
      },
    ],
    faqs: [
      {
        question: 'দিনের সময় কি ক্যালেন্ডার বয়সে প্রভাব ফেলে?',
        answer:
          'আইনি ও দৈনন্দিন বয়স হিসাব স্থানীয় মধ্যরাত অনুযায়ী তারিখ ধরে গণনা করা হয়, তবে লাইভ সেকেন্ড কাউন্টার জন্মদিনের রাত ০০:০০ থেকে মোট সেকেন্ড হিসাব করে।',
      },
      {
        question: 'এজিওরা ৩১ দিনের মাস কীভাবে সামলায়?',
        answer:
          'এজিওরা ৩০ দিন অনুমান না করে লক্ষ্য বছরের ঠিক আগের ক্যালেন্ডার মাসের প্রকৃত দিনসংখ্যা পরীক্ষা করে হিসাব করে।',
      },
    ],
  },
  {
    slug: 'how-many-days-have-i-been-alive',
    route: '/blog/how-many-days-have-i-been-alive',
    title: 'আমি এ পর্যন্ত কত দিন বেঁচে আছি?',
    category: 'জীবনের মাইলফলক',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'সাধারণ বছর ও অধিবর্ষসহ মোট অতিবাহিত দিন কীভাবে গণনা হয় এবং ১০,০০০ দিন কবে পূর্ণ হয় তা জানুন।',
    introduction:
      'নিজের বয়স দিনের হিসাবে দেখলে সময়ের অনুভূতিই বদলে যায়। ২৭ বছরে পা দেওয়া একজন মানুষ ইতোমধ্যেই প্রায় ১০,০০০ সূর্যোদয় দেখেছেন, আর ৫৫ বছর বয়সে ২০,০০০ দিন অতিক্রম হয়। প্রতি চার বছরে একটি লিপ ইয়ার যোগ হওয়ায় শুধু বয়সকে ৩৬৫ দিয়ে গুণ করলে আসল হিসাব মিলবে না।',
    sections: [
      {
        heading: 'সাধারণ বছর ও অধিবর্ষের দিন গণনা',
        paragraphs: [
          'প্রতিটি সাধারণ ক্যালেন্ডার বছর ৩৬৫ দিন যোগ করে, আর আপনার জন্মতারিখ থেকে আজকের মধ্যে আসা প্রতিটি অধিবর্ষের ২৯ ফেব্রুয়ারি ৩৬৬ দিন যোগ করে।',
          'হাতে গুনতে চাইলে জন্মসালের বাকি দিন, মধ্যবর্তী সাধারণ বছরগুলোর ৩৬৫ দিন, অধিবর্ষগুলোর ৩৬৬ দিন এবং চলতি বছরের অতিবাহিত দিন যোগ করতে হয়।',
        ],
      },
      {
        heading: 'জনপ্রিয় দিন-সংখ্যা মাইলফলক',
        paragraphs: [
          '১০,০০০ দিনের মাইলফলক আসে প্রায় ২৭ বছর ৪.৫ মাস বয়সে—যা জন্মদিনের পাশাপাশি উদযাপনের জন্য দারুণ একটি উপলক্ষ।',
          '২০,০০০ দিন আসে প্রায় ৫৪ বছর ৯ মাসে এবং ২৫,০০০ দিন আসে ৬৮ বছর ৫ মাসের কাছাকাছি।',
        ],
      },
    ],
    examples: [
      {
        title: '১০,০০০ দিনের বেঞ্চমার্ক',
        detail:
          '১০,০০০ দিন ÷ ৩৬৫.২৪২৫ দিন/বছর ≈ ২৭.৩৮ বছর, অর্থাৎ লিপ ইয়ারভেদে ২৭ বছর ৪ মাস ও প্রায় ১৭ দিন।',
      },
      {
        title: '২০ বছরের ব্যবধানে অধিবর্ষ পরীক্ষা',
        detail:
          '২০০৫ থেকে ২০২৫ সালের মধ্যে ২০০৮, ২০১২, ২০১৬, ২০২০ ও ২০২৪ সালে মোট ৫টি লিপ ডে এসেছে, ফলে ২০ × ৩৬৫ + ৫ = ৭,৩০৫ দিন।',
      },
    ],
    relatedCalculators: [
      {
        label: 'বয়স ক্যালকুলেটর',
        route: '/age-calculator',
        description: 'মোট অতিবাহিত দিন, সপ্তাহ, ঘণ্টা ও মিনিট দেখুন।',
      },
      {
        label: 'মিলিয়ন সেকেন্ড ক্যালকুলেটর',
        route: '/million-seconds-calculator',
        description: 'আপনার অতিবাহিত দিনকে লাইভ মিলিয়ন সেকেন্ডে দেখুন।',
      },
    ],
    faqs: [
      {
        question: 'আমার দিন সংখ্যা কি ঠিক রাত ১২টায় বাড়ে?',
        answer:
          'হ্যাঁ। স্থানীয় টাইমজোনে রাত ০০:০০টায় প্রতিটি ২৪ ঘণ্টার পূর্ণ দিন সম্পন্ন হলে মোট দিনের সংখ্যা ১ বাড়ে।',
      },
      {
        question: 'মোট অতিবাহিত দিন কি সোশ্যাল মিডিয়ায় শেয়ার করা যাবে?',
        answer:
          'অবশ্যই। মাই লাইফ রিপোর্ট ব্যবহার করে আপনার মোট দিন, সপ্তাহ ও ঘণ্টার পিএনজি কার্ড ডাউনলোড করতে পারবেন।',
      },
    ],
  },
  {
    slug: 'how-to-calculate-age-difference-between-two-people',
    route: '/blog/how-to-calculate-age-difference-between-two-people',
    title: 'দুইজনের বয়সের পার্থক্য কীভাবে হিসাব করবেন?',
    category: 'সম্পর্ক',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'দুইটি জন্মতারিখ তুলনা করে বছর, মাস ও দিনে নির্ভুল পার্থক্য বের করার ধাপে ধাপে নিয়ম।',
    introduction:
      'দুইজন মানুষের বয়সের ব্যবধান বের করতে আগের জন্মতারিখকে পরের জন্মতারিখ থেকে বিয়োগ করতে হয়। কেবল জন্মসাল বিয়োগ করলে মাস ও দিনের ব্যবধান বাদ পড়ে যায়—যেমন ১৯৯৯ সালের ডিসেম্বরে জন্ম ও ২০০০ সালের জানুয়ারিতে জন্ম নেওয়া দুইজনের বয়সের পার্থক্য আসলে মাত্র ১ মাস।',
    sections: [
      {
        heading: 'তারিখ দুটি সময়ানুক্রমে সাজানো',
        paragraphs: [
          'সবসময় আগের তারিখটিকে প্রথমে রাখুন। সেই তারিখটিই বড় ব্যক্তিকে নির্দেশ করে এবং পরের তারিখটি শেষ সীমা হিসেবে কাজ করে।',
          'তারপর স্বাভাবিক ক্যালেন্ডার বিয়োগ প্রয়োগ করে বছর, মাস, দিন এবং আলাদাভাবে মোট ২৪-ঘণ্টার দিনসংখ্যা বের করুন।',
        ],
      },
      {
        heading: 'ক্যালেন্ডার ব্যবধান বনাম মোট দিন',
        paragraphs: [
          'একই ২ বছর ০ মাস ০ দিন ব্যবধান হওয়া সত্ত্বেও দুটি জন্মতারিখ জোড়ার মোট দিনসংখ্যায় ১ দিনের তফাত হতে পারে, যদি একটির মধ্যে ২৯ ফেব্রুয়ারি পড়ে আর অন্যটিতে না পড়ে।',
        ],
      },
    ],
    examples: [
      {
        title: 'দশকের সীমানা: ২০ ডিসেম্বর ১৯৯৯ বনাম ১৫ জানুয়ারি ২০০০',
        detail: 'সাল আলাদা হলেও প্রকৃত ব্যবধান মাত্র ০ বছর, ০ মাস ও ২৬ দিন।',
      },
      {
        title: 'একাধিক বছরের ব্যবধান: ১২ এপ্রিল ১৯৯৫ বনাম ২৫ সেপ্টেম্বর ১৯৯৮',
        detail:
          '১২ এপ্রি ১৯৯৫ থেকে ১২ এপ্রি ১৯৯৮ = ৩ বছর; ১২ সেপ্টে পর্যন্ত ৫ মাস; ২৫ সেপ্টে পর্যন্ত ১৩ দিন -> ৩ বছর ৫ মাস ১৩ দিন (১,২৬২ দিন)।',
      },
    ],
    relatedCalculators: [
      {
        label: 'বয়সের পার্থক্য ক্যালকুলেটর',
        route: '/age-difference-calculator',
        description: 'বছর, মাস, সপ্তাহ ও মোট দিনে দুইটি জন্মতারিখ তুলনা করুন।',
      },
      {
        label: 'কে বড়?',
        route: '/who-is-older',
        description: 'মুহূর্তেই দেখুন কে বড় এবং ঠিক কত দিনের বড়।',
      },
    ],
    faqs: [
      {
        question: 'দুইজন আলাদা দেশে জন্মালে কীভাবে তুলনা করা হয়?',
        answer:
          'প্রচলিত বয়সের পার্থক্য ক্যালকুলেটর জন্মসনদে থাকা প্রকৃত ক্যালেন্ডার তারিখ সরাসরি তুলনা করে।',
      },
      {
        question: 'জন্মতারিখ ছাড়া অন্য যেকোনো দুটি তারিখ কি তুলনা করা যাবে?',
        answer:
          'হ্যাঁ। ১৯০০ সাল থেকে আজকের মধ্যে যেকোনো দুটি বৈধ তারিখের ব্যবধান হিসাব করা যায়।',
      },
    ],
  },
  {
    slug: 'how-to-find-your-day-of-birth',
    route: '/blog/how-to-find-your-day-of-birth',
    title: 'আপনার জন্মবার কীভাবে বের করবেন?',
    category: 'ক্যালেন্ডার গণিত',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'গ্রেগরিয়ান চক্রের নিয়ম ব্যবহার করে যেকোনো জন্মতারিখের সঠিক বার নির্ণয়ের কৌশল জানুন।',
    introduction:
      'পরিবারের কেউ যদি মনে করে না রাখেন যে আপনি মঙ্গলবার সকালে জন্মেছিলেন নাকি শুক্রবার রাতে, তবে সঠিক বার জানতে পারপেচুয়াল ক্যালেন্ডার বা গাণিতিক সূত্রের সাহায্য নিতে হয়। গ্রেগরিয়ান ক্যালেন্ডার প্রতি ৪০০ বছর পরপর একই বারের কাঠামো পুনরাবৃত্তি করে।',
    sections: [
      {
        heading: 'বার বের করার সূত্র কীভাবে কাজ করে',
        paragraphs: [
          'প্রতিটি ৩৬৫ দিনের সাধারণ বছরে ৫২ সপ্তাহ + ১ দিন অবশিষ্ট থাকে। তাই একই তারিখ প্রতি সাধারণ বছরে ১ বার এগিয়ে যায় এবং মাঝে ২৯ ফেব্রুয়ারি থাকলে ২ বার এগিয়ে যায়।',
          'জেলারের কনগ্রুয়েন্স বা জন কনওয়ের ডুমসডে অ্যালগরিদম কিছু নির্দিষ্ট অ্যাংকর তারিখ (যেমন ৪/৪, ৬/৬, ৮/৮, ১০/১০ ও ১২/১২—যা একই বছরে সবসময় একই বারে পড়ে) ব্যবহার করে কয়েক সেকেন্ডেই যেকোনো তারিখের বার বলে দেয়।',
        ],
      },
      {
        heading: 'শতাব্দী অধিবর্ষের নিয়ম কেন গুরুত্বপূর্ণ',
        paragraphs: [
          '১০০ দিয়ে বিভাজ্য বছর (যেমন ১৯০০) অধিবর্ষ নয়, যদি না তা ৪০০ দিয়েও বিভাজ্য হয় (যেমন ২০০০)। তাই ১৯০০ সাল থেকে নির্ভুল বার বের করতে ১৯০০-কে সাধারণ বছর ও ২০০০-কে অধিবর্ষ ধরতেই হবে।',
        ],
      },
    ],
    examples: [
      {
        title: '২০২৬ সালের ডুমসডে পরীক্ষা',
        detail:
          '২০২৬ সালে ৪ এপ্রিল, ৬ জুন, ৮ আগস্ট, ১০ অক্টোবর ও ১২ ডিসেম্বর—সবই শনিবার। ৮ আগস্ট শনিবার হলে ১৫ আগস্টও হবে শনিবার।',
      },
      {
        title: 'পরের বছর একই তারিখ',
        detail:
          '১৫ আগস্ট ২০২৬ শনিবার; ২০২৭ সাধারণ বছর হওয়ায় ১৫ আগস্ট ২০২৭ হবে ১ দিন এগিয়ে রবিবার।',
      },
    ],
    relatedCalculators: [
      {
        label: 'জন্মবার ক্যালকুলেটর',
        route: '/day-born-calculator',
        description: 'আপনার জন্মবার, বছরের দিন ও সপ্তাহ নম্বর দেখুন।',
      },
      {
        label: 'পরবর্তী জন্মদিন ক্যালকুলেটর',
        route: '/next-birthday',
        description: 'আপনার আসন্ন জন্মদিনগুলো কোন বারে পড়বে তা দেখুন।',
      },
    ],
    faqs: [
      {
        question: 'একটি ক্যালেন্ডারের সব তারিখ কত বছর পর ঠিক একই বারে ফিরে আসে?',
        answer:
          'লিপ ইয়ারের অবস্থানের ওপর ভিত্তি করে সাধারণ বছরের ক্যালেন্ডার সাধারণত ৬ বা ১১ বছর পর এবং লিপ ইয়ারের ক্যালেন্ডার ২৮ বছর পর হুবহু ফিরে আসে।',
      },
      {
        question: 'জন্মবার ক্যালকুলেটর কি ১৯০০–২০২৬ সব সালের জন্য কাজ করে?',
        answer:
          'হ্যাঁ। ১৯০০ সাল থেকে বর্তমান পর্যন্ত প্রতিটি তারিখের বার এটি নির্ভুলভাবে বের করে।',
      },
    ],
  },
  {
    slug: 'what-is-my-zodiac-sign',
    route: '/blog/what-is-my-zodiac-sign',
    title: 'আমার রাশি কী? কীভাবে জানব?',
    category: 'রাশিচক্র ও সংস্কৃতি',
    readingTime: '৫ মিনিট পড়া',
    summary:
      'ওয়েস্টার্ন রাশিচক্রের ১২টি রাশির তারিখ সীমা, উপাদান, মোডালিটি ও সীমানা তারিখের সম্পূর্ণ তালিকা।',
    introduction:
      'ওয়েস্টার্ন জ্যোতিষশাস্ত্রে সূর্যের বার্ষিক আপাত পথকে ৩০ ডিগ্রি করে ১২টি ভাগে ভাগ করা হয়। প্রতিটি ভাগ প্রায় ৩০ দিন জুড়ে বিস্তৃত একটি সূর্য রাশি, যা চারটি উপাদান (অগ্নি, পৃথিবী, বায়ু, জল) এবং তিনটি মোডালিটিতে (কার্ডিনাল, ফিক্সড, মিউটেবল) বিভক্ত।',
    sections: [
      {
        heading: '১২টি ওয়েস্টার্ন রাশি ও তারিখ সীমা',
        paragraphs: [
          'মেষ (২১ মার্চ – ১৯ এপ্রিল) · বৃষ (২০ এপ্রিল – ২০ মে) · মিথুন (২১ মে – ২০ জুন) · কর্কট (২১ জুন – ২২ জুলাই) · সিংহ (২৩ জুলাই – ২২ আগস্ট) · কন্যা (২৩ আগস্ট – ২২ সেপ্টেম্বর)।',
          'তুলা (২৩ সেপ্টেম্বর – ২২ অক্টোবর) · বৃশ্চিক (২৩ অক্টোবর – ২১ নভেম্বর) · ধনু (২২ নভেম্বর – ২১ ডিসেম্বর) · মকর (২২ ডিসেম্বর – ১৯ জানুয়ারি) · কুম্ভ (২০ জানুয়ারি – ১৮ ফেব্রুয়ারি) · মীন (১৯ ফেব্রুয়ারি – ২০ মার্চ)।',
        ],
      },
      {
        heading: 'উপাদান, মোডালিটি ও কাস্প তারিখ',
        paragraphs: [
          'অগ্নি রাশি (মেষ, সিংহ, ধনু) ও বায়ু রাশি (মিথুন, তুলা, কুম্ভ)-এর পাশাপাশি রয়েছে পৃথিবী রাশি (বৃষ, কন্যা, মকর) ও জল রাশি (কর্কট, বৃশ্চিক, মীন)।',
          'পৃথিবীর কক্ষপথে সূর্য পরিক্রমা প্রায় ৩৬৫.২৪২২ দিনের হওয়ায় সূর্য নতুন রাশিতে প্রবেশের সঠিক ঘণ্টা প্রতি বছর সামান্য বদলায়—তাই মাসের ১৯ থেকে ২৩ তারিখকে অনেক সময় কাস্প বলা হয়।',
        ],
      },
    ],
    examples: [
      {
        title: 'সীমানার উদাহরণ: ২১ নভেম্বর বনাম ২২ নভেম্বর',
        detail:
          'প্রচলিত ওয়েস্টার্ন তারিখ অনুযায়ী ২১ নভেম্বর বৃশ্চিক রাশি (২৩ অক্টো – ২১ নভে), আর ২২ নভেম্বর থেকে ধনু রাশি (২২ নভে – ২১ ডিসে) শুরু।',
      },
      {
        title: 'মাঝামাঝি তারিখ: ১৫ আগস্ট',
        detail:
          '১৫ আগস্ট সিংহ রাশির (২৩ জুলাই – ২২ আগস্ট) ভেতরে পড়ে—যার উপাদান অগ্নি এবং অধিপতি সূর্য।',
      },
    ],
    relatedCalculators: [
      {
        label: 'রাশি ক্যালকুলেটর',
        route: '/zodiac-calculator',
        description: 'জন্মতারিখ থেকে আপনার রাশি, উপাদান ও বৈশিষ্ট্য দেখুন।',
      },
      {
        label: 'মাই লাইফ রিপোর্ট',
        route: '/life-report',
        description: 'আপনার রাশিসহ ব্যক্তিগত পিএনজি লাইফ রিপোর্ট কার্ড তৈরি করুন।',
      },
    ],
    faqs: [
      {
        question: 'জন্মসাল কি আমার ওয়েস্টার্ন সূর্য রাশিতে প্রভাব ফেলে?',
        answer:
          'সাধারণ তারিখ ক্যালকুলেটরে শুধু জন্মমাস ও দিন দেখা হয়, তবে সীমানা তারিখে জন্ম হলে জ্যোতির্বৈজ্ঞানিক সময়ে কয়েক ঘণ্টার তারতম্য থাকতে পারে।',
      },
      {
        question: 'ওয়েস্টার্ন (ট্রপিক্যাল) ও সাইডেরিয়াল রাশির পার্থক্য কী?',
        answer:
          'ওয়েস্টার্ন ট্রপিক্যাল রাশিচক্র মার্চ বিষুবের (প্রায় ২১ মার্চ মেষ শুরু) ওপর ভিত্তি করে গঠিত, আর সাইডেরিয়াল পদ্ধতি আকাশের নক্ষত্রপুঞ্জের অবস্থানের সাথে প্রায় ২৪ ডিগ্রি পার্থক্যে হিসাব করে।',
      },
    ],
  },
  {
    slug: 'how-to-calculate-your-next-birthday',
    route: '/blog/how-to-calculate-your-next-birthday',
    title: 'পরবর্তী জন্মদিন কীভাবে হিসাব করবেন?',
    category: 'ক্যালেন্ডার গণিত',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'পরবর্তী জন্মদিনের বাকি মাস, দিন, ঘণ্টা ও আসন্ন বয়স কীভাবে গণনা করা হয় তা জানুন।',
    introduction:
      'আপনার পরবর্তী জন্মদিনের কাউন্টডাউন বের করার প্রথম ধাপ হলো—চলতি বছরে আপনার জন্মদিন এখনো বাকি আছে নাকি ইতোমধ্যে চলে গেছে তা দেখা। এরপর প্রতিটি আসন্ন মাসের দিনসংখ্যা ও মাঝে ২৯ ফেব্রুয়ারি আছে কি না তার ওপর ভিত্তি করে বাকি দিন ও সেকেন্ড গণনা করা হয়।',
    sections: [
      {
        heading: 'পরবর্তী লক্ষ্য বছর নির্ধারণ',
        paragraphs: [
          'আজকের মাস ও দিনের সাথে আপনার জন্মমাস ও দিন তুলনা করুন। জন্মদিন বছরের পরের দিকে হলে লক্ষ্য বছর হবে চলতি বছর। আজই জন্মদিন হলে বা জন্মদিন আগেই চলে গেলে লক্ষ্য চলে যাবে পরের বছরে।',
        ],
      },
      {
        heading: 'বাকি মাস, দিন ও সেকেন্ড গণনা',
        paragraphs: [
          'লক্ষ্য তারিখের মধ্যরাত নির্ধারিত হলে আজ থেকে সেই তারিখ পর্যন্ত ক্যালেন্ডার দিনই মোট বাকি দিন, আর লাইভ ঘড়ি রাত ০০:০০টা পর্যন্ত বাকি ঘণ্টা, মিনিট ও সেকেন্ড দেখায়।',
        ],
      },
    ],
    examples: [
      {
        title: 'চলতি বছরে জন্মদিন বাকি থাকলে',
        detail:
          '১৩ নভেম্বর ২০২৬ তারিখে ১ ডিসেম্বর ২০০০ জন্মের ব্যক্তির ২৬তম জন্মদিন আসতে ১৮ দিন বাকি।',
      },
      {
        title: 'চলতি বছরে জন্মদিন পার হয়ে গেলে',
        detail:
          '১৩ নভেম্বর ২০২৬ তারিখে ১০ মার্চ ২০০০ জন্মের ব্যক্তির পরবর্তী জন্মদিন ১০ মার্চ ২০২৭ (২৭ বছর), অর্থাৎ ১১৭ দিন বাকি।',
      },
    ],
    relatedCalculators: [
      {
        label: 'জন্মদিন কাউন্টডাউন',
        route: '/birthday-countdown',
        description: 'আপনার পরবর্তী জন্মদিনের লাইভ সেকেন্ড কাউন্টডাউন দেখুন।',
      },
      {
        label: 'পরবর্তী জন্মদিন ক্যালকুলেটর',
        route: '/next-birthday',
        description: 'আগামী জন্মদিনের বার ও মাইলফলক তালিকা দেখুন।',
      },
    ],
    faqs: [
      {
        question: 'কাউন্টডাউনে কখনো ৩৬৫ দিন আবার কখনো ৩৬৬ দিন দেখায় কেন?',
        answer:
          'জন্মদিন সদ্য পার হওয়ার পর পরবর্তী ১২ মাসের মধ্যে যদি কোনো অধিবর্ষের ২৯ ফেব্রুয়ারি পড়ে, তবে কাউন্টডাউন ৩৬৬ দিন থেকে শুরু হয়।',
      },
    ],
  },
  {
    slug: 'how-many-seconds-are-in-a-year',
    route: '/blog/how-many-seconds-are-in-a-year',
    title: 'এক বছরে কত সেকেন্ড হয়?',
    category: 'সময় ও একক',
    readingTime: '৩ মিনিট পড়া',
    summary:
      '৩৬৫ দিনের সাধারণ বছর, ৩৬৬ দিনের অধিবর্ষ ও গড় গ্রেগরিয়ান বছরে মোট সেকেন্ডের সঠিক হিসাব।',
    introduction:
      'সেকেন্ডের হিসাবে সময় খুব দ্রুত বড় হয়ে যায়। ১ মিনিটে ৬০ সেকেন্ড, ১ ঘণ্টায় ৩,৬০০ সেকেন্ড এবং ১ দিনে ৮৬,৪০০ সেকেন্ড থাকে। বছরের মোট দিনের সাথে ৮৬,৪০০ গুণ করলে সাধারণ বছর ও অধিবর্ষ ভেদে ভিন্ন মোট সেকেন্ড পাওয়া যায়।',
    sections: [
      {
        heading: 'সাধারণ বছর বনাম অধিবর্ষের সেকেন্ড',
        paragraphs: [
          'একটি ৩৬৫ দিনের সাধারণ বছরে: ৩৬৫ × ২৪ × ৬০ × ৬০ = ৩১,৫৩৬,০০০ সেকেন্ড।',
          'একটি ৩৬৬ দিনের অধিবর্ষে: ৩৬৬ × ২৪ × ৬০ × ৬০ = ৩১,৬২২,৪০০ সেকেন্ড—অর্থাৎ ৮৬,৪০০ সেকেন্ড বেশি।',
          '৪০০ বছরের সম্পূর্ণ গ্রেগরিয়ান চক্রে গড় বছর ৩৬৫.২৪২৫ দিনের, যা গড়ে ৩১,৫৫৬,৯৫২ সেকেন্ডের সমান।',
        ],
      },
      {
        heading: '১ বিলিয়ন সেকেন্ড কবে পূর্ণ হয়?',
        paragraphs: [
          'প্রতি বছরে প্রায় ৩ কোটি ১৫ লাখ সেকেন্ড থাকায় ১,০০০,০০০,০০০ সেকেন্ড পূর্ণ হতে প্রায় ৩১.৬৯ বছর লাগে—অর্থাৎ ৩১তম ও ৩২তম জন্মদিনের মাঝামাঝি সময়ে ১ বিলিয়ন সেকেন্ড পূর্ণ হয়।',
        ],
      },
    ],
    examples: [
      {
        title: 'দ্রুত গুণফল পরীক্ষা',
        detail:
          '১ দিন = ৮৬,৪০০ সে. · ১ সপ্তাহ = ৬০৪,৮০০ সে. · ৩০ দিনের মাস = ২,৫৯২,০০০ সে. · ৩৬৫ দিনের বছর = ৩১,৫৩৬,০০০ সে.।',
      },
      {
        title: '১০০ মিলিয়ন (১০ কোটি) সেকেন্ড মাইলফলক',
        detail:
          '১০০,০০০,০০০ ÷ ৮৬,৪০০ ≈ ১,১৫৭.৪ দিন, যা প্রায় ৩ বছর ২ মাস বয়সে পূর্ণ হয়।',
      },
    ],
    relatedCalculators: [
      {
        label: 'মিলিয়ন সেকেন্ড ক্যালকুলেটর',
        route: '/million-seconds-calculator',
        description: 'মোট মিলিয়ন সেকেন্ড ও ১ বিলিয়ন সেকেন্ডের তারিখ দেখুন।',
      },
      {
        label: 'বয়স ক্যালকুলেটর',
        route: '/age-calculator',
        description: 'প্রতি সেকেন্ডে আপডেট হওয়া লাইভ সেকেন্ড কাউন্টার দেখুন।',
      },
    ],
    faqs: [
      {
        question: 'জ্যোতির্বিজ্ঞানের লিপ সেকেন্ড কি সাধারণ বয়সের হিসাবে প্রভাব ফেলে?',
        answer:
          'পৃথিবীর ঘূর্ণনের কারণে কখনো ১ সেকেন্ড ইউটিসি লিপ সেকেন্ড যোগ হলেও সাধারণ ক্যালেন্ডার ও জাভাস্ক্রিপ্ট হিসাব প্রতিটি দিনকে ঠিক ৮৬,৪০০ সেকেন্ড ধরেই গণনা করে।',
      },
    ],
  },
  {
    slug: 'how-does-a-leap-year-affect-age-calculation',
    route: '/blog/how-does-a-leap-year-affect-age-calculation',
    title: 'অধিবর্ষ (লিপ ইয়ার) বয়স হিসাবে কীভাবে প্রভাব ফেলে?',
    category: 'ক্যালেন্ডার গণিত',
    readingTime: '৪ মিনিট পড়া',
    summary:
      'গ্রেগরিয়ান নিয়মে লিপ ইয়ার কীভাবে কাজ করে এবং ২৯ ফেব্রুয়ারি কীভাবে দিনসংখ্যা ও জন্মদিনে প্রভাব ফেলে।',
    introduction:
      'পৃথিবী সূর্যের চারপাশে একবার ঘুরতে প্রায় ৩৬৫.২৪২২ দিন সময় নেয়। প্রতি চার বছরে প্রায় ১টি অতিরিক্ত দিন যোগ না করলে প্রতি শতাব্দীতে ঋতুগুলো প্রায় ২৪ দিন সরে যেত। অধিবর্ষ আমাদের ক্যালেন্ডারকে ঠিক রাখে—এবং বয়স গণনাতেও মজার বৈচিত্র্য আনে।',
    sections: [
      {
        heading: 'অধিবর্ষের তিনটি নিয়ম',
        paragraphs: [
          'কোনো বছর ৪ দিয়ে বিভাজ্য হলে অধিবর্ষ হয়—তবে একটি শতাব্দী ব্যতিক্রম আছে: ১০০ দিয়ে বিভাজ্য বছর অধিবর্ষ নয়, যদি না তা ৪০০ দিয়েও বিভাজ্য হয়। এজন্য ২০০০ সাল অধিবর্ষ ছিল, কিন্তু ১৯০০ ছিল না এবং ২১০০ হবে না।',
        ],
      },
      {
        heading: 'দিনসংখ্যা ও ২৯ ফেব্রুয়ারির জন্মদিনে প্রভাব',
        paragraphs: [
          'সবার জন্যই প্রতিটি লিপ ইয়ার অতিবাহিত দিনে ১ দিন বাড়ায় এবং জন্মদিনের বার ১ দিনের বদলে ২ দিন এগিয়ে দেয়।',
          'যাঁদের জন্ম ২৯ ফেব্রুয়ারিতে, তাঁদের প্রকৃত বয়স কিন্তু প্রতি বছরই বাড়ে; কেবল ক্যালেন্ডারে ২৯ ফেব্রুয়ারি প্রতি চার বছর পর আসে বলে সাধারণ বছরে ২৮ ফেব্রুয়ারি বা ১ মার্চে জন্মদিন পালন করা হয়।',
        ],
      },
    ],
    examples: [
      {
        title: 'শতাব্দী নিয়ম: ১৯০০ বনাম ২০০০',
        detail: '১৯০০ ÷ ১০০ = ১৯ (৪০০ দিয়ে বিভাজ্য নয়) -> সাধারণ বছর। ২০০০ ÷ ৪০০ = ৫ -> অধিবর্ষ।',
      },
      {
        title: '২৯ ফেব্রুয়ারি ২০০০-এ জন্ম, ২৮ ফেব্রুয়ারি ২০২৬ তারিখে বয়স',
        detail:
          '২৮ ফেব্রুয়ারি ২০২৬ তারিখে বয়স ২৫ বছর ১১ মাস ৩০ দিন; ১ মার্চ ২০২৬ তারিখে ২৬ বছর পূর্ণ হয়।',
      },
    ],
    relatedCalculators: [
      {
        label: 'বয়স ক্যালকুলেটর',
        route: '/age-calculator',
        description: 'পূর্ণ অধিবর্ষ নিয়ম মেনে সঠিক ক্যালেন্ডার বয়স হিসাব করুন।',
      },
      {
        label: 'জন্মবার ক্যালকুলেটর',
        route: '/day-born-calculator',
        description: 'আপনার জন্মসাল অধিবর্ষ ছিল কি না পরীক্ষা করুন।',
      },
    ],
    faqs: [
      {
        question: '২৯ ফেব্রুয়ারিতে জন্মালে কি আমার আসল বয়স চার ভাগের এক ভাগ?',
        answer:
          'না। বয়স গণনা হয় জন্মের পর থেকে পূর্ণ সৌর বছর অনুযায়ী, ২৯ ফেব্রুয়ারির সংখ্যা দিয়ে নয়। তাই ২৪ বছরে বয়স ২৪ বছরই হবে।',
      },
    ],
  },
  {
    slug: 'how-to-calculate-friendship-duration',
    route: '/blog/how-to-calculate-friendship-duration',
    title: 'বন্ধুত্বের সময়কাল কীভাবে হিসাব করবেন?',
    category: 'সম্পর্ক',
    readingTime: '৩ মিনিট পড়া',
    summary:
      'বছর, মাস ও দিনে বন্ধুত্বের সঠিক বয়স এবং ১,০০০ দিনের মাইলফলক ট্র্যাক করুন।',
    introduction:
      'বন্ধুত্বের কোনো লিখিত চুক্তি না থাকলেও স্কুল, কলেজ বা ভ্রমণের সেই প্রথম দিনের কথা অনেকেই মনে রাখেন। বন্ধুত্বের শুরু থেকে আজকের দিন পর্যন্ত বছর, মাস ও মোট দিনে হিসাব করলে সেই সম্পর্ক আরও স্মরণীয় হয়ে ওঠে।',
    sections: [
      {
        heading: 'শুরুর তারিখ নির্বাচন',
        paragraphs: [
          'প্রথম পরিচয়ের সঠিক দিন মনে থাকলে সেটিই দিন। শুধু মাস ও বছর মনে থাকলে—যেমন বিশ্ববিদ্যালয়ের প্রথম ক্লাস সেপ্টেম্বর ২০১৬—তবে সেই মাসের ১ তারিখ ধরে নিখুঁত হিসাব করা যায়।',
        ],
      },
      {
        heading: 'বার্ষিকীর পাশাপাশি দিন-মাইলফলক উদযাপন',
        paragraphs: [
          'প্রতি বছর বার্ষিকীর পাশাপাশি ১,০০০ দিন (~২.৭৪ বছর), ২,৫০০ দিন (~৬.৮৪ বছর) ও ৫,০০০ দিন (~১৩.৬৯ বছর) উদযাপন বন্ধুত্বে নতুন আনন্দ যোগ করে।',
        ],
      },
    ],
    examples: [
      {
        title: 'বন্ধুত্বের ১,০০০ দিন',
        detail: '১ জানুয়ারি ২০২৪ তারিখে বন্ধুত্ব শুরু হলে ১,০০০তম দিন পড়বে ২৭ সেপ্টেম্বর ২০২৬ তারিখে।',
      },
      {
        title: '১০ বছরের বন্ধুত্ব',
        detail: 'দুইটি অধিবর্ষসহ ১০ বছরে মোট ৩,৬৫২ দিন—প্রায় ৮৭,৬৪৮ ঘণ্টার বন্ধুত্ব।',
      },
    ],
    relatedCalculators: [
      {
        label: 'বন্ধুত্ব ক্যালকুলেটর',
        route: '/friendship-calculator',
        description: 'বন্ধুত্বের সঠিক বছর, মাস, দিন ও মাইলফলক বের করুন।',
      },
      {
        label: 'ভালোবাসার সময়কাল ক্যালকুলেটর',
        route: '/love-duration-calculator',
        description: 'সম্পর্কের সময়কাল ও পরবর্তী বার্ষিকীর কাউন্টডাউন দেখুন।',
      },
    ],
    faqs: [
      {
        question: 'আমাদের বন্ধুত্বের একটি শেয়ারযোগ্য পিএনজি কার্ড কি তৈরি করা যাবে?',
        answer:
          'হ্যাঁ। বন্ধুত্বের সময়কাল হিসাব করার পর "কার্ড ডাউনলোড" বাটনে ক্লিক করে পিএনজি ছবি সেভ বা হোয়াটসঅ্যাপে শেয়ার করতে পারবেন।',
      },
    ],
  },
  {
    slug: 'how-to-calculate-age-in-different-years',
    route: '/blog/how-to-calculate-age-in-different-years',
    title: 'ভিন্ন ভিন্ন বছরে নিজের বয়স কীভাবে হিসাব করবেন?',
    category: 'ভবিষ্যৎ পরিকল্পনা',
    readingTime: '৪ মিনিট পড়া',
    summary:
      '২০২৭, ২০৩০, ২০৪০, ২০৫০ বা অতীতের যেকোনো বছরে নির্দিষ্ট তারিখ অনুযায়ী সঠিক বয়স জানার নিয়ম।',
    introduction:
      'অবসর পরিকল্পনা, পুনর্মিলনী বা ঐতিহাসিক কোনো ঘটনার সময় নিজের বয়স জানতে প্রায়ই অন্য কোনো বছরের বয়স বের করতে হয়। অনেকেই ভুলে যান যে একই বছরে জন্মদিনের আগে এক বয়স এবং জন্মদিনের দিন থেকে আরেকটি বয়স থাকে।',
    sections: [
      {
        heading: 'জন্মদিনের আগে বনাম জন্মদিনের পর',
        paragraphs: [
          'লক্ষ্য বছরের জন্মদিনে আপনার বয়স হবে সরাসরি লক্ষ্য বছর − জন্মসাল।',
          'তবে সেই বছরের জন্মদিনের আগে (যেমন ১ জানুয়ারি) আপনার পূর্ণ বয়স হবে লক্ষ্য বছর − জন্মসাল − ১ এবং সাথে অতিরিক্ত মাস ও দিন।',
        ],
      },
      {
        heading: 'বহু-দশকের লক্ষ্য পরিকল্পনা',
        paragraphs: [
          '২০২৭, ২০৩০, ২০৪০ ও ২০৫০ সালে নিজের বয়স আগে থেকে দেখে নিলে অবসর, পাসপোর্ট নবায়ন বা দীর্ঘমেয়াদী সঞ্চয় পরিকল্পনা করা অনেক সহজ হয়।',
        ],
      },
    ],
    examples: [
      {
        title: 'জন্ম ২০ অক্টোবর ১৯৯৫, বছর ২০৪০',
        detail: '১ জানুয়ারি ২০৪০ তারিখে বয়স ৪৪ বছর ২ মাস ১২ দিন; আর ২০ অক্টোবর ২০৪০ তারিখে বয়স হবে ৪৫ বছর।',
      },
      {
        title: 'অবসর বয়স পরীক্ষা',
        detail: '১৯৯৮ সালে জন্ম নেওয়া কেউ ৬৫ বছরে অবসর নিতে চাইলে তা পূর্ণ হবে ১৯৯৮ + ৬৫ = ২০৬৩ সালে।',
      },
    ],
    relatedCalculators: [
      {
        label: 'ভবিষ্যৎ বয়স ক্যালকুলেটর',
        route: '/future-age-calculator',
        description: '২০২৭, ২০৩০, ২০৪০, ২০৫০ বা কাস্টম বছরে আপনার বয়স দেখুন।',
      },
      {
        label: 'অবসর ক্যালকুলেটর',
        route: '/retirement-calculator',
        description: 'আপনার লক্ষ্য অবসরের বয়স পর্যন্ত বাকি বছর, মাস ও দিন জানুন।',
      },
    ],
    faqs: [
      {
        question: '২০৫০ সালের পরের কোনো কাস্টম বছরের বয়স কি দেখা যাবে?',
        answer:
          'হ্যাঁ। ভবিষ্যৎ বয়স ক্যালকুলেটরে ২২০০ সাল পর্যন্ত যেকোনো কাস্টম বছর দিয়ে বয়স দেখা যায়।',
      },
    ],
  },
];

export function getBlogArticles(lang: Language): BlogArticle[] {
  return lang === 'bn' ? BLOG_ARTICLES_BN : BLOG_ARTICLES;
}

export function getBlogArticleBySlug(
  slug: BlogArticleSlug,
  lang: Language
): BlogArticle | undefined {
  return getBlogArticles(lang).find((article) => article.slug === slug);
}
