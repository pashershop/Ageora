import React, { createContext, useContext } from 'react';
import {
  HistoryEntry,
  useFavorites,
  useHistory,
  useRecentSearches,
} from '../hooks/useUserActivity';
import { KnownRoute } from '../utils/seo';

interface ActivityContextValue {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  history: HistoryEntry[];
  recordUsage: (entry: {
    id: string;
    title: string;
    route: KnownRoute;
    categoryLabel: string;
  }) => void;
  clearHistory: () => void;
  recentSearches: string[];
  addSearchTerm: (term: string) => void;
  clearRecentSearches: () => void;
}

const ActivityContext = createContext<ActivityContextValue | null>(null);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const { history, recordUsage, clearHistory } = useHistory();
  const { recentSearches, addSearchTerm, clearRecentSearches } = useRecentSearches();

  return (
    <ActivityContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        history,
        recordUsage,
        clearHistory,
        recentSearches,
        addSearchTerm,
        clearRecentSearches,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export function useActivity(): ActivityContextValue {
  const ctx = useContext(ActivityContext);
  if (!ctx) {
    throw new Error('useActivity must be used within ActivityProvider');
  }
  return ctx;
}
