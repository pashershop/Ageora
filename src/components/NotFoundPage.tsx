import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface NotFoundPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();

  return (
    <section className="mx-auto max-w-3xl px-3 py-8 text-center sm:px-4 sm:py-12 lg:px-6">
      <p className="font-mono-num text-[12px] font-semibold text-blue-600 dark:text-blue-400">
        {dict.notFound.code}
      </p>
      <h1 className="mt-2 text-balance text-[24px] font-extrabold tracking-tight text-slate-900 sm:text-[26px] dark:text-white">
        {dict.notFound.title}
      </h1>
      <p className="mx-auto mt-2 max-w-md text-[13px] text-slate-600 dark:text-slate-300">
        {dict.notFound.desc}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="inline-flex h-[38px] items-center gap-1.5 rounded-[8px] bg-blue-600 px-[14px] text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <span>{dict.notFound.homeBtn}</span>
          <ArrowRight className="h-[15px] w-[15px]" />
        </a>

        <a
          href={buildLocalizedPath('/explore', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/explore');
          }}
          className="inline-flex h-[34px] items-center rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          {dict.notFound.exploreBtn}
        </a>

        <a
          href={buildLocalizedPath('/blog', lang)}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/blog');
          }}
          className="inline-flex h-[34px] items-center rounded-[8px] border border-slate-200 bg-white px-[14px] text-[12px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          {dict.notFound.blogBtn}
        </a>
      </div>
    </section>
  );
};
