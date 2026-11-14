import React, { useState } from 'react';
import {
  Bookmark,
  Compass,
  History,
  Home,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n';
import { Language } from '../i18n/types';
import { buildLocalizedPath, PageRoute } from '../utils/seo';

interface MobileBottomNavProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onChangeLanguage: (nextLang: Language) => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  favoriteCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRoute,
  onNavigate,
  onChangeLanguage,
  onOpenSearch,
  isDark,
  onToggleTheme,
  favoriteCount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, numeralMode, setNumeralMode, dict, fmt } = useLanguage();

  const handleNav = (route: PageRoute) => {
    setMenuOpen(false);
    onNavigate(route);
  };

  const navItems: {
    id: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
  }[] = [
    {
      id: 'home',
      label: dict.nav.home,
      icon: <Home className="h-[18px] w-[18px]" />,
      active: currentRoute === '/',
      onClick: () => handleNav('/'),
    },
    {
      id: 'explore',
      label: dict.nav.exploreShort,
      icon: <Compass className="h-[18px] w-[18px]" />,
      active: currentRoute === '/explore' || currentRoute === '/all-calculators',
      onClick: () => handleNav('/explore'),
    },
    {
      id: 'favorites',
      label: dict.nav.favoritesShort,
      icon: (
        <span className="relative">
          <Bookmark className="h-[18px] w-[18px]" />
          {favoriteCount > 0 && (
            <span className="absolute -right-1.5 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#2563EB] px-1 font-mono-num text-[9px] font-bold text-white">
              {favoriteCount > 9 ? `${fmt(9)}+` : fmt(favoriteCount)}
            </span>
          )}
        </span>
      ),
      active: currentRoute === '/favorites',
      onClick: () => handleNav('/favorites'),
    },
    {
      id: 'history',
      label: dict.nav.historyShort,
      icon: <History className="h-[18px] w-[18px]" />,
      active: currentRoute === '/history',
      onClick: () => handleNav('/history'),
    },
    {
      id: 'menu',
      label: dict.nav.menu,
      icon: menuOpen ? (
        <X className="h-[18px] w-[18px]" />
      ) : (
        <Menu className="h-[18px] w-[18px]" />
      ),
      active: menuOpen,
      onClick: () => setMenuOpen((prev) => !prev),
    },
  ];

  const menuLinks: { label: string; route: PageRoute }[] = [
    { label: dict.nav.lifeReportMenu, route: '/life-report' },
    { label: dict.nav.blogMenu, route: '/blog' },
    { label: dict.nav.aboutMenu, route: '/about' },
    { label: dict.nav.privacy, route: '/privacy-policy' },
    { label: dict.nav.terms, route: '/terms' },
    { label: dict.nav.disclaimer, route: '/disclaimer' },
    { label: dict.nav.contact, route: '/contact' },
  ];

  return (
    <>
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dict.header.menuTitle}
          className="fixed inset-0 z-40 flex items-end bg-slate-950/50 backdrop-blur-xs md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-[#E5E7EB] bg-white px-4 pb-20 pt-2.5 shadow-xl dark:border-slate-800 dark:bg-[#101726]">
            <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-slate-300 dark:bg-slate-700" />

            <div className="mb-3 flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#111827] dark:text-white">
                {dict.header.menuTitle}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.header.closeMenuAria}
                className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] text-[#6B7280] hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSearch();
                }}
                className="flex h-[36px] items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-slate-50 px-3 text-[12px] font-semibold text-[#111827] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <Search className="h-[15px] w-[15px] text-[#2563EB]" />
                <span>{dict.header.searchBtn}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className="flex h-[36px] items-center justify-center gap-1.5 rounded-[8px] border border-[#E5E7EB] bg-slate-50 px-3 text-[12px] font-semibold text-[#111827] dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {isDark ? (
                  <Sun className="h-[15px] w-[15px] text-amber-500" />
                ) : (
                  <Moon className="h-[15px] w-[15px] text-[#2563EB]" />
                )}
                <span>{isDark ? dict.header.lightMode : dict.header.darkMode}</span>
              </button>
            </div>

            {/* Language & Bangla Numeral Switcher inside Mobile Menu */}
            <div className="mb-3 rounded-[8px] border border-[#E5E7EB] bg-slate-50/70 p-2 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => onChangeLanguage('en')}
                  className={`flex h-[32px] items-center justify-center gap-1.5 rounded-[6px] text-[12px] font-semibold transition-colors ${
                    lang === 'en'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white text-[#111827] border border-[#E5E7EB] dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span aria-hidden="true">🇬🇧</span>
                  <span>{dict.header.englishOption}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLanguage('bn')}
                  className={`flex h-[32px] items-center justify-center gap-1.5 rounded-[6px] text-[12px] font-semibold transition-colors ${
                    lang === 'bn'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white text-[#111827] border border-[#E5E7EB] dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span aria-hidden="true">🇧🇩</span>
                  <span>{dict.header.banglaOption}</span>
                </button>
              </div>

              {lang === 'bn' && (
                <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setNumeralMode('bn')}
                    className={`h-[30px] rounded-[6px] px-2 text-[11px] font-medium transition-colors ${
                      numeralMode === 'bn'
                        ? 'bg-blue-100 text-[#2563EB] dark:bg-blue-950/70 dark:text-blue-300'
                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700'
                    }`}
                  >
                    {dict.header.numeralsBn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setNumeralMode('en')}
                    className={`h-[30px] rounded-[6px] px-2 text-[11px] font-medium transition-colors ${
                      numeralMode === 'en'
                        ? 'bg-blue-100 text-[#2563EB] dark:bg-blue-950/70 dark:text-blue-300'
                        : 'bg-white text-[#6B7280] border border-[#E5E7EB] dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700'
                    }`}
                  >
                    {dict.header.numeralsEn}
                  </button>
                </div>
              )}
            </div>

            <nav
              aria-label="Menu Pages"
              className="divide-y divide-[#E5E7EB] dark:divide-slate-800"
            >
              {menuLinks.map((item) => (
                <a
                  key={item.route}
                  href={buildLocalizedPath(item.route, lang)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.route);
                  }}
                  className="flex h-[38px] items-center justify-between text-[13px] font-medium text-[#111827] hover:text-[#2563EB] dark:text-slate-200 dark:hover:text-blue-400"
                >
                  <span>{item.label}</span>
                  <span className="text-[11px] text-[#6B7280] dark:text-slate-400">
                    →
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation: 56px height, 18px icons, 10px labels */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] bg-white/95 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-[#090D16]/95"
      >
        <div className="grid h-[56px] grid-cols-5 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              aria-current={item.active ? 'page' : undefined}
              className={`relative flex h-full flex-col items-center justify-center gap-0.5 px-1 transition-colors ${
                item.active
                  ? 'text-[#2563EB] dark:text-blue-400'
                  : 'text-[#6B7280] hover:text-[#111827] dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item.active && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-[#2563EB] dark:bg-blue-400"
                />
              )}
              {item.icon}
              <span className="truncate max-w-full text-[10px] font-medium leading-none tracking-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};
