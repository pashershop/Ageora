import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { bn } from './bn';
import { en, TranslationDictionary } from './en';
import {
  applyNumeralMode,
  formatDecimal,
  formatNum,
  formatPaddedNum,
  formatReadableDateLocalized,
  getLocalizedWeekday,
  interpolate,
} from './helpers';
import { Language, NumeralMode } from './types';

export const LANG_STORAGE_KEY = 'ageora_lang';
export const BN_NUMERAL_STORAGE_KEY = 'ageora_bn_numerals';

const DICTIONARIES: Record<Language, TranslationDictionary> = { en, bn };

export function detectInitialLanguage(pathname?: string): Language {
  if (typeof window === 'undefined') return 'en';
  const path = pathname ?? window.location.pathname;
  if (/^\/bn(\/|$)/.test(path)) {
    return 'bn';
  }
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'bn' || saved === 'en') {
      return saved;
    }
    const browserLangs =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    if (browserLangs.some((l) => l && l.toLowerCase().startsWith('bn'))) {
      return 'bn';
    }
  } catch {
    // Ignore storage/navigator access errors
  }
  return 'en';
}

function readInitialNumeralMode(): NumeralMode {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = window.localStorage.getItem(BN_NUMERAL_STORAGE_KEY);
    if (saved === 'en' || saved === 'bn') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'bn';
}

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  setLangFromRoute: (next: Language) => void;
  numeralMode: NumeralMode;
  setNumeralMode: (next: NumeralMode) => void;
  dict: TranslationDictionary;
  fmt: (value: number | string) => string;
  fmtDec: (value: number, decimals?: number) => string;
  fmtPad: (value: number, length?: number) => string;
  fmtRaw: (value: number | string) => string;
  fmtDate: (date: Date) => string;
  fmtWeekday: (date: Date) => string;
  tr: (template: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Language>(() => detectInitialLanguage());
  const [numeralMode, setNumeralModeState] = useState<NumeralMode>(() =>
    readInitialNumeralMode()
  );

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // Ignore storage failure
      }
    }
  }, []);

  const setLangFromRoute = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  const setNumeralMode = useCallback((next: NumeralMode) => {
    setNumeralModeState(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(BN_NUMERAL_STORAGE_KEY, next);
      } catch {
        // Ignore storage failure
      }
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = DICTIONARIES[lang];
    return {
      lang,
      setLang,
      setLangFromRoute,
      numeralMode,
      setNumeralMode,
      dict,
      fmt: (v) => formatNum(v, lang, numeralMode),
      fmtDec: (v, decimals = 2) => formatDecimal(v, decimals, lang, numeralMode),
      fmtPad: (v, length = 2) => formatPaddedNum(v, length, lang, numeralMode),
      fmtRaw: (v) => applyNumeralMode(v, lang, numeralMode),
      fmtDate: (d) => formatReadableDateLocalized(d, lang, numeralMode),
      fmtWeekday: (d) => getLocalizedWeekday(d, lang),
      tr: (template, vars) => interpolate(template, vars),
    };
  }, [lang, numeralMode, setLang, setLangFromRoute, setNumeralMode]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
