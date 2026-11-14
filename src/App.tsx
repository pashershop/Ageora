import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AdSlot } from './components/AdSlot';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ActivityProvider, useActivity } from './context/ActivityContext';
import { LanguageProvider, useLanguage } from './i18n';
import { Language } from './i18n/types';
import {
  applySeoForRoute,
  BlogArticleSlug,
  buildLocalizedPath,
  PageRoute,
  parsePathname,
} from './utils/seo';

const ExplorePage = lazy(() =>
  import('./components/ExplorePage').then((m) => ({ default: m.ExplorePage }))
);
const FavoritesPage = lazy(() =>
  import('./components/FavoritesPage').then((m) => ({ default: m.FavoritesPage }))
);
const HistoryPage = lazy(() =>
  import('./components/HistoryPage').then((m) => ({ default: m.HistoryPage }))
);
const LifeReportPage = lazy(() =>
  import('./components/LifeReportPage').then((m) => ({ default: m.LifeReportPage }))
);
const BlogIndexPage = lazy(() =>
  import('./components/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage }))
);
const BlogArticlePage = lazy(() =>
  import('./components/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage }))
);
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const AboutPage = lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.AboutPage }))
);
const ContactPage = lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.ContactPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfUsePage = lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.TermsOfUsePage }))
);
const DisclaimerPage = lazy(() =>
  import('./components/StaticPages').then((m) => ({ default: m.DisclaimerPage }))
);

const AgeCalculatorView = lazy(() =>
  import('./components/calculators/AgeCalculatorView').then((m) => ({
    default: m.AgeCalculatorView,
  }))
);
const AgeDifferenceView = lazy(() =>
  import('./components/calculators/AgeDifferenceView').then((m) => ({
    default: m.AgeDifferenceView,
  }))
);
const BirthdayCalculatorView = lazy(() =>
  import('./components/calculators/BirthdayCalculatorView').then((m) => ({
    default: m.BirthdayCalculatorView,
  }))
);
const DayBornCalculatorView = lazy(() =>
  import('./components/calculators/DayBornCalculatorView').then((m) => ({
    default: m.DayBornCalculatorView,
  }))
);
const FutureAgeCalculatorView = lazy(() =>
  import('./components/calculators/FutureAgeCalculatorView').then((m) => ({
    default: m.FutureAgeCalculatorView,
  }))
);
const MillionSecondsCalculatorView = lazy(() =>
  import('./components/calculators/MillionSecondsCalculatorView').then((m) => ({
    default: m.MillionSecondsCalculatorView,
  }))
);
const RelationshipDurationView = lazy(() =>
  import('./components/calculators/RelationshipDurationView').then((m) => ({
    default: m.RelationshipDurationView,
  }))
);
const RetirementCalculatorView = lazy(() =>
  import('./components/calculators/RetirementCalculatorView').then((m) => ({
    default: m.RetirementCalculatorView,
  }))
);
const ZodiacCalculatorView = lazy(() =>
  import('./components/calculators/ZodiacCalculatorView').then((m) => ({
    default: m.ZodiacCalculatorView,
  }))
);

function RouteFallback() {
  return (
    <div className="mx-auto max-w-5xl px-3 py-5 sm:px-4 lg:px-6" aria-busy="true">
      <div className="h-6 w-48 animate-pulse rounded-[8px] bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded-[8px] bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-48 w-full animate-pulse rounded-[10px] bg-slate-100 dark:bg-slate-900" />
    </div>
  );
}

function AgeoraShell() {
  const { lang, setLang, setLangFromRoute } = useLanguage();
  const [route, setRoute] = useState<PageRoute>(() =>
    typeof window !== 'undefined' ? parsePathname(window.location.pathname).route : '/'
  );
  const [sharedDob, setSharedDob] = useState<Date | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = window.localStorage.getItem('ageora_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  const {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    history,
    clearHistory,
    recentSearches,
    addSearchTerm,
    clearRecentSearches,
  } = useActivity();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('ageora_theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('ageora_theme', 'light');
    }
  }, [isDark]);

  // Keep initial URL synchronized if language resolved to 'bn' from saved preference or browser locale
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (lang === 'bn' && route !== '/404') {
      const parsed = parsePathname(window.location.pathname);
      if (parsed.urlLang !== 'bn') {
        window.history.replaceState({}, '', buildLocalizedPath(route, 'bn'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applySeoForRoute(route, lang);
  }, [route, lang]);

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname);
      setRoute(parsed.route);
      setLangFromRoute(parsed.urlLang === 'bn' ? 'bn' : 'en');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setLangFromRoute]);

  // Global keyboard shortcut: '/' or Cmd/Ctrl+K opens Global Search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT' ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (!isTyping && e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const navigate = useCallback(
    (nextRoute: PageRoute) => {
      const targetPath =
        nextRoute === '/404'
          ? window.location.pathname
          : buildLocalizedPath(nextRoute, lang);
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [lang]
  );

  const handleLanguageChange = useCallback(
    (nextLang: Language) => {
      setLang(nextLang);
      if (route !== '/404') {
        const targetPath = buildLocalizedPath(route, nextLang);
        if (window.location.pathname !== targetPath) {
          window.history.pushState({}, '', targetPath);
        }
      }
    },
    [route, setLang]
  );

  const renderPage = () => {
    if (route.startsWith('/blog/')) {
      const slug = route.replace('/blog/', '') as BlogArticleSlug;
      return <BlogArticlePage slug={slug} onNavigate={navigate} />;
    }

    switch (route) {
      case '/':
        return (
          <HomePage
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/explore':
      case '/all-calculators':
        return (
          <ExplorePage
            onNavigate={navigate}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        );
      case '/favorites':
        return (
          <FavoritesPage
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onNavigate={navigate}
          />
        );
      case '/history':
        return (
          <HistoryPage
            history={history}
            onClearHistory={clearHistory}
            onNavigate={navigate}
          />
        );
      case '/age-calculator':
        return (
          <AgeCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/birthday-countdown':
        return (
          <BirthdayCalculatorView
            mode="countdown"
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/next-birthday':
        return (
          <BirthdayCalculatorView
            mode="next-birthday"
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/age-difference-calculator':
        return (
          <AgeDifferenceView
            mode="difference"
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/who-is-older':
        return (
          <AgeDifferenceView
            mode="who-is-older"
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/friendship-calculator':
        return (
          <RelationshipDurationView
            mode="friendship"
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/love-duration-calculator':
        return (
          <RelationshipDurationView
            mode="love"
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/zodiac-calculator':
        return (
          <ZodiacCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/day-born-calculator':
        return (
          <DayBornCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/future-age-calculator':
        return (
          <FutureAgeCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/retirement-calculator':
        return (
          <RetirementCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/million-seconds-calculator':
        return (
          <MillionSecondsCalculatorView
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/life-report':
        return (
          <LifeReportPage
            sharedDob={sharedDob}
            onSaveDob={setSharedDob}
            onNavigate={navigate}
            isDark={isDark}
          />
        );
      case '/blog':
        return <BlogIndexPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/privacy-policy':
        return <PrivacyPolicyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsOfUsePage onNavigate={navigate} />;
      case '/disclaimer':
        return <DisclaimerPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/404':
      default:
        return <NotFoundPage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#FAFAF7] text-[#111827] transition-colors dark:bg-[#090D16] dark:text-slate-100">
      <Header
        onNavigate={navigate}
        onChangeLanguage={handleLanguageChange}
        onOpenSearch={() => setSearchOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Placement 1: Below Header */}
      <AdSlot placement="belowHeader" className="px-3 sm:px-4 lg:px-6" />

      <main className="flex-1">
        <Suspense fallback={<RouteFallback />}>{renderPage()}</Suspense>
      </main>

      {/* Placement 5: Above Footer */}
      <AdSlot placement="aboveFooter" className="px-3 sm:px-4 lg:px-6" />

      <Footer onNavigate={navigate} />

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
        recentSearches={recentSearches}
        onAddSearchTerm={addSearchTerm}
        onClearRecentSearches={clearRecentSearches}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ActivityProvider>
        <AgeoraShell />
      </ActivityProvider>
    </LanguageProvider>
  );
}
