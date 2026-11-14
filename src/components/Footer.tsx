import React from 'react';
import { useLanguage } from '../i18n';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, numeralMode, setNumeralMode, dict } = useLanguage();

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
    <footer className="bg-ageora-footer border-t border-[#1E3B5C] text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href={buildLocalizedPath('/', lang)}
              onClick={(e) => handleNav(e, '/')}
              className="inline-flex items-center gap-2 text-[16px] font-bold tracking-[-0.02em] text-white"
            >
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#1B3A5C] text-white ring-1 ring-white/15"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M12 4.5a7.5 7.5 0 1 0 7.5 7.5"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 8.2V12l2.8 1.6"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="18.2" cy="5.8" r="2.1" fill="#E89B45" />
                </svg>
              </span>
              <span>{dict.brand.name}</span>
            </a>
            <p className="mt-1 text-[12px] text-slate-300">
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
                className="text-[12px] font-medium text-slate-300 transition-colors hover:text-[#E89B45] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t border-white/10 pt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-300">
            {dict.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {lang === 'bn' && (
              <div
                role="group"
                aria-label={dict.header.numeralsLabel}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5 text-[11px]"
              >
                <button
                  type="button"
                  onClick={() => setNumeralMode('bn')}
                  aria-pressed={numeralMode === 'bn'}
                  className={`rounded-full px-2 py-0.5 font-medium transition-colors ${
                    numeralMode === 'bn'
                      ? 'bg-[#E89B45] text-[#142B45]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ১২৩
                </button>
                <button
                  type="button"
                  onClick={() => setNumeralMode('en')}
                  aria-pressed={numeralMode === 'en'}
                  className={`rounded-full px-2 py-0.5 font-medium transition-colors ${
                    numeralMode === 'en'
                      ? 'bg-[#E89B45] text-[#142B45]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  123
                </button>
              </div>
            )}
            <p className="text-[11px] text-slate-400">
              {dict.footer.localNote}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
