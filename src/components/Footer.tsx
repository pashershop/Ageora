import React from 'react';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, dict } = useLanguage();

  const links: { label: string; route: PageRoute }[] = [
    { label: dict.nav.home, route: '/' },
    { label: dict.nav.explore, route: '/explore' },
    { label: dict.nav.favorites, route: '/favorites' },
    { label: dict.nav.history, route: '/history' },
    { label: dict.nav.blog, route: '/blog' },
    { label: dict.nav.about, route: '/about' },
    { label: dict.nav.privacy, route: '/privacy-policy' },
    { label: dict.nav.terms, route: '/terms' },
    { label: dict.nav.disclaimer, route: '/disclaimer' },
    { label: dict.nav.contact, route: '/contact' },
  ];

  const handleNav = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <footer className="border-t border-[#E5E7EB] bg-slate-50/60 dark:border-slate-800/80 dark:bg-[#0B101B]">
      <div className="mx-auto max-w-6xl px-4 pt-5 pb-20 sm:px-6 md:py-5 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center gap-2 text-[15px] font-bold tracking-tight text-[#111827] dark:text-white"
            >
              <span
                aria-hidden="true"
                className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[#2563EB] text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path
                    d="M12 7.5V12l3 1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{dict.brand.name}</span>
            </a>
            <p className="mt-1 text-[12px] text-[#6B7280] dark:text-slate-400">
              {dict.brand.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-2"
          >
            {links.map((link) => (
              <a
                key={link.route}
                href={buildLocalizedPath(link.route, lang)}
                onClick={(e) => handleNav(e, link.route)}
                className="text-[12px] font-medium text-[#6B7280] transition-colors hover:text-[#111827] dark:text-slate-400 dark:hover:text-white whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t border-[#E5E7EB] pt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
          <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
            {dict.footer.copyright}
          </p>
          <p className="text-[11px] text-[#6B7280] dark:text-slate-400">
            {dict.footer.localNote}
          </p>
        </div>
      </div>
    </footer>
  );
};
