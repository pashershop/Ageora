import React from 'react';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { getBlogArticles } from '../data/blogArticles';
import { useLanguage } from '../i18n';
import { BlogArticleSlug, buildLocalizedPath, PageRoute } from '../utils/seo';
import { AdSlot } from './AdSlot';

interface BlogArticlePageProps {
  slug: BlogArticleSlug;
  onNavigate: (route: PageRoute) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug, onNavigate }) => {
  const { lang, dict } = useLanguage();
  const articles = getBlogArticles(lang);
  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articleIndex >= 0 ? articles[articleIndex] : articles[0];
  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
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
        <a
          href={buildLocalizedPath('/blog', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/blog');
          }}
          className="hover:text-blue-600 dark:hover:text-blue-400"
        >
          {dict.nav.blog}
        </a>
        <span aria-hidden="true">/</span>
        <span className="truncate font-medium text-slate-700 dark:text-slate-200">
          {article.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <span className="text-blue-600 dark:text-blue-400">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>{dict.blog.referenceGuideBadge}</span>
        </div>

        <h1 className="mt-1.5 text-balance text-[24px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[26px] dark:text-white">
          {article.title}
        </h1>

        <p className="mt-2 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
          {article.introduction}
        </p>
      </header>

      {/* Detailed Explanation (First Section) */}
      <div className="mt-4 space-y-4">
        {article.sections.slice(0, 1).map((sec, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-[17px] font-bold text-slate-900 sm:text-[18px] dark:text-white">
              {sec.heading}
            </h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Mid-Article Ad Placement */}
        <AdSlot placement="inArticle" />

        {/* Remaining Explanation Sections */}
        {article.sections.slice(1).map((sec, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-[17px] font-bold text-slate-900 sm:text-[18px] dark:text-white">
              {sec.heading}
            </h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p
                key={pIdx}
                className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Practical Examples */}
        <section className="space-y-2.5">
          <h2 className="text-[17px] font-bold text-slate-900 sm:text-[18px] dark:text-white">
            {dict.blog.workedExamples}
          </h2>
          <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {article.examples.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-[#101726]"
              >
                <h3 className="text-[13px] font-bold text-slate-900 dark:text-white">
                  {ex.title}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {ex.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Relevant Calculator Links */}
        <section className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-3 sm:p-4 dark:border-slate-800 dark:bg-[#101726]">
          <div className="flex items-center gap-1.5">
            <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-[14px] font-bold text-slate-900 dark:text-white">
              {dict.blog.tryCalculators}
            </h2>
          </div>
          <div className="mt-2.5 grid grid-cols-1 gap-[10px] sm:grid-cols-2">
            {article.relatedCalculators.map((calc) => (
              <a
                key={calc.route}
                href={buildLocalizedPath(calc.route, lang)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(calc.route);
                }}
                className="group flex flex-col justify-between rounded-[10px] border border-slate-200 bg-white p-3 transition-colors hover:border-blue-600/40 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div>
                  <span className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {calc.label}
                  </span>
                  <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                    {calc.description}
                  </p>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  <span>{dict.common.openCalculator}</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-2.5">
          <h2 className="text-[17px] font-bold text-slate-900 sm:text-[18px] dark:text-white">
            {dict.blog.faqTitle}
          </h2>
          <dl className="divide-y divide-slate-200 rounded-[10px] border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-[#101726]">
            {article.faqs.map((faq, idx) => (
              <div key={idx} className="p-3">
                <dt className="text-[13px] font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* More Blog Guides */}
      <footer className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-bold text-slate-900 dark:text-white">
            {dict.blog.moreGuides}
          </h2>
          <a
            href={buildLocalizedPath('/blog', lang)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/blog');
            }}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>{dict.common.backToBlog}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3">
          {otherArticles.map((other) => (
            <a
              key={other.slug}
              href={buildLocalizedPath(other.route, lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(other.route);
              }}
              className="rounded-[10px] border border-slate-200 bg-white p-3 text-[13px] font-semibold text-slate-900 transition-colors hover:border-blue-600/40 hover:text-blue-600 dark:border-slate-800 dark:bg-[#101726] dark:text-white dark:hover:text-blue-400"
            >
              {other.title}
            </a>
          ))}
        </div>
      </footer>
    </article>
  );
};
