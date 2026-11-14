import { Language } from '../i18n/types';

export type BlogArticleSlug =
  | 'how-to-calculate-your-exact-age'
  | 'how-many-days-have-i-been-alive'
  | 'how-to-calculate-age-difference-between-two-people'
  | 'how-to-find-your-day-of-birth'
  | 'what-is-my-zodiac-sign'
  | 'how-to-calculate-your-next-birthday'
  | 'how-many-seconds-are-in-a-year'
  | 'how-does-a-leap-year-affect-age-calculation'
  | 'how-to-calculate-friendship-duration'
  | 'how-to-calculate-age-in-different-years';

export type BlogRoute = `/blog/${BlogArticleSlug}`;

export type KnownRoute =
  | '/'
  | '/explore'
  | '/favorites'
  | '/history'
  | '/all-calculators'
  | '/age-calculator'
  | '/birthday-countdown'
  | '/age-difference-calculator'
  | '/who-is-older'
  | '/friendship-calculator'
  | '/love-duration-calculator'
  | '/zodiac-calculator'
  | '/day-born-calculator'
  | '/future-age-calculator'
  | '/retirement-calculator'
  | '/next-birthday'
  | '/million-seconds-calculator'
  | '/life-report'
  | '/blog'
  | BlogRoute
  | '/about'
  | '/contact'
  | '/privacy-policy'
  | '/terms'
  | '/disclaimer';

export type PageRoute = KnownRoute | '/404';

export interface RouteSeoMeta {
  path: PageRoute;
  title: string;
  description: string;
  heading: string;
  breadcrumbParent?: { label: string; route: KnownRoute };
  isArticle?: boolean;
  noindex?: boolean;
}

const ROUTE_ALIASES: Record<string, KnownRoute> = {
  '/age-difference': '/age-difference-calculator',
  '/love-duration': '/love-duration-calculator',
  '/million-seconds': '/million-seconds-calculator',
  '/terms-of-use': '/terms',
  '/calculators': '/explore',
};

export const ROUTE_META: Record<KnownRoute, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'Ageora – Advanced Age Calculator & Life Statistics Platform',
    description:
      'Calculate your exact age, explore life statistics, track live birthday countdowns, and create shareable PNG life reports in your browser.',
    heading: 'Discover Your Life in Numbers',
  },
  '/explore': {
    path: '/explore',
    title: 'Explore All Calculators by Category | Ageora',
    description:
      'Explore Ageora calculators organized by Age & Birthday, Relationship, Life Statistics, and Astrology.',
    heading: 'Explore Calculators',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/favorites': {
    path: '/favorites',
    title: 'Saved Favorite Calculators | Ageora',
    description:
      'Quickly access your bookmarked Ageora age, relationship, and life milestone calculators saved locally in your browser.',
    heading: 'Favorite Calculators',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/history': {
    path: '/history',
    title: 'Recently Used Calculators History | Ageora',
    description:
      'Reopen calculators you recently visited on Ageora with local-only browser history.',
    heading: 'Recent History',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/all-calculators': {
    path: '/all-calculators',
    title: 'All Age & Life Calculators – Complete Tool Directory | Ageora',
    description:
      'Browse all 12 browser-based age, birthday countdown, age difference, relationship, zodiac, retirement, and milestone calculators on Ageora.',
    heading: 'All Calculators',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/age-calculator': {
    path: '/age-calculator',
    title: 'Age Calculator – Exact Years, Months, Days & Live Seconds | Ageora',
    description:
      'Calculate your exact calendar age in years, months, weeks, days, hours, minutes, and live updating seconds with leap-year precision.',
    heading: 'Exact Age Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/birthday-countdown': {
    path: '/birthday-countdown',
    title: 'Birthday Countdown Calculator – Live Days, Hours & Seconds | Ageora',
    description:
      'Watch a live second-by-second countdown to your next birthday, see your turning age, and check what weekday your birthday falls on.',
    heading: 'Birthday Countdown',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/age-difference-calculator': {
    path: '/age-difference-calculator',
    title: 'Age Difference Calculator – Compare Two Dates of Birth | Ageora',
    description:
      'Compare two birth dates to calculate the exact calendar age gap in years, months, weeks, and total days between two people.',
    heading: 'Age Difference Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/who-is-older': {
    path: '/who-is-older',
    title: 'Who Is Older Calculator – Compare Two Birthdays & Exact Days | Ageora',
    description:
      'Instantly find out who is older between two people and by how many exact years, months, and calendar days.',
    heading: 'Who Is Older?',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/friendship-calculator': {
    path: '/friendship-calculator',
    title: 'Friendship Calculator – Measure Exact Friendship Duration | Ageora',
    description:
      'Calculate how many years, months, and days your friendship has lasted and track upcoming 100-day and 1,000-day milestones.',
    heading: 'Friendship Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/love-duration-calculator': {
    path: '/love-duration-calculator',
    title: 'Love Duration Calculator – Relationship Time & Anniversary Tracker | Ageora',
    description:
      'Calculate the exact duration of your relationship in years, months, days, and hours with your next anniversary countdown.',
    heading: 'Love Duration Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/zodiac-calculator': {
    path: '/zodiac-calculator',
    title: 'Zodiac Calculator – Find Western Zodiac Sign, Element & Traits | Ageora',
    description:
      'Discover your Western zodiac sign, date range, element, ruling planet, modality, and core personality traits from your date of birth.',
    heading: 'Zodiac Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/day-born-calculator': {
    path: '/day-born-calculator',
    title: 'Day Born Calculator – Find the Exact Weekday You Were Born | Ageora',
    description:
      'Discover the exact day of the week you were born, plus day of the year, week number, leap-year status, and days since birth.',
    heading: 'Day Born Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/future-age-calculator': {
    path: '/future-age-calculator',
    title: 'Future Age Calculator – Age in 2027, 2030, 2040 & 2050 | Ageora',
    description:
      'Calculate how old you will be in 2027, 2030, 2040, 2050, or any custom future year based on your exact calendar birth date.',
    heading: 'Future Age Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/retirement-calculator': {
    path: '/retirement-calculator',
    title: 'Retirement Calculator – Days & Years Until Retirement | Ageora',
    description:
      'Calculate your exact target retirement date and view remaining years, months, weeks, and days until retirement.',
    heading: 'Retirement Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/next-birthday': {
    path: '/next-birthday',
    title: 'Next Birthday Calculator – Exact Date, Weekday & Milestones | Ageora',
    description:
      'Find your next birthday date, weekday, turning age, and upcoming milestone birthdays from your date of birth.',
    heading: 'Next Birthday Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/million-seconds-calculator': {
    path: '/million-seconds-calculator',
    title: 'Million Seconds Calculator – Live Seconds Lived & 1B Milestone | Ageora',
    description:
      'See how many million seconds you have lived in real time and find out when you reach your next 100M or 1 Billion seconds milestone.',
    heading: 'Million Seconds Calculator',
    breadcrumbParent: { label: 'All Calculators', route: '/all-calculators' },
  },
  '/life-report': {
    path: '/life-report',
    title: 'My Life Report – Downloadable PNG Life Statistics Card | Ageora',
    description:
      'Generate a visual Life Report summarizing your exact age, birth weekday, lived days, zodiac sign, and 80-year benchmark as a PNG card.',
    heading: 'My Life Report',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/blog': {
    path: '/blog',
    title: 'Ageora Blog – Guides on Age Calculation, Calendar Math & Life Time',
    description:
      'Read practical guides on exact age math, leap years, zodiac date boundaries, day-of-week formulas, and milestone tracking.',
    heading: 'Ageora Blog & Guides',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/blog/how-to-calculate-your-exact-age': {
    path: '/blog/how-to-calculate-your-exact-age',
    title: 'How to Calculate Your Exact Age? (Calendar Formula & Examples) | Ageora',
    description:
      'Learn the exact calendar subtraction method for calculating your age in years, months, and days without month-length errors.',
    heading: 'How to Calculate Your Exact Age?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-many-days-have-i-been-alive': {
    path: '/blog/how-many-days-have-i-been-alive',
    title: 'How Many Days Have I Been Alive? Complete Guide | Ageora',
    description:
      'Understand how total days lived are counted across common years and leap years, plus how to calculate your 10,000-day milestone.',
    heading: 'How Many Days Have I Been Alive?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-age-difference-between-two-people': {
    path: '/blog/how-to-calculate-age-difference-between-two-people',
    title: 'How to Calculate Age Difference Between Two People? | Ageora',
    description:
      'Step-by-step calendar rules for comparing two birth dates to find the exact difference in years, months, and days.',
    heading: 'How to Calculate Age Difference Between Two People?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-find-your-day-of-birth': {
    path: '/blog/how-to-find-your-day-of-birth',
    title: 'How to Find Your Day of Birth? (Weekday Calendar Guide) | Ageora',
    description:
      'Learn how calendar algorithms like Zeller’s congruence and the Doomsday rule determine the exact weekday of any birth date.',
    heading: 'How to Find Your Day of Birth?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/what-is-my-zodiac-sign': {
    path: '/blog/what-is-my-zodiac-sign',
    title: 'What Is My Zodiac Sign? Western Dates, Elements & Cusps | Ageora',
    description:
      'A complete Western zodiac date reference covering all 12 signs, their elements, ruling planets, and cusp date boundaries.',
    heading: 'What Is My Zodiac Sign?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-your-next-birthday': {
    path: '/blog/how-to-calculate-your-next-birthday',
    title: 'How to Calculate Your Next Birthday? Countdown & Weekday Rules | Ageora',
    description:
      'Discover how next birthday countdowns handle month transitions, weekday shifts each year, and February 29 leap-day birthdays.',
    heading: 'How to Calculate Your Next Birthday?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-many-seconds-are-in-a-year': {
    path: '/blog/how-many-seconds-are-in-a-year',
    title: 'How Many Seconds Are in a Year? Common, Leap & Solar Years | Ageora',
    description:
      'Find out the exact number of seconds in a 365-day year, a 366-day leap year, and an astronomical tropical year.',
    heading: 'How Many Seconds Are in a Year?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-does-a-leap-year-affect-age-calculation': {
    path: '/blog/how-does-a-leap-year-affect-age-calculation',
    title: 'How Does a Leap Year Affect Age Calculation? | Ageora',
    description:
      'Explore how February 29 impacts total days lived, chronological age, and legal or personal birthday celebrations in non-leap years.',
    heading: 'How Does a Leap Year Affect Age Calculation?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-friendship-duration': {
    path: '/blog/how-to-calculate-friendship-duration',
    title: 'How to Calculate Friendship Duration & Anniversaries? | Ageora',
    description:
      'Learn how to track exact friendship duration in years, months, and days and celebrate milestones like 1,000 or 5,000 days.',
    heading: 'How to Calculate Friendship Duration?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-age-in-different-years': {
    path: '/blog/how-to-calculate-age-in-different-years',
    title: 'How to Calculate Age in Different Years? (Past & Future) | Ageora',
    description:
      'Understand why your age in a given year depends on whether your birthday has already passed on the reference date.',
    heading: 'How to Calculate Age in Different Years?',
    breadcrumbParent: { label: 'Blog', route: '/blog' },
    isArticle: true,
  },
  '/about': {
    path: '/about',
    title: 'About Ageora – Calendar Precision & Browser-Only Privacy',
    description:
      'Learn about Ageora, our commitment to accurate local-timezone calendar math, and privacy-first browser-only calculation tools.',
    heading: 'About Ageora',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Ageora – Feedback & Calculator Suggestions',
    description:
      'Get in touch with Ageora to share feedback, report a date edge case, or suggest new age and milestone calculators.',
    heading: 'Contact Us',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'Privacy Policy – Browser Processing, Cookies & Advertising | Ageora',
    description:
      'Read Ageora’s Privacy Policy covering local browser processing, local storage preferences, cookies, and Google AdSense disclosures.',
    heading: 'Privacy Policy',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Use – Ageora Platform Guidelines',
    description:
      'Review the Terms of Use for accessing and using Ageora’s browser-based age calculators, blog guides, and shareable PNG cards.',
    heading: 'Terms of Use',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
  '/disclaimer': {
    path: '/disclaimer',
    title: 'Disclaimer – Informational Estimates & Calendar Notes | Ageora',
    description:
      'Important informational disclaimers regarding Ageora’s approximate biological metrics, 80-year reference scale, and zodiac content.',
    heading: 'Disclaimer',
    breadcrumbParent: { label: 'Home', route: '/' },
  },
};

export const ROUTE_META_BN: Record<KnownRoute, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'Ageora – আধুনিক বয়স ক্যালকুলেটর ও জীবন পরিসংখ্যান প্ল্যাটফর্ম',
    description:
      'আপনার সঠিক বয়স, অতিক্রান্ত দিন, জন্মদিনের লাইভ কাউন্টডাউন, সম্পর্কের হিসাব এবং PNG লাইফ রিপোর্ট তৈরি করুন সরাসরি ব্রাউজারে।',
    heading: 'সংখ্যার ভেতরে জানুন আপনার জীবনকে',
  },
  '/explore': {
    path: '/explore',
    title: 'সব ক্যালকুলেটর এক্সপ্লোর করুন | Ageora',
    description:
      'বয়স ও জন্মদিন, সম্পর্ক, জীবন পরিসংখ্যান এবং জ্যোতিষশাস্ত্র ক্যাটাগরি অনুযায়ী সাজানো Ageora-র সব ক্যালকুলেটর দেখুন।',
    heading: 'ক্যালকুলেটর এক্সপ্লোর করুন',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/favorites': {
    path: '/favorites',
    title: 'পছন্দের তালিকা – সংরক্ষিত ক্যালকুলেটর | Ageora',
    description:
      'আপনার ব্রাউজারে সংরক্ষিত পছন্দের বয়স, সম্পর্ক এবং মাইলফলক ক্যালকুলেটরগুলো একসাথে দেখুন।',
    heading: 'পছন্দের তালিকা',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/history': {
    path: '/history',
    title: 'ব্যবহারের ইতিহাস – সাম্প্রতিক ক্যালকুলেটর | Ageora',
    description:
      'Ageora-তে সাম্প্রতিক ব্যবহৃত ক্যালকুলেটরগুলো দ্রুত আবার খুলুন। সব তথ্য কেবল আপনার ব্রাউজারেই থাকে।',
    heading: 'ব্যবহারের ইতিহাস',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/all-calculators': {
    path: '/all-calculators',
    title: 'সকল বয়স ও জীবন ক্যালকুলেটর তালিকা | Ageora',
    description:
      'Ageora-র বয়স, জন্মদিন, বয়সের পার্থক্য, বন্ধুত্ব, প্রেম, রাশিচক্র ও অবসর হিসাবের সম্পূর্ণ টুল ডিরেক্টরি।',
    heading: 'সব ক্যালকুলেটর',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/age-calculator': {
    path: '/age-calculator',
    title: 'বয়স ক্যালকুলেটর – বছর, মাস, দিন ও লাইভ সেকেন্ড হিসাব | Ageora',
    description:
      'লিপ ইয়ার ও গ্রেগরিয়ান ক্যালেন্ডার অনুযায়ী বছর, মাস, সপ্তাহ, দিন, ঘণ্টা, মিনিট ও লাইভ সেকেন্ডে আপনার সঠিক বয়স হিসাব করুন।',
    heading: 'নিখুঁত বয়স ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/birthday-countdown': {
    path: '/birthday-countdown',
    title: 'জন্মদিনের কাউন্টডাউন ক্যালকুলেটর – দিন, ঘণ্টা ও সেকেন্ড | Ageora',
    description:
      'আপনার পরবর্তী জন্মদিনের বাকি দিন, ঘণ্টা, মিনিট ও সেকেন্ড লাইভ কাউন্টডাউনে দেখুন এবং আসন্ন বয়স জানুন।',
    heading: 'জন্মদিনের কাউন্টডাউন',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/age-difference-calculator': {
    path: '/age-difference-calculator',
    title: 'বয়সের পার্থক্য ক্যালকুলেটর – দুটি জন্মতারিখের তুলনা | Ageora',
    description:
      'দুইজন মানুষের জন্মতারিখ দিয়ে বছর, মাস, সপ্তাহ এবং মোট দিনের সঠিক বয়সের পার্থক্য হিসাব করুন।',
    heading: 'বয়সের পার্থক্য ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/who-is-older': {
    path: '/who-is-older',
    title: 'কে বড়? ক্যালকুলেটর – দুটি জন্মতারিখের তুলনা | Ageora',
    description:
      'দুইজন মানুষের মধ্যে কে বড় এবং ঠিক কত বছর, মাস ও দিনের বড় তা তাৎক্ষণিক হিসাব করুন।',
    heading: 'কে বড়?',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/friendship-calculator': {
    path: '/friendship-calculator',
    title: 'বন্ধুত্বের হিসাব ক্যালকুলেটর – বন্ধুত্বের সময়কাল ও মাইলফলক | Ageora',
    description:
      'আপনাদের বন্ধুত্ব কত বছর, মাস ও দিন ধরে চলছে এবং পরবর্তী ১,০০০ দিনের মাইলফলক কবে তা হিসাব করুন।',
    heading: 'বন্ধুত্বের হিসাব',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/love-duration-calculator': {
    path: '/love-duration-calculator',
    title: 'সম্পর্কের সময়কাল ক্যালকুলেটর – বার্ষিকী ও দিন গণনা | Ageora',
    description:
      'আপনাদের সম্পর্কের বয়স বছর, মাস, দিন ও ঘণ্টায় হিসাব করুন এবং পরবর্তী বার্ষিকীর কাউন্টডাউন দেখুন।',
    heading: 'সম্পর্কের সময়কাল ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/zodiac-calculator': {
    path: '/zodiac-calculator',
    title: 'রাশিচক্র ক্যালকুলেটর – ওয়েস্টার্ন রাশি, উপাদান ও বৈশিষ্ট্য | Ageora',
    description:
      'জন্মতারিখ দিয়ে আপনার ওয়েস্টার্ন রাশি, তারিখের সীমা, উপাদান, অধিপতি গ্রহ এবং মূল চারিত্রিক বৈশিষ্ট্য জানুন।',
    heading: 'রাশিচক্র ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/day-born-calculator': {
    path: '/day-born-calculator',
    title: 'জন্মবার ক্যালকুলেটর – কোন বারে জন্মেছিলেন জানুন | Ageora',
    description:
      'আপনার জন্মতারিখ অনুযায়ী সপ্তাহের কোন বারে জন্ম হয়েছিল, বছরের কততম দিন, সপ্তাহ নম্বর ও লিপ ইয়ার তথ্য জানুন।',
    heading: 'জন্মবার ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/future-age-calculator': {
    path: '/future-age-calculator',
    title: 'ভবিষ্যৎ বয়স ক্যালকুলেটর – ২০২৭, ২০৩০, ২০৪০ ও ২০৫০ সালে বয়স | Ageora',
    description:
      '২০২৭, ২০৩০, ২০৪০, ২০৫০ বা আপনার পছন্দের যেকোনো ভবিষ্যৎ বছরে আপনার সঠিক বয়স কত হবে তা হিসাব করুন।',
    heading: 'ভবিষ্যৎ বয়স ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/retirement-calculator': {
    path: '/retirement-calculator',
    title: 'অবসর ক্যালকুলেটর – অবসরের বাকি দিন ও তারিখ হিসাব | Ageora',
    description:
      'আপনার কাঙ্ক্ষিত অবসর বয়সের সঠিক তারিখ এবং বাকি বছর, মাস, সপ্তাহ ও দিন হিসাব করুন।',
    heading: 'অবসর ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/next-birthday': {
    path: '/next-birthday',
    title: 'পরবর্তী জন্মদিন ক্যালকুলেটর – তারিখ, বার ও মাইলফলক | Ageora',
    description:
      'আপনার পরবর্তী জন্মদিনের সঠিক তারিখ, সপ্তাহের বার, আসন্ন বয়স এবং ভবিষ্যতের মাইলফলক জন্মদিন দেখুন।',
    heading: 'পরবর্তী জন্মদিন ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/million-seconds-calculator': {
    path: '/million-seconds-calculator',
    title: 'মিলিয়ন সেকেন্ড ক্যালকুলেটর – লাইভ সেকেন্ড ও ১ বিলিয়ন মাইলফলক | Ageora',
    description:
      'আপনি কত মিলিয়ন সেকেন্ড বেঁচে আছেন তা লাইভ দেখুন এবং ১০০ মিলিয়ন বা ১ বিলিয়ন সেকেন্ডের তারিখ জানুন।',
    heading: 'মিলিয়ন সেকেন্ড ক্যালকুলেটর',
    breadcrumbParent: { label: 'সব ক্যালকুলেটর', route: '/all-calculators' },
  },
  '/life-report': {
    path: '/life-report',
    title: 'আমার লাইফ রিপোর্ট – ডাউনলোডযোগ্য PNG জীবন প্রতিবেদন | Ageora',
    description:
      'আপনার সঠিক বয়স, জন্মবার, অতিক্রান্ত দিন, রাশি এবং ৮০ বছরের রেফারেন্স সূচকসহ ভিজ্যুয়াল PNG লাইফ রিপোর্ট তৈরি করুন।',
    heading: 'আমার লাইফ রিপোর্ট',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/blog': {
    path: '/blog',
    title: 'Ageora ব্লগ – বয়স গণনা, ক্যালেন্ডার ও জীবন মাইলফলক গাইড',
    description:
      'নিখুঁত বয়স নির্ণয়ের সূত্র, লিপ ইয়ার, রাশিচক্রের সীমানা এবং জন্মবার নির্ণয় নিয়ে সহজ ও বিস্তারিত গাইড পড়ুন।',
    heading: 'Ageora ব্লগ ও ক্যালেন্ডার গাইড',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/blog/how-to-calculate-your-exact-age': {
    path: '/blog/how-to-calculate-your-exact-age',
    title: 'কীভাবে আপনার সঠিক বয়স হিসাব করবেন? (সূত্র ও উদাহরণ) | Ageora',
    description:
      'মাসের দিনের তারতম্য ছাড়াই বছর, মাস এবং দিনে সঠিক বয়স হিসাব করার ক্যালেন্ডার বিয়োগ পদ্ধতি শিখুন।',
    heading: 'কীভাবে আপনার সঠিক বয়স হিসাব করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-many-days-have-i-been-alive': {
    path: '/blog/how-many-days-have-i-been-alive',
    title: 'আমি মোট কত দিন বেঁচে আছি? সম্পূর্ণ হিসাব গাইড | Ageora',
    description:
      'সাধারণ বছর ও লিপ ইয়ারে মোট অতিক্রান্ত দিন কীভাবে গণনা করা হয় এবং ১০,০০০ দিনের মাইলফলক কবে আসে তা জানুন।',
    heading: 'আমি মোট কত দিন বেঁচে আছি?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-age-difference-between-two-people': {
    path: '/blog/how-to-calculate-age-difference-between-two-people',
    title: 'দুইজন মানুষের বয়সের পার্থক্য কীভাবে হিসাব করবেন? | Ageora',
    description:
      'দুটি জন্মতারিখের মধ্যে বছর, মাস ও দিনের সঠিক পার্থক্য বের করার ধাপে ধাপে ক্যালেন্ডার নিয়ম।',
    heading: 'দুইজন মানুষের বয়সের পার্থক্য কীভাবে হিসাব করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-find-your-day-of-birth': {
    path: '/blog/how-to-find-your-day-of-birth',
    title: 'জন্মতারিখ থেকে সপ্তাহের জন্মবার কীভাবে বের করবেন? | Ageora',
    description:
      'জেলারের কনগ্রুয়েন্স ও ডুমসডে নিয়ম কীভাবে যেকোনো জন্মতারিখের সঠিক বার নির্ণয় করে তা জানুন।',
    heading: 'জন্মতারিখ থেকে সপ্তাহের জন্মবার কীভাবে বের করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/what-is-my-zodiac-sign': {
    path: '/blog/what-is-my-zodiac-sign',
    title: 'আমার রাশি কী? ওয়েস্টার্ন রাশিচক্রের তারিখ ও উপাদান | Ageora',
    description:
      '১২টি ওয়েস্টার্ন রাশির তারিখের সীমা, উপাদান, অধিপতি গ্রহ এবং কাস্প তারিখ নিয়ে সম্পূর্ণ রেফারেন্স গাইড।',
    heading: 'আমার রাশি কী?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-your-next-birthday': {
    path: '/blog/how-to-calculate-your-next-birthday',
    title: 'পরবর্তী জন্মদিন ও কাউন্টডাউন কীভাবে হিসাব করবেন? | Ageora',
    description:
      'পরবর্তী জন্মদিনের কাউন্টডাউন, প্রতি বছর বার পরিবর্তন এবং ২৯ ফেব্রুয়ারির জন্মদিন কীভাবে হিসাব হয় তা জানুন।',
    heading: 'পরবর্তী জন্মদিন কীভাবে হিসাব করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-many-seconds-are-in-a-year': {
    path: '/blog/how-many-seconds-are-in-a-year',
    title: 'এক বছরে কত সেকেন্ড হয়? সাধারণ ও লিপ ইয়ারের হিসাব | Ageora',
    description:
      '৩৬৫ দিনের সাধারণ বছর, ৩৬৬ দিনের লিপ ইয়ার এবং গড় গ্রেগরিয়ান বছরে ঠিক কত সেকেন্ড থাকে তা জানুন।',
    heading: 'এক বছরে কত সেকেন্ড হয়?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-does-a-leap-year-affect-age-calculation': {
    path: '/blog/how-does-a-leap-year-affect-age-calculation',
    title: 'লিপ ইয়ার কীভাবে বয়স গণনায় প্রভাব ফেলে? | Ageora',
    description:
      '২৯ ফেব্রুয়ারি কীভাবে মোট দিন, কালানুক্রমিক বয়স এবং নন-লিপ ইয়ারে জন্মদিন পালনে প্রভাব ফেলে তা জানুন।',
    heading: 'লিপ ইয়ার কীভাবে বয়স গণনায় প্রভাব ফেলে?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-friendship-duration': {
    path: '/blog/how-to-calculate-friendship-duration',
    title: 'বন্ধুত্বের সময়কাল ও ১,০০০ দিনের মাইলফলক কীভাবে হিসাব করবেন? | Ageora',
    description:
      'বছর, মাস ও দিনে বন্ধুত্বের সঠিক দৈর্ঘ্য এবং ১,০০০ বা ৫,০০০ দিনের মাইলফলক হিসাব করার উপায়।',
    heading: 'বন্ধুত্বের সময়কাল কীভাবে হিসাব করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/blog/how-to-calculate-age-in-different-years': {
    path: '/blog/how-to-calculate-age-in-different-years',
    title: 'ভিন্ন ভিন্ন বছরে নিজের বয়স কীভাবে হিসাব করবেন? | Ageora',
    description:
      'ভবিষ্যৎ বা অতীতের যেকোনো বছরে নির্দিষ্ট তারিখে আপনার সঠিক বয়স কীভাবে নির্ধারিত হয় তা বুঝুন।',
    heading: 'ভিন্ন ভিন্ন বছরে নিজের বয়স কীভাবে হিসাব করবেন?',
    breadcrumbParent: { label: 'ব্লগ', route: '/blog' },
    isArticle: true,
  },
  '/about': {
    path: '/about',
    title: 'Ageora সম্পর্কে – নির্ভুল ক্যালেন্ডার ও ব্রাউজার গোপনীয়তা',
    description:
      'Ageora প্ল্যাটফর্ম, স্থানীয় টাইমজোন-ভিত্তিক সঠিক ক্যালেন্ডার হিসাব এবং গোপনীয়তা-বান্ধব টুলস সম্পর্কে জানুন।',
    heading: 'Ageora সম্পর্কে',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/contact': {
    path: '/contact',
    title: 'যোগাযোগ করুন – মতামত ও পরামর্শ | Ageora',
    description:
      'Ageora-কে আপনার মতামত, ত্রুটির তথ্য বা নতুন ক্যালকুলেটরের পরামর্শ পাঠাতে যোগাযোগ করুন।',
    heading: 'যোগাযোগ',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/privacy-policy': {
    path: '/privacy-policy',
    title: 'গোপনীয়তা নীতি – ব্রাউজার প্রসেসিং ও কুকিজ | Ageora',
    description:
      'Ageora-র গোপনীয়তা নীতি পড়ুন: সম্পূর্ণ ব্রাউজার-ভিত্তিক প্রসেসিং, localStorage পছন্দ এবং বিজ্ঞাপন সংক্রান্ত তথ্য।',
    heading: 'গোপনীয়তা নীতি',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/terms': {
    path: '/terms',
    title: 'ব্যবহারের শর্তাবলি – Ageora প্ল্যাটফর্ম নির্দেশিকা',
    description:
      'Ageora-র বয়স ক্যালকুলেটর, ব্লগ গাইড এবং শেয়ারযোগ্য PNG কার্ড ব্যবহারের শর্তাবলি জানুন।',
    heading: 'ব্যবহারের শর্তাবলি',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
  '/disclaimer': {
    path: '/disclaimer',
    title: 'সতর্কীকরণ ও দায়মুক্তি – তথ্যমূলক পরিসংখ্যান | Ageora',
    description:
      'Ageora-র আনুমানিক জৈবিক হিসাব, ৮০ বছরের স্কেল এবং রাশিচক্র সংক্রান্ত গুরুত্বপূর্ণ তথ্যমূলক নোট।',
    heading: 'সতর্কীকরণ ও দায়মুক্তি',
    breadcrumbParent: { label: 'হোম', route: '/' },
  },
};

export const NOT_FOUND_META: RouteSeoMeta = {
  path: '/404',
  title: 'Page Not Found (404) – Ageora',
  description:
    'The requested page could not be found on Ageora. Browse our age calculators or guides instead.',
  heading: 'Page Not Found',
  noindex: true,
};

export const NOT_FOUND_META_BN: RouteSeoMeta = {
  path: '/404',
  title: 'পেজ পাওয়া যায়নি (৪০৪) – Ageora',
  description:
    'অনুরোধকৃত পেজটি Ageora-তে পাওয়া যায়নি। আমাদের বয়স ক্যালকুলেটর বা গাইডগুলো দেখুন।',
  heading: 'পেজ পাওয়া যায়নি',
  noindex: true,
};

export function normalizePath(pathname: string): PageRoute {
  const withoutLangPrefix = pathname.replace(/^\/bn(?=\/|$)/, '') || '/';
  const cleaned = withoutLangPrefix.replace(/\/+$/, '') || '/';
  if (cleaned in ROUTE_ALIASES) {
    return ROUTE_ALIASES[cleaned];
  }
  if (cleaned in ROUTE_META) {
    return cleaned as KnownRoute;
  }
  return '/404';
}

export function parsePathname(pathname: string): {
  route: PageRoute;
  urlLang: Language | null;
} {
  const hasBnPrefix = /^\/bn(\/|$)/.test(pathname);
  return {
    route: normalizePath(pathname),
    urlLang: hasBnPrefix ? 'bn' : null,
  };
}

export function buildLocalizedPath(route: PageRoute, lang: Language): string {
  const baseRoute = route === '/404' ? '/' : route;
  if (lang === 'bn') {
    return baseRoute === '/' ? '/bn' : `/bn${baseRoute}`;
  }
  return baseRoute;
}

export function getRouteMeta(route: PageRoute, lang: Language = 'en'): RouteSeoMeta {
  if (route === '/404') {
    return lang === 'bn' ? NOT_FOUND_META_BN : NOT_FOUND_META;
  }
  return lang === 'bn' ? ROUTE_META_BN[route] : ROUTE_META[route];
}

export function applySeoForRoute(route: PageRoute, lang: Language = 'en'): void {
  const meta = getRouteMeta(route, lang);
  document.documentElement.lang = lang;
  document.title = meta.title;

  const setMetaBySelector = (
    selector: string,
    attrName: 'name' | 'property',
    attrValue: string,
    content: string
  ) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaBySelector('meta[name="description"]', 'name', 'description', meta.description);
  setMetaBySelector('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaBySelector(
    'meta[property="og:description"]',
    'property',
    'og:description',
    meta.description
  );
  setMetaBySelector(
    'meta[property="og:type"]',
    'property',
    'og:type',
    meta.isArticle ? 'article' : 'website'
  );
  setMetaBySelector(
    'meta[property="og:locale"]',
    'property',
    'og:locale',
    lang === 'bn' ? 'bn_BD' : 'en_US'
  );
  setMetaBySelector('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaBySelector(
    'meta[name="twitter:description"]',
    'name',
    'twitter:description',
    meta.description
  );
  setMetaBySelector(
    'meta[name="robots"]',
    'name',
    'robots',
    meta.noindex ? 'noindex, follow' : 'index, follow'
  );

  const origin = window.location.origin;
  const enPath = buildLocalizedPath(route, 'en');
  const bnPath = buildLocalizedPath(route, 'bn');
  const canonicalUrl = `${origin}${lang === 'bn' ? bnPath : enPath}`;

  setMetaBySelector('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

  const setLinkRel = (
    selector: string,
    rel: string,
    href: string,
    extraAttrs?: Record<string, string>
  ) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      if (extraAttrs) {
        Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
      }
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  setLinkRel('link[rel="canonical"]', 'canonical', canonicalUrl);
  setLinkRel('link[rel="alternate"][hreflang="en"]', 'alternate', `${origin}${enPath}`, {
    hreflang: 'en',
  });
  setLinkRel('link[rel="alternate"][hreflang="bn"]', 'alternate', `${origin}${bnPath}`, {
    hreflang: 'bn',
  });
  setLinkRel(
    'link[rel="alternate"][hreflang="x-default"]',
    'alternate',
    `${origin}${enPath}`,
    { hreflang: 'x-default' }
  );

  const homeUrl = `${origin}${buildLocalizedPath('/', lang)}`;
  const siteDesc =
    lang === 'bn'
      ? 'আপনার জীবন, সংখ্যারও ঊর্ধ্বে। আধুনিক বয়স ক্যালকুলেটর এবং জীবন পরিসংখ্যান প্ল্যাটফর্ম।'
      : 'Your Life, Beyond Numbers. Advanced Age Calculator & Life Statistics Platform.';

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: homeUrl,
      name: 'Ageora',
      inLanguage: lang,
      description: siteDesc,
    },
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'Ageora',
      url: `${origin}/`,
    },
    {
      '@type': 'WebApplication',
      '@id': `${origin}/#webapp`,
      name: meta.heading,
      url: canonicalUrl,
      inLanguage: lang,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      description: meta.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ];

  if (route !== '/' && route !== '/404') {
    const items: { '@type': string; position: number; name: string; item: string }[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'bn' ? 'হোম' : 'Home',
        item: homeUrl,
      },
    ];

    if (meta.breadcrumbParent && meta.breadcrumbParent.route !== '/') {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: meta.breadcrumbParent.label,
        item: `${origin}${buildLocalizedPath(meta.breadcrumbParent.route, lang)}`,
      });
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: meta.heading,
        item: canonicalUrl,
      });
    } else {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: meta.heading,
        item: canonicalUrl,
      });
    }

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items,
    });
  }

  if (meta.isArticle) {
    graph.push({
      '@type': 'Article',
      headline: meta.heading,
      description: meta.description,
      inLanguage: lang,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Ageora',
        url: `${origin}/`,
      },
      datePublished: '2026-01-15',
      dateModified: '2026-11-13',
    });
  }

  let ldScript = document.querySelector('script#ageora-jsonld');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.id = 'ageora-jsonld';
    ldScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(ldScript);
  }
  ldScript.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
