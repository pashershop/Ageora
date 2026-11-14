import { Language } from '../i18n/types';
import { KnownRoute } from '../utils/seo';
import { BLOG_ARTICLES, BLOG_ARTICLES_BN } from './blogArticles';
import {
  CALCULATORS_CATALOG,
  CalculatorMeta,
  EXPLORE_CATEGORIES,
  getLocalizedCalculator,
  getLocalizedCategory,
} from './calculatorsCatalog';

export interface SearchItem {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  route: KnownRoute;
  kind: 'calculator' | 'category' | 'blog' | 'page';
  iconName: CalculatorMeta['iconName'] | 'BookOpen' | 'Compass' | 'Bookmark' | 'History';
  keywords: string[];
  searchCorpus: string[];
}

export const POPULAR_SEARCH_TERMS_EN = [
  'Age',
  'Birthday',
  'Friendship',
  'Love',
  'Zodiac',
  'Life Report',
  'Future Age',
];

export const POPULAR_SEARCH_TERMS_BN = [
  'বয়স',
  'জন্মদিন',
  'বন্ধুত্ব',
  'প্রেম',
  'রাশি',
  'লাইফ রিপোর্ট',
  'ভবিষ্যৎ বয়স',
];

export function getPopularSearchTerms(lang: Language): string[] {
  return lang === 'bn' ? POPULAR_SEARCH_TERMS_BN : POPULAR_SEARCH_TERMS_EN;
}

export function getSearchIndex(lang: Language): SearchItem[] {
  const calcItems: SearchItem[] = CALCULATORS_CATALOG.map((calc) => {
    const loc = getLocalizedCalculator(calc, lang);
    return {
      id: calc.id,
      title: loc.title,
      shortDescription: loc.shortDescription,
      category: loc.exploreCategoryLabel,
      route: calc.route,
      kind: 'calculator',
      iconName: calc.iconName,
      keywords: [...calc.keywords, ...calc.keywordsBn],
      searchCorpus: [
        calc.title,
        calc.titleBn,
        calc.shortDescription,
        calc.shortDescriptionBn,
        calc.categoryLabel,
        calc.categoryLabelBn,
        calc.exploreCategoryLabel,
        calc.exploreCategoryLabelBn,
        ...calc.keywords,
        ...calc.keywordsBn,
      ].map((s) => s.toLowerCase()),
    };
  });

  const categoryItems: SearchItem[] = EXPLORE_CATEGORIES.map((cat) => {
    const loc = getLocalizedCategory(cat, lang);
    return {
      id: `cat-${cat.id}`,
      title: loc.label,
      shortDescription: loc.description,
      category: lang === 'bn' ? 'বিভাগ' : 'Category',
      route: '/explore',
      kind: 'category',
      iconName: 'Compass',
      keywords: [cat.label, cat.labelBn, 'explore', 'category', 'বিভাগ', 'ক্যাটাগরি'],
      searchCorpus: [
        cat.label,
        cat.labelBn,
        cat.description,
        cat.descriptionBn,
        'explore',
        'category',
        'বিভাগ',
        'ক্যাটাগরি',
      ].map((s) => s.toLowerCase()),
    };
  });

  const blogItems: SearchItem[] = BLOG_ARTICLES.map((articleEn, idx) => {
    const articleBn = BLOG_ARTICLES_BN[idx] ?? articleEn;
    const active = lang === 'bn' ? articleBn : articleEn;
    return {
      id: `blog-${active.slug}`,
      title: active.title,
      shortDescription: active.summary,
      category: `${lang === 'bn' ? 'ব্লগ' : 'Blog'} · ${active.category}`,
      route: active.route,
      kind: 'blog',
      iconName: 'BookOpen',
      keywords: [
        articleEn.category,
        articleBn.category,
        'guide',
        'article',
        'blog',
        'ব্লগ',
        'গাইড',
        'প্রবন্ধ',
      ],
      searchCorpus: [
        articleEn.title,
        articleBn.title,
        articleEn.summary,
        articleBn.summary,
        articleEn.category,
        articleBn.category,
        'guide',
        'article',
        'blog',
        'ব্লগ',
        'গাইড',
        'প্রবন্ধ',
      ].map((s) => s.toLowerCase()),
    };
  });

  const pageItems: SearchItem[] = [
    {
      id: 'page-explore',
      title: lang === 'bn' ? 'সব ক্যালকুলেটর দেখুন' : 'Explore All Calculators',
      shortDescription:
        lang === 'bn'
          ? 'সব বয়স, জন্মদিন, সম্পর্ক ও জীবনের পরিসংখ্যান টুল একসাথে দেখুন।'
          : 'Browse every age, birthday, relationship, and life statistics tool.',
      category: lang === 'bn' ? 'পেজ' : 'Page',
      route: '/explore',
      kind: 'page',
      iconName: 'Compass',
      keywords: ['explore', 'all calculators', 'tools', 'এক্সপ্লোর', 'সব ক্যালকুলেটর'],
      searchCorpus: [
        'explore',
        'all calculators',
        'tools',
        'directory',
        'এক্সপ্লোর',
        'সব ক্যালকুলেটর',
        'টুলস',
      ],
    },
    {
      id: 'page-favorites',
      title: lang === 'bn' ? 'প্রিয় ক্যালকুলেটর' : 'Favorite Calculators',
      shortDescription:
        lang === 'bn'
          ? 'আপনার সংরক্ষিত প্রিয় ক্যালকুলেটরগুলোর তালিকা।'
          : 'Quick access to your saved favorite calculators.',
      category: lang === 'bn' ? 'পেজ' : 'Page',
      route: '/favorites',
      kind: 'page',
      iconName: 'Bookmark',
      keywords: ['favorites', 'saved', 'bookmarks', 'প্রিয়', 'পছন্দ'],
      searchCorpus: ['favorites', 'saved', 'bookmarks', 'প্রিয়', 'পছন্দ', 'সংরক্ষিত'],
    },
    {
      id: 'page-history',
      title: lang === 'bn' ? 'সাম্প্রতিক ব্যবহারের ইতিহাস' : 'Recent History',
      shortDescription:
        lang === 'bn'
          ? 'সম্প্রতি ব্যবহৃত ক্যালকুলেটরগুলোর তালিকা দেখুন।'
          : 'View calculators you recently opened in this browser.',
      category: lang === 'bn' ? 'পেজ' : 'Page',
      route: '/history',
      kind: 'page',
      iconName: 'History',
      keywords: ['history', 'recent', 'activity', 'ইতিহাস', 'সাম্প্রতিক'],
      searchCorpus: ['history', 'recent', 'activity', 'ইতিহাস', 'সাম্প্রতিক'],
    },
    {
      id: 'page-blog',
      title: lang === 'bn' ? 'ব্লগ ও গাইড' : 'Blog & Guides',
      shortDescription:
        lang === 'bn'
          ? 'বয়স হিসাব, অধিবর্ষ, রাশিচক্র ও জীবনের মাইলফলক নিয়ে গাইড পড়ুন।'
          : 'Read practical guides on age math, leap years, zodiac, and milestones.',
      category: lang === 'bn' ? 'পেজ' : 'Page',
      route: '/blog',
      kind: 'page',
      iconName: 'BookOpen',
      keywords: ['blog', 'guides', 'articles', 'ব্লগ', 'গাইড', 'প্রবন্ধ'],
      searchCorpus: ['blog', 'guides', 'articles', 'ব্লগ', 'গাইড', 'প্রবন্ধ'],
    },
  ];

  return [...calcItems, ...categoryItems, ...blogItems, ...pageItems];
}

export function searchAgeoraItems(query: string, lang: Language = 'en'): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = getSearchIndex(lang);

  const scored = index
    .map((item) => {
      const titleLower = item.title.toLowerCase();
      const catLower = item.category.toLowerCase();
      const descLower = item.shortDescription.toLowerCase();
      const kwMatch = item.keywords.some((k) => k.toLowerCase().includes(q));
      const corpusMatch = item.searchCorpus.some((entry) => entry.includes(q));

      let score = 0;
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 60;
      else if (titleLower.includes(q)) score += 45;

      if (kwMatch) score += 35;
      if (corpusMatch && score === 0) score += 28;
      if (catLower.includes(q)) score += 20;
      if (descLower.includes(q)) score += 10;

      if (item.kind === 'calculator' && score > 0) score += 5;

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.item);
}
