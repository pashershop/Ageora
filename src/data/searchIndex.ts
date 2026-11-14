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
  kind: 'calculator' | 'category' | 'blog';
  iconName: CalculatorMeta['iconName'] | 'BookOpen' | 'Compass';
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

  return [...calcItems, ...categoryItems, ...blogItems];
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
