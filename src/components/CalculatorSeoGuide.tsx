import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getBlogArticles } from '../data/blogArticles';
import { getCalculatorSeoGuide } from '../data/calculatorSeoContent';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, KnownRoute, PageRoute } from '../utils/seo';

interface CalculatorSeoGuideProps {
  route: KnownRoute;
  onNavigate: (route: PageRoute) => void;
}

export const CalculatorSeoGuide: React.FC<CalculatorSeoGuideProps> = ({
  route,
  onNavigate,
}) => {
  const { lang, dict, fmt } = useLanguage();
  const guide = getCalculatorSeoGuide(route, lang);
  if (!guide) return null;

  const relatedArticles = getBlogArticles(lang).filter((a) =>
    guide.relatedBlogSlugs.includes(a.slug)
  );

  return (
    <div className="mt-5 space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
      {/* How to Calculate & Step-by-Step Instructions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="space-y-2.5 lg:col-span-6">
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-white">
            {dict.seoGuide.howToCalculate}
          </h2>
          <p className="text-[12px] leading-relaxed text-slate-600 sm:text-[13px] dark:text-slate-300">
            {guide.howToCalculate}
          </p>

          <div className="rounded-[10px] border border-slate-200 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            <h3 className="text-[12px] font-semibold text-slate-900 dark:text-white">
              {dict.seoGuide.formulaTitle}
            </h3>
            <p className="mt-1 font-mono-num text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
              {guide.formula}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-white">
            {dict.seoGuide.stepsTitle}
          </h2>
          <ol className="mt-2.5 space-y-2">
            {guide.steps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[12px] text-slate-600 sm:text-[13px] dark:text-slate-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border border-slate-200 bg-slate-50 font-mono-num text-[11px] font-semibold text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400">
                  {fmt(idx + 1)}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Practical Examples */}
      <div>
        <h2 className="text-[17px] font-bold text-slate-900 dark:text-white">
          {dict.seoGuide.examplesTitle}
        </h2>
        <div className="mt-2.5 grid grid-cols-1 gap-[10px] sm:grid-cols-2">
          {guide.examples.map((ex, idx) => (
            <div
              key={idx}
              className="rounded-[10px] border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-[#101726]"
            >
              <p className="text-[13px] font-semibold text-slate-900 dark:text-white">
                {ex.scenario}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                {ex.calculation}
              </p>
              <p className="mt-1.5 text-[12px] font-semibold text-blue-600 dark:text-blue-400">
                {dict.common.resultLabel}: {ex.result}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-[17px] font-bold text-slate-900 dark:text-white">
          {dict.seoGuide.faqTitle}
        </h2>
        <dl className="mt-2.5 divide-y divide-slate-200 rounded-[10px] border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-[#101726]">
          {guide.faqs.map((faq, idx) => (
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
      </div>

      {/* Useful Internal Links (Blog Articles & Tools) */}
      {relatedArticles.length > 0 && (
        <div className="rounded-[10px] border border-slate-200 bg-slate-50/60 p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-[14px] font-bold text-slate-900 dark:text-white">
                {dict.seoGuide.relatedReadingTitle}
              </h2>
            </div>
            <a
              href={buildLocalizedPath('/blog', lang)}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              {dict.common.viewAllArticles}
            </a>
          </div>

          <div className="mt-2.5 grid grid-cols-1 gap-[10px] sm:grid-cols-3">
            {relatedArticles.map((article) => (
              <a
                key={article.slug}
                href={buildLocalizedPath(`/blog/${article.slug}`, lang)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/blog/${article.slug}`);
                }}
                className="group flex flex-col justify-between rounded-[10px] border border-slate-200 bg-white p-3 transition-colors hover:border-blue-600/40 dark:border-slate-800 dark:bg-[#101726]"
              >
                <span className="text-[13px] font-semibold leading-snug text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {article.title}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                  <span>{dict.common.readGuide}</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
