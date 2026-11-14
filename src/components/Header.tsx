import React, { useEffect, useState } from 'react';
import { Check, Moon, Search, Sun } from 'lucide-react';
import { useLanguage } from '../i18n';
import { Language } from '../i18n/types';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface HeaderProps {
  onNavigate: (route: PageRoute) => void;
  onChangeLanguage: (nextLang: Language) => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onChangeLanguage,
  onOpenSearch,
  isDark,
  onToggleTheme,
}) => {
  const { lang, dict } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('/');
  };

  const handleSelectLanguage = (nextLang: Language) => {
    if (nextLang !== lang) {
      onChangeLanguage(nextLang);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-[#E7E5DF] bg-white/95 backdrop-blur-lg shadow-[0_1px_6px_rgba(20,43,69,0.05)] dark:border-slate-800 dark:bg-[#090D16]/95 dark:shadow-[0_1px_8px_rgba(0,0,0,0.28)]'
          : 'border-[#E7E5DF]/90 bg-white/85 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090D16]/85'
      }`}
    >
      <div className="mx-auto flex h-[58px] max-w-6xl items-center justify-between gap-2 px-3 max-[359px]:px-2 sm:px-5 md:h-[68px] lg:px-6">
        {/* LEFT: Minimal Ageora Brand Mark + Wordmark */}
        <a
          href={buildLocalizedPath('/', lang)}
          onClick={handleLogoClick}
          className="group inline-flex min-h-[44px] items-center gap-2 max-[359px]:gap-1.5 rounded-[10px] py-1 pr-1.5 whitespace-nowrap shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] dark:focus-visible:outline-[#E89B45]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#142B45] text-white transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] dark:bg-[#1B3A5C] dark:ring-1 dark:ring-white/15"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px] md:h-5 md:w-5"
              fill="none"
            >
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
          <span className="font-display text-[17px] font-bold tracking-[-0.025em] text-[#142B45] sm:text-[19px] dark:text-white">
            {dict.brand.name}
          </span>
        </a>

        {/* RIGHT: Premium Language Switcher + Search Button + Theme Toggle */}
        <div className="flex items-center gap-1.5 max-[359px]:gap-1 sm:gap-2.5 shrink-0">
          {/* Segmented Capsule Language Switcher */}
          <div
            role="group"
            aria-label={dict.header.languageLabel}
            className="relative inline-grid h-[44px] grid-cols-2 items-center rounded-full border border-[#E7E5DF] bg-[#FAFAF7] p-[3px] shadow-[0_1px_2px_rgba(20,43,69,0.04)] dark:border-slate-700/80 dark:bg-[#101726]"
          >
            {/* Sliding Active Pill */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-[#142B45] shadow-[0_1px_3px_rgba(20,43,69,0.22)] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-[#1E4068] ${
                lang === 'bn' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />

            <button
              type="button"
              onClick={() => handleSelectLanguage('en')}
              aria-pressed={lang === 'en'}
              aria-label={dict.header.englishOption}
              className={`relative z-10 inline-flex h-full min-w-[54px] max-[359px]:min-w-[46px] sm:min-w-[104px] items-center justify-center gap-1.5 rounded-full px-2 sm:px-3.5 text-[11.5px] font-semibold leading-none tracking-[0.02em] whitespace-nowrap transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] dark:focus-visible:outline-[#E89B45] ${
                lang === 'en'
                  ? 'text-white'
                  : 'text-[#142B45]/75 hover:text-[#142B45] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span aria-hidden="true" className="text-[13px] sm:text-[14px] leading-none">
                🇬🇧
              </span>
              <span className="sm:hidden">EN</span>
              <span className="hidden sm:inline">ENGLISH</span>
              {lang === 'en' && (
                <Check
                  aria-hidden="true"
                  strokeWidth={2.75}
                  className="hidden sm:block h-3 w-3 shrink-0 text-[#E89B45]"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSelectLanguage('bn')}
              aria-pressed={lang === 'bn'}
              aria-label={dict.header.banglaOption}
              className={`relative z-10 inline-flex h-full min-w-[54px] max-[359px]:min-w-[46px] sm:min-w-[104px] items-center justify-center gap-1.5 rounded-full px-2 sm:px-3.5 text-[12px] font-semibold leading-none whitespace-nowrap transition-colors duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] dark:focus-visible:outline-[#E89B45] ${
                lang === 'bn'
                  ? 'text-white'
                  : 'text-[#142B45]/75 hover:text-[#142B45] dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <span aria-hidden="true" className="text-[13px] sm:text-[14px] leading-none">
                🇧🇩
              </span>
              <span>বাংলা</span>
              {lang === 'bn' && (
                <Check
                  aria-hidden="true"
                  strokeWidth={2.75}
                  className="hidden sm:block h-3 w-3 shrink-0 text-[#E89B45]"
                />
              )}
            </button>
          </div>

          {/* Search Icon Button (compact 44px on mobile, refined pill on desktop) */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label={dict.header.openSearchAria}
            title={dict.header.searchAria}
            className="inline-flex h-[44px] w-[44px] md:w-auto md:px-3.5 items-center justify-center gap-2 rounded-full border border-[#E7E5DF] bg-white text-[#142B45] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#142B45]/30 hover:bg-[#FAFAF7] active:scale-[0.96] dark:border-slate-700/80 dark:bg-[#101726] dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] dark:focus-visible:outline-[#E89B45] shrink-0"
          >
            <Search className="h-[17px] w-[17px] shrink-0" />
            <span className="hidden md:inline text-[12px] font-medium text-[#142B45]/80 dark:text-slate-300 whitespace-nowrap">
              {dict.header.searchBtn}
            </span>
            <kbd className="hidden lg:inline-flex h-5 min-w-[20px] items-center justify-center rounded-md border border-[#E7E5DF] bg-[#FAFAF7] px-1 font-mono-num text-[10px] font-semibold leading-none text-[#142B45]/70 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              /
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? dict.header.switchToLight : dict.header.switchToDark}
            title={isDark ? dict.header.lightMode : dict.header.darkMode}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#E7E5DF] bg-white text-[#142B45] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#142B45]/30 hover:bg-[#FAFAF7] active:scale-[0.96] dark:border-slate-700/80 dark:bg-[#101726] dark:text-[#E89B45] dark:hover:border-slate-600 dark:hover:bg-slate-800/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] dark:focus-visible:outline-[#E89B45] shrink-0"
          >
            {isDark ? (
              <Sun className="h-[17px] w-[17px]" />
            ) : (
              <Moon className="h-[17px] w-[17px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
