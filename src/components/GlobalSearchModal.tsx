import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Clock, Search, Trash2, X } from 'lucide-react';
import {
  getPopularSearchTerms,
  searchAgeoraItems,
  SearchItem,
} from '../data/searchIndex';
import { useLanguage } from '../i18n';
import { PageRoute } from '../utils/seo';
import { CalculatorIcon } from './CalculatorIcon';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
  recentSearches: string[];
  onAddSearchTerm: (term: string) => void;
  onClearRecentSearches: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  recentSearches,
  onAddSearchTerm,
  onClearRecentSearches,
}) => {
  const { lang, dict, fmt, tr } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const popularTerms = useMemo(() => getPopularSearchTerms(lang), [lang]);
  const results = useMemo(() => searchAgeoraItems(query, lang), [query, lang]);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleOpenItem = (item: SearchItem) => {
    if (query.trim()) {
      onAddSearchTerm(query.trim());
    }
    onClose();
    setQuery('');
    onNavigate(item.route);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[activeIndex] ?? results[0];
      if (target) handleOpenItem(target);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.header.searchBtn}
      className="fixed inset-0 z-50 flex flex-col bg-white sm:items-center sm:justify-start sm:bg-slate-950/50 sm:p-4 sm:pt-12 sm:backdrop-blur-xs dark:bg-[#090D16] sm:dark:bg-slate-950/75"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full w-full flex-col bg-white sm:h-auto sm:max-h-[82vh] sm:max-w-xl sm:rounded-[10px] sm:border sm:border-[#E5E7EB] sm:shadow-lg dark:bg-[#101726] sm:dark:border-slate-800">
        {/* Search Input Header (h-[38px] bar) */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-3 py-2 dark:border-slate-800">
          <div className="flex h-[38px] flex-1 min-w-0 items-center gap-2 rounded-[8px] border border-[#E5E7EB] bg-slate-50/70 px-2.5 focus-within:border-[#2563EB] focus-within:bg-white dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-blue-500">
            <Search className="h-[15px] w-[15px] shrink-0 text-[#6B7280] dark:text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={dict.search.placeholder}
              aria-label={dict.search.ariaLabel}
              className="h-full w-full min-w-0 bg-transparent text-[13px] text-[#111827] placeholder:text-[#6B7280] focus:outline-none dark:text-white dark:placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                aria-label={dict.search.clearSearch}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] text-[#6B7280] hover:bg-slate-200/70 hover:text-[#111827] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.common.close}
            className="inline-flex h-[34px] shrink-0 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[12px] font-semibold text-[#6B7280] hover:bg-slate-50 hover:text-[#111827] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {dict.common.close}
          </button>
        </div>

        {/* Search Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {!query.trim() ? (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#6B7280] dark:text-slate-400">
                      {dict.search.recentSearches}
                    </span>
                    <button
                      type="button"
                      onClick={onClearRecentSearches}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6B7280] hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>{dict.common.clear}</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="inline-flex h-[28px] items-center gap-1 rounded-[8px] border border-[#E5E7EB] bg-slate-50 px-2.5 text-[11px] font-medium text-[#111827] transition-colors hover:border-blue-600/40 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        <Clock className="h-3 w-3 text-[#6B7280] dark:text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <p className="mb-2 text-[11px] font-semibold text-[#6B7280] dark:text-slate-400">
                  {dict.search.popularSearches}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {popularTerms.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="inline-flex h-[28px] items-center rounded-[8px] border border-[#E5E7EB] bg-white px-2.5 text-[11px] font-medium text-[#111827] transition-colors hover:border-[#2563EB] hover:text-[#2563EB] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-[14px] font-bold text-[#111827] dark:text-white">
                {dict.search.noResultsTitle}
              </p>
              <p className="mt-1 text-[12px] text-[#6B7280] dark:text-slate-400">
                {tr(dict.search.noResultsDesc, { query })}
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-3 inline-flex h-[34px] items-center rounded-[8px] bg-[#2563EB] px-3.5 text-[12px] font-semibold text-white hover:bg-blue-700"
              >
                {dict.search.clearSearch}
              </button>
            </div>
          ) : (
            <ul
              role="listbox"
              aria-label={dict.search.ariaLabel}
              className="space-y-2"
            >
              {results.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <li key={item.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => handleOpenItem(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex w-full items-center justify-between gap-2.5 rounded-[10px] border p-2.5 text-left transition-colors ${
                        isSelected
                          ? 'border-[#2563EB] bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/40'
                          : 'border-[#E5E7EB] bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400">
                          <CalculatorIcon
                            name={item.iconName}
                            className="h-[18px] w-[18px]"
                          />
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                            <span className="text-[13px] font-bold text-[#111827] dark:text-white truncate">
                              {item.title}
                            </span>
                            <span className="text-[11px] text-[#6B7280] dark:text-slate-400">
                              · {item.category}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-[11px] text-[#6B7280] dark:text-slate-400">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex h-[30px] shrink-0 items-center gap-1 rounded-[8px] bg-[#2563EB] px-2.5 text-[11px] font-semibold text-white">
                        <span>{dict.common.open}</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Desktop Keyboard Hint Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-[#E5E7EB] px-3 py-2 text-[11px] text-[#6B7280] dark:border-slate-800 dark:text-slate-400">
          <span>{dict.search.keyboardHint}</span>
          <span>
            {results.length > 0
              ? tr(dict.search.resultsCount, { count: fmt(results.length) })
              : dict.search.instantSearch}
          </span>
        </div>
      </div>
    </div>
  );
};
