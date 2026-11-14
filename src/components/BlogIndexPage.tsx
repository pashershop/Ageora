import React, { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { getBlogArticles } from '../data/blogArticles';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface BlogIndexPageProps {
  onNavigate: (route: PageRoute) => void;
}

const ALL_CATEGORY_TOKEN = '__ALL__';

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ onNavigate }) => {
  const { lang, dict, fmtPad, tr } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORY_TOKEN);

  const articles = useMemo(() => getBlogArticles(lang), [lang]);

  const categories = useMemo(
    () => [ALL_CATEGORY_TOKEN, ...Array.from(new Set(articles.map((a) => a.category)))],
    [articles]
  );

  const activeCategory = categories.includes(selectedCategory)
    ? selectedCategory
    : ALL_CATEGORY_TOKEN;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const catMatch =
        activeCategory === ALL_CATEGORY_TOKEN || a.category === activeCategory;
      const textMatch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [articles, query, activeCategory]);

  return (
    <section className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      <nav
        aria-label="Breadcrumb"
        className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
      >
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {dict.nav.home}
        </a>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-700 dark:text-slate-200">
          {dict.nav.blog}
        </span>
      </nav>

      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-balance text-[24px] font-extrabold tracking-tight text-slate-900 sm:text-[26px] dark:text-white">
            {dict.blog.title}
          </h1>
          <p className="mt-1 max-w-2xl text-[12px] text-slate-600 sm:text-[13px] dark:text-slate-300">
            {dict.blog.subtitle}
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.blog.searchPlaceholder}
            aria-label={dict.blog.searchAria}
            className="h-[38px] w-full rounded-[8px] border border-slate-200 bg-white pl-8 pr-3 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-3 flex max-w-full items-center gap-1 overflow-x-auto rounded-[8px] border border-slate-200 bg-slate-50 p-1 w-fit dark:border-slate-800 dark:bg-slate-900/70">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`h-[30px] shrink-0 rounded-[6px] px-2.5 text-[11px] font-semibold transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-white text-slate-900 shadow-2xs dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {cat === ALL_CATEGORY_TOKEN ? dict.blog.allCategory : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="mt-4 rounded-[10px] border border-slate-200 bg-slate-50/70 p-5 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-[14px] font-semibold text-slate-900 dark:text-white">
            {tr(dict.blog.noMatch, { query })}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory(ALL_CATEGORY_TOKEN);
            }}
            className="mt-3 inline-flex h-[34px] items-center rounded-[8px] bg-blue-600 px-[14px] text-[12px] font-semibold text-white hover:bg-blue-700"
          >
            {dict.blog.showAllBtn}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-[10px] md:grid-cols-2">
          {filtered.map((article, idx) => (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-[10px] border border-slate-200 bg-white p-3 shadow-2xs transition-colors hover:border-blue-600/40 dark:border-slate-800 dark:bg-[#101726] dark:hover:border-blue-500/50"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-mono-num font-semibold text-blue-600 dark:text-blue-400">
                    {fmtPad(idx + 1)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readingTime}</span>
                </div>

                <h2 className="mt-1.5 text-[15px] font-bold leading-snug text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  <a
                    href={buildLocalizedPath(article.route, lang)}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(article.route);
                    }}
                  >
                    {article.title}
                  </a>
                </h2>

                <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                  {article.summary}
                </p>
              </div>

              <div className="mt-2.5">
                <a
                  href={buildLocalizedPath(article.route, lang)}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(article.route);
                  }}
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 dark:text-blue-400"
                >
                  <span>{dict.common.readArticle}</span>
                  <ArrowRight className="h-[14px] w-[14px] transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
