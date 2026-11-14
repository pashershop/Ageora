import { useCallback, useEffect, useState } from 'react';
import { KnownRoute } from '../utils/seo';

const FAVORITES_KEY = 'ageora_favorites_v1';
const HISTORY_KEY = 'ageora_history_v1';
const RECENT_SEARCHES_KEY = 'ageora_recent_searches_v1';

export interface HistoryEntry {
  id: string;
  title: string;
  route: KnownRoute;
  categoryLabel: string;
  lastUsedAt: number;
}

function safeReadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private mode failures
  }
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    safeReadJson<string[]>(FAVORITES_KEY, [])
  );

  useEffect(() => {
    safeWriteJson(FAVORITES_KEY, favoriteIds);
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite };
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    safeReadJson<HistoryEntry[]>(HISTORY_KEY, [])
  );

  useEffect(() => {
    safeWriteJson(HISTORY_KEY, history);
  }, [history]);

  const recordUsage = useCallback(
    (entry: Omit<HistoryEntry, 'lastUsedAt'>) => {
      const now = Date.now();
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.id !== entry.id);
        return [{ ...entry, lastUsedAt: now }, ...filtered].slice(0, 20);
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, recordUsage, clearHistory };
}

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    safeReadJson<string[]>(RECENT_SEARCHES_KEY, [])
  );

  useEffect(() => {
    safeWriteJson(RECENT_SEARCHES_KEY, recentSearches);
  }, [recentSearches]);

  const addSearchTerm = useCallback((term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 6);
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return { recentSearches, addSearchTerm, clearRecentSearches };
}

export function formatRelativeTime(
  timestamp: number,
  lang: 'en' | 'bn' = 'en',
  numeralMode: 'bn' | 'en' = 'bn'
): string {
  const diffSec = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  const fmtVal = (n: number): string => {
    if (lang === 'bn' && numeralMode === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(n).replace(/\d/g, (d) => bnDigits[Number(d)] ?? d);
    }
    return String(n);
  };

  if (diffSec < 60) return lang === 'bn' ? 'এইমাত্র' : 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return lang === 'bn' ? `${fmtVal(diffMin)} মিনিট আগে` : `${diffMin}m ago`;
  }
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) {
    return lang === 'bn' ? `${fmtVal(diffHr)} ঘণ্টা আগে` : `${diffHr}h ago`;
  }
  const diffDays = Math.floor(diffHr / 24);
  if (diffDays === 1) return lang === 'bn' ? 'গতকাল' : 'Yesterday';
  if (diffDays < 7) {
    return lang === 'bn' ? `${fmtVal(diffDays)} দিন আগে` : `${diffDays} days ago`;
  }
  const d = new Date(timestamp);
  if (lang === 'bn') {
    const months = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];
    return `${fmtVal(d.getDate())} ${months[d.getMonth()]}, ${fmtVal(d.getFullYear())}`;
  }
  return d.toLocaleDateString();
}
