import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Moon, Search, Sun } from 'lucide-react';
import { useLanguage } from '../i18n';
import { Language } from '../i18n/types';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onChangeLanguage: (nextLang: Language) => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onChangeLanguage,
  onOpenSearch,
  isDark,
  onToggleTheme,
}) => {
  const { lang, numeralMode, setNumeralMode, dict } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [langMenuOpen]);

  const navItems: { label: string; route: PageRoute }[] = [
    { label: dict.nav.home, route: '/' },
    { label: dict.nav.explore, route: '/explore' },
    { label: dict.nav.favorites, route: '/favorites' },
    { label: dict.nav.history, route: '/history' },
    { label: dict.nav.blog, route: '/blog' },
  ];

  const handleLinkClick = (e: React.MouseEvent, route: PageRoute) => {
    e.preventDefault();
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800/90 dark:bg-[#090D16]/95">
      <div className="mx-auto flex h-[52px] max-w-6xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4">
        {/* Zone 1: Compact 22px Logo + Brand */}
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={(e) => handleLinkClick(e, '/')}
          className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 text-[15px] font-bold tracking-tight text-[#111827] dark:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded-[8px]"
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

        {/* Zone 2: Desktop Navigation (13px font) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-5"
        >
          {navItems.map((item) => {
            const isBlogActive =
              item.route === '/blog' &&
              (currentRoute === '/blog' || currentRoute.startsWith('/blog/'));

            const isExploreActive =
              item.route === '/explore' &&
              (currentRoute === '/explore' || currentRoute === '/all-calculators');

            const isActive =
              currentRoute === item.route || isBlogActive || isExploreActive;

            return (
              <a
                key={item.route}
                href={buildLocalizedPath(item.route, lang)}
                onClick={(e) => handleLinkClick(e, item.route)}
                className={`whitespace-nowrap shrink-0 text-[13px] font-medium transition-colors py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'border-[#2563EB] text-[#111827] dark:text-white'
                    : 'border-transparent text-[#6B7280] hover:text-[#111827] dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 34px Search Input Trigger + Compact Language Switcher + Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={dict.header.searchAria}
            className="hidden sm:inline-flex h-[34px] w-40 lg:w-52 items-center justify-between gap-2 rounded-[8px] border border-[#E5E7EB] bg-slate-50/80 px-2.5 text-[12px] text-[#6B7280] transition-colors hover:border-blue-600/40 hover:bg-white hover:text-[#111827] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-white"
          >
            <span className="inline-flex items-center gap-1.5 truncate">
              <Search className="h-[15px] w-[15px] shrink-0" />
              <span className="truncate">{dict.header.searchPlaceholder}</span>
            </span>
            <kbd className="rounded border border-[#E5E7EB] bg-white px-1 py-0.5 font-mono-num text-[10px] leading-none text-[#6B7280] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              /
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={dict.header.openSearchAria}
            className="inline-flex sm:hidden h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Search className="h-[15px] w-[15px]" />
          </button>

          {/* Compact Language Switcher */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={langMenuOpen}
              aria-label={dict.header.switchLanguageAria}
              className="inline-flex h-[34px] items-center gap-1 rounded-[8px] border border-[#E5E7EB] bg-white px-2 text-[12px] font-semibold text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              <span aria-hidden="true" className="text-[13px] leading-none">
                {lang === 'bn' ? '🇧🇩' : '🇬🇧'}
              </span>
              <span className="sm:hidden">{lang === 'bn' ? 'বাংলা' : 'EN'}</span>
              <span className="hidden sm:inline">
                {lang === 'bn' ? dict.header.banglaOption : dict.header.englishOption}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[#6B7280] dark:text-slate-400" />
            </button>

            {langMenuOpen && (
              <div
                role="menu"
                aria-label={dict.header.languageLabel}
                className="absolute right-0 mt-1.5 w-52 rounded-[10px] border border-[#E5E7EB] bg-white p-1.5 shadow-lg dark:border-slate-800 dark:bg-[#101726]"
              >
                <div className="px-2 py-1 text-[10px] font-semibold text-[#6B7280] dark:text-slate-400">
                  {dict.header.languageLabel}
                </div>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={lang === 'en'}
                  onClick={() => {
                    onChangeLanguage('en');
                    setLangMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[7px] px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                    lang === 'en'
                      ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400'
                      : 'text-[#111827] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">🇬🇧</span>
                    <span>{dict.header.englishOption}</span>
                  </span>
                  {lang === 'en' && <Check className="h-3.5 w-3.5" />}
                </button>

                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={lang === 'bn'}
                  onClick={() => {
                    onChangeLanguage('bn');
                    setLangMenuOpen(false);
                  }}
                  className={`mt-0.5 flex w-full items-center justify-between rounded-[7px] px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                    lang === 'bn'
                      ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400'
                      : 'text-[#111827] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">🇧🇩</span>
                    <span>{dict.header.banglaOption}</span>
                  </span>
                  {lang === 'bn' && <Check className="h-3.5 w-3.5" />}
                </button>

                {lang === 'bn' && (
                  <div className="mt-1.5 border-t border-[#E5E7EB] pt-1.5 dark:border-slate-800">
                    <div className="px-2 py-1 text-[10px] font-semibold text-[#6B7280] dark:text-slate-400">
                      {dict.header.numeralsLabel}
                    </div>
                    <button
                      type="button"
                      onClick={() => setNumeralMode('bn')}
                      className={`flex w-full items-center justify-between rounded-[7px] px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                        numeralMode === 'bn'
                          ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400'
                          : 'text-[#111827] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{dict.header.numeralsBn}</span>
                      {numeralMode === 'bn' && <Check className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNumeralMode('en')}
                      className={`mt-0.5 flex w-full items-center justify-between rounded-[7px] px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                        numeralMode === 'en'
                          ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400'
                          : 'text-[#111827] hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{dict.header.numeralsEn}</span>
                      {numeralMode === 'en' && <Check className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? dict.header.switchToLight : dict.header.switchToDark}
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white text-[#111827] transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <Sun className="h-[15px] w-[15px]" />
            ) : (
              <Moon className="h-[15px] w-[15px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
