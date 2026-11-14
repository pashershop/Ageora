import { Language } from '../i18n/types';
import { KnownRoute } from '../utils/seo';

export type ExploreCategoryId =
  | 'age-birthday'
  | 'relationship'
  | 'life-statistics'
  | 'astrology';

export interface CalculatorMeta {
  id: string;
  route: KnownRoute;
  title: string;
  titleBn: string;
  shortDescription: string;
  shortDescriptionBn: string;
  category: 'age' | 'relationships' | 'milestones';
  categoryLabel: string;
  categoryLabelBn: string;
  exploreCategory: ExploreCategoryId;
  exploreCategoryLabel: string;
  exploreCategoryLabelBn: string;
  popular?: boolean;
  keywords: string[];
  keywordsBn: string[];
  iconName:
    | 'Clock'
    | 'Cake'
    | 'Scale'
    | 'Users'
    | 'Handshake'
    | 'Heart'
    | 'Sparkles'
    | 'CalendarDays'
    | 'Telescope'
    | 'Briefcase'
    | 'Gift'
    | 'Timer'
    | 'FileText'
    | 'Activity';
}

export interface ExploreCategoryMeta {
  id: ExploreCategoryId;
  label: string;
  labelBn: string;
  description: string;
  descriptionBn: string;
}

export const EXPLORE_CATEGORIES: ExploreCategoryMeta[] = [
  {
    id: 'age-birthday',
    label: 'Age & Birthday',
    labelBn: 'বয়স ও জন্মদিন',
    description:
      'Exact chronological age, live birthday countdowns, future ages, and birth weekdays.',
    descriptionBn:
      'সঠিক বয়স, লাইভ জন্মদিন কাউন্টডাউন, ভবিষ্যৎ বয়স এবং জন্মবার নির্ণয়।',
  },
  {
    id: 'relationship',
    label: 'Relationship',
    labelBn: 'সম্পর্ক ও বন্ধুত্ব',
    description:
      'Compare ages, measure friendships, and track relationship milestones.',
    descriptionBn:
      'বয়সের পার্থক্য তুলনা, বন্ধুত্বের সময়কাল এবং সম্পর্কের মাইলফলক হিসাব।',
  },
  {
    id: 'life-statistics',
    label: 'Life Statistics',
    labelBn: 'জীবনের পরিসংখ্যান',
    description:
      'Visual life reports, 80-year benchmarks, million-second counters, and retirement timelines.',
    descriptionBn:
      'ভিজ্যুয়াল লাইফ রিপোর্ট, ৮০ বছরের বেঞ্চমার্ক, মিলিয়ন সেকেন্ড ও অবসরের হিসাব।',
  },
  {
    id: 'astrology',
    label: 'Astrology',
    labelBn: 'জ্যোতিষ ও রাশিফল',
    description: 'Western zodiac signs, planetary rulers, elements, and core traits.',
    descriptionBn: 'ওয়েস্টার্ন রাশিচক্র, অধিপতি গ্রহ, উপাদান এবং চারিত্রিক বৈশিষ্ট্য।',
  },
];

export const CALCULATORS_CATALOG: CalculatorMeta[] = [
  {
    id: 'age-calculator',
    route: '/age-calculator',
    title: 'Age Calculator',
    titleBn: 'বয়স ক্যালকুলেটর',
    shortDescription:
      'Exact age in years, months, days, weeks, hours, minutes, and live seconds.',
    shortDescriptionBn:
      'বছর, মাস, দিন, সপ্তাহ, ঘণ্টা, মিনিট ও লাইভ সেকেন্ডে আপনার সঠিক বয়স জানুন।',
    category: 'age',
    categoryLabel: 'Age & Time',
    categoryLabelBn: 'বয়স ও সময়',
    exploreCategory: 'age-birthday',
    exploreCategoryLabel: 'Age & Birthday',
    exploreCategoryLabelBn: 'বয়স ও জন্মদিন',
    popular: true,
    keywords: ['age', 'dob', 'date of birth', 'years', 'months', 'days', 'seconds'],
    keywordsBn: ['বয়স', 'বয়স', 'জন্মতারিখ', 'জন্ম তারিখ', 'বছর', 'মাস', 'দিন', 'সেকেন্ড', 'ক্যালকুলেটর'],
    iconName: 'Clock',
  },
  {
    id: 'birthday-countdown',
    route: '/birthday-countdown',
    title: 'Birthday Countdown',
    titleBn: 'জন্মদিন কাউন্টডাউন',
    shortDescription:
      'Real-time countdown in days, hours, minutes, and seconds to your next birthday.',
    shortDescriptionBn:
      'আপনার পরবর্তী জন্মদিনের বাকি দিন, ঘণ্টা, মিনিট ও সেকেন্ডের লাইভ কাউন্টডাউন।',
    category: 'age',
    categoryLabel: 'Age & Time',
    categoryLabelBn: 'বয়স ও সময়',
    exploreCategory: 'age-birthday',
    exploreCategoryLabel: 'Age & Birthday',
    exploreCategoryLabelBn: 'বয়স ও জন্মদিন',
    popular: true,
    keywords: ['birthday', 'countdown', 'party', 'celebration', 'timer'],
    keywordsBn: ['জন্মদিন', 'কাউন্টডাউন', 'বার্থডে', 'উদযাপন', 'টাইমার', 'বাকি দিন'],
    iconName: 'Cake',
  },
  {
    id: 'next-birthday',
    route: '/next-birthday',
    title: 'Next Birthday',
    titleBn: 'পরবর্তী জন্মদিন',
    shortDescription:
      'View your next birthday date, weekday, turning age, and milestone timeline.',
    shortDescriptionBn:
      'আপনার পরবর্তী জন্মদিনের তারিখ, বার, আসন্ন বয়স এবং মাইলফলক তালিকা দেখুন।',
    category: 'age',
    categoryLabel: 'Age & Time',
    categoryLabelBn: 'বয়স ও সময়',
    exploreCategory: 'age-birthday',
    exploreCategoryLabel: 'Age & Birthday',
    exploreCategoryLabelBn: 'বয়স ও জন্মদিন',
    popular: false,
    keywords: ['next birthday', 'weekday', 'turning age', 'milestone'],
    keywordsBn: ['পরবর্তী জন্মদিন', 'জন্মদিন', 'আসন্ন জন্মদিন', 'বার', 'মাইলফলক'],
    iconName: 'Gift',
  },
  {
    id: 'future-age-calculator',
    route: '/future-age-calculator',
    title: 'Future Age',
    titleBn: 'ভবিষ্যৎ বয়স',
    shortDescription:
      'Preview your exact age in 2027, 2030, 2040, 2050, or any chosen future year.',
    shortDescriptionBn:
      '২০২৭, ২০৩০, ২০৪০, ২০৫০ বা যেকোনো ভবিষ্যৎ বছরে আপনার সঠিক বয়স কত হবে দেখুন।',
    category: 'milestones',
    categoryLabel: 'Milestones & Signs',
    categoryLabelBn: 'মাইলফলক ও রাশি',
    exploreCategory: 'age-birthday',
    exploreCategoryLabel: 'Age & Birthday',
    exploreCategoryLabelBn: 'বয়স ও জন্মদিন',
    popular: false,
    keywords: ['future age', '2030', '2040', '2050', 'projection'],
    keywordsBn: ['ভবিষ্যৎ বয়স', 'ভবিষ্যত বয়স', '২০৩০', '২০৪০', '২০৫০', 'আগামী বয়স'],
    iconName: 'Telescope',
  },
  {
    id: 'day-born-calculator',
    route: '/day-born-calculator',
    title: 'Day Born',
    titleBn: 'জন্মবার ক্যালকুলেটর',
    shortDescription:
      'See the exact weekday you were born, week number, season, and leap-year status.',
    shortDescriptionBn:
      'আপনার জন্মের সঠিক বার, বছরের দিন ও সপ্তাহ নম্বর এবং অধিবর্ষের তথ্য জানুন।',
    category: 'milestones',
    categoryLabel: 'Milestones & Signs',
    categoryLabelBn: 'মাইলফলক ও রাশি',
    exploreCategory: 'age-birthday',
    exploreCategoryLabel: 'Age & Birthday',
    exploreCategoryLabelBn: 'বয়স ও জন্মদিন',
    popular: false,
    keywords: ['day born', 'weekday', 'monday', 'friday', 'birth day'],
    keywordsBn: ['জন্মবার', 'কোন বার', 'বার', 'সপ্তাহের দিন', 'অধিবর্ষ', 'লিপ ইয়ার'],
    iconName: 'CalendarDays',
  },
  {
    id: 'friendship-calculator',
    route: '/friendship-calculator',
    title: 'Friendship Calculator',
    titleBn: 'বন্ধুত্ব ক্যালকুলেটর',
    shortDescription:
      'Measure how long a friendship has lasted and track upcoming 1,000-day milestones.',
    shortDescriptionBn:
      'আপনাদের বন্ধুত্বের বয়স কত এবং ১,০০০ দিনের মাইলফলক কবে আসবে তা হিসাব করুন।',
    category: 'relationships',
    categoryLabel: 'Relationships',
    categoryLabelBn: 'সম্পর্ক',
    exploreCategory: 'relationship',
    exploreCategoryLabel: 'Relationship',
    exploreCategoryLabelBn: 'সম্পর্ক ও বন্ধুত্ব',
    popular: true,
    keywords: ['friendship', 'friends', 'best friend', 'duration', 'anniversary'],
    keywordsBn: ['বন্ধুত্ব', 'বন্ধু', 'বেস্ট ফ্রেন্ড', 'বন্ধুত্বের বয়স', 'সময়কাল', 'বার্ষিকী'],
    iconName: 'Handshake',
  },
  {
    id: 'love-duration-calculator',
    route: '/love-duration-calculator',
    title: 'Love Duration',
    titleBn: 'ভালোবাসা ও সম্পর্কের সময়কাল',
    shortDescription:
      'Calculate exact relationship duration in years, months, days, and next anniversary.',
    shortDescriptionBn:
      'সম্পর্কের সঠিক সময়কাল বছর, মাস, দিন এবং পরবর্তী বার্ষিকীর কাউন্টডাউন দেখুন।',
    category: 'relationships',
    categoryLabel: 'Relationships',
    categoryLabelBn: 'সম্পর্ক',
    exploreCategory: 'relationship',
    exploreCategoryLabel: 'Relationship',
    exploreCategoryLabelBn: 'সম্পর্ক ও বন্ধুত্ব',
    popular: true,
    keywords: ['love', 'relationship', 'couple', 'anniversary', 'together'],
    keywordsBn: ['প্রেম', 'ভালোবাসা', 'ভালবাসা', 'সম্পর্ক', 'বার্ষিকী', 'কাপল', 'রিলেশনশিপ'],
    iconName: 'Heart',
  },
  {
    id: 'age-difference-calculator',
    route: '/age-difference-calculator',
    title: 'Age Difference',
    titleBn: 'বয়সের পার্থক্য',
    shortDescription:
      'Compare two birth dates to calculate the exact gap in years, months, and days.',
    shortDescriptionBn:
      'দুইজনের জন্মতারিখ তুলনা করে বছর, মাস ও দিনে বয়সের সঠিক পার্থক্য বের করুন।',
    category: 'relationships',
    categoryLabel: 'Relationships',
    categoryLabelBn: 'সম্পর্ক',
    exploreCategory: 'relationship',
    exploreCategoryLabel: 'Relationship',
    exploreCategoryLabelBn: 'সম্পর্ক ও বন্ধুত্ব',
    popular: true,
    keywords: ['age difference', 'age gap', 'compare', 'two people'],
    keywordsBn: ['বয়সের পার্থক্য', 'বয়সের পার্থক্য', 'তুলনা', 'দুইজন', 'ব্যবধান'],
    iconName: 'Scale',
  },
  {
    id: 'who-is-older',
    route: '/who-is-older',
    title: 'Who Is Older',
    titleBn: 'কে বড়',
    shortDescription:
      'Find out instantly who is older between two people and by how many exact days.',
    shortDescriptionBn:
      'দুইজনের মধ্যে কে বড় এবং ঠিক কত দিনের বড় তা মুহূর্তেই জেনে নিন।',
    category: 'relationships',
    categoryLabel: 'Relationships',
    categoryLabelBn: 'সম্পর্ক',
    exploreCategory: 'relationship',
    exploreCategoryLabel: 'Relationship',
    exploreCategoryLabelBn: 'সম্পর্ক ও বন্ধুত্ব',
    popular: false,
    keywords: ['who is older', 'older', 'younger', 'compare ages'],
    keywordsBn: ['কে বড়', 'কে বড়', 'কে ছোট', 'বয়স তুলনা', 'বড় কে'],
    iconName: 'Users',
  },
  {
    id: 'life-report',
    route: '/life-report',
    title: 'Life Report',
    titleBn: 'লাইফ রিপোর্ট',
    shortDescription:
      'Generate a shareable visual PNG Life Report card with your age, stats, and zodiac.',
    shortDescriptionBn:
      'আপনার বয়স, পরিসংখ্যান ও রাশিসহ শেয়ারযোগ্য ভিজ্যুয়াল পিএনজি লাইফ রিপোর্ট কার্ড তৈরি করুন।',
    category: 'milestones',
    categoryLabel: 'Life Statistics',
    categoryLabelBn: 'জীবনের পরিসংখ্যান',
    exploreCategory: 'life-statistics',
    exploreCategoryLabel: 'Life Statistics',
    exploreCategoryLabelBn: 'জীবনের পরিসংখ্যান',
    popular: true,
    keywords: ['life report', 'png', 'card', 'share', 'summary'],
    keywordsBn: ['লাইফ রিপোর্ট', 'জীবন রিপোর্ট', 'কার্ড', 'পিএনজি', 'শেয়ার', 'রিপোর্ট'],
    iconName: 'FileText',
  },
  {
    id: 'life-progress',
    route: '/age-calculator',
    title: 'Life Progress',
    titleBn: 'জীবনের অগ্রগতি',
    shortDescription:
      'Explore your lived days, heartbeats estimate, and illustrative 80-year benchmark.',
    shortDescriptionBn:
      'অতিবাহিত দিন, আনুমানিক হৃদস্পন্দন এবং ৮০ বছরের বেঞ্চমার্ক অগ্রগতি দেখুন।',
    category: 'age',
    categoryLabel: 'Life Statistics',
    categoryLabelBn: 'জীবনের পরিসংখ্যান',
    exploreCategory: 'life-statistics',
    exploreCategoryLabel: 'Life Statistics',
    exploreCategoryLabelBn: 'জীবনের পরিসংখ্যান',
    popular: false,
    keywords: ['life progress', 'life statistics', '80 years', 'heartbeats', 'breaths'],
    keywordsBn: ['জীবনের অগ্রগতি', 'জীবনের পরিসংখ্যান', '৮০ বছর', 'হৃদস্পন্দন', 'শ্বাসপ্রশ্বাস'],
    iconName: 'Activity',
  },
  {
    id: 'million-seconds-calculator',
    route: '/million-seconds-calculator',
    title: 'Million Seconds',
    titleBn: 'মিলিয়ন সেকেন্ড',
    shortDescription:
      'See how many million seconds you have lived and your next billion-second date.',
    shortDescriptionBn:
      'এ পর্যন্ত কত মিলিয়ন সেকেন্ড বেঁচেছেন এবং ১ বিলিয়ন সেকেন্ডের তারিখ জানুন।',
    category: 'milestones',
    categoryLabel: 'Milestones & Signs',
    categoryLabelBn: 'মাইলফলক ও রাশি',
    exploreCategory: 'life-statistics',
    exploreCategoryLabel: 'Life Statistics',
    exploreCategoryLabelBn: 'জীবনের পরিসংখ্যান',
    popular: false,
    keywords: ['million seconds', 'billion seconds', 'seconds lived', 'milestone'],
    keywordsBn: ['মিলিয়ন সেকেন্ড', 'বিলিয়ন সেকেন্ড', 'মোট সেকেন্ড', 'সেকেন্ড মাইলফলক'],
    iconName: 'Timer',
  },
  {
    id: 'retirement-calculator',
    route: '/retirement-calculator',
    title: 'Retirement Calculator',
    titleBn: 'অবসর ক্যালকুলেটর',
    shortDescription:
      'Count the exact days, weeks, and months remaining until your target retirement age.',
    shortDescriptionBn:
      'আপনার কাঙ্ক্ষিত অবসরের বয়স পর্যন্ত বাকি দিন, সপ্তাহ ও মাস নির্ণয় করুন।',
    category: 'milestones',
    categoryLabel: 'Milestones & Signs',
    categoryLabelBn: 'মাইলফলক ও রাশি',
    exploreCategory: 'life-statistics',
    exploreCategoryLabel: 'Life Statistics',
    exploreCategoryLabelBn: 'জীবনের পরিসংখ্যান',
    popular: false,
    keywords: ['retirement', 'retire', 'pension age', 'work'],
    keywordsBn: ['অবসর', 'পেনশন', 'রিটায়ারমেন্ট', 'অবসরের বয়স', 'কর্মজীবন'],
    iconName: 'Briefcase',
  },
  {
    id: 'zodiac-calculator',
    route: '/zodiac-calculator',
    title: 'Zodiac Calculator',
    titleBn: 'রাশি ক্যালকুলেটর',
    shortDescription:
      'Discover your Western zodiac sign, element, ruling planet, and core traits.',
    shortDescriptionBn:
      'জন্মতারিখ থেকে আপনার ওয়েস্টার্ন রাশি, উপাদান, অধিপতি গ্রহ এবং বৈশিষ্ট্য জানুন।',
    category: 'milestones',
    categoryLabel: 'Milestones & Signs',
    categoryLabelBn: 'মাইলফলক ও রাশি',
    exploreCategory: 'astrology',
    exploreCategoryLabel: 'Astrology',
    exploreCategoryLabelBn: 'জ্যোতিষ ও রাশিফল',
    popular: true,
    keywords: ['zodiac', 'astrology', 'horoscope', 'star sign', 'sun sign'],
    keywordsBn: ['রাশি', 'রাশিফল', 'জ্যোতিষ', 'তারকা চিহ্ন', 'রাশিচক্র', 'জোডিয়াক'],
    iconName: 'Sparkles',
  },
];

export function getLocalizedCalculator(calc: CalculatorMeta, lang: Language) {
  return {
    title: lang === 'bn' ? calc.titleBn : calc.title,
    shortDescription: lang === 'bn' ? calc.shortDescriptionBn : calc.shortDescription,
    categoryLabel: lang === 'bn' ? calc.categoryLabelBn : calc.categoryLabel,
    exploreCategoryLabel:
      lang === 'bn' ? calc.exploreCategoryLabelBn : calc.exploreCategoryLabel,
  };
}

export function getLocalizedCategory(cat: ExploreCategoryMeta, lang: Language) {
  return {
    label: lang === 'bn' ? cat.labelBn : cat.label,
    description: lang === 'bn' ? cat.descriptionBn : cat.description,
  };
}
