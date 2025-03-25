'use client';

import { FavoritesStore, favoritesStore } from '@/store/favoritesStore';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

/**
 * Favorites store that stores favorite games list in local storage
 */

export type FavoritesStoreAPI = ReturnType<typeof favoritesStore>;

export const FavoritesStoreContext = createContext<
  FavoritesStoreAPI | undefined
>(undefined);

interface IFavoritesStoreProviderProps {
  children: ReactNode;
}

export const FavoritesStoreProvider = ({
  children,
}: IFavoritesStoreProviderProps) => {
  const storeRef = useRef<FavoritesStoreAPI | null>(null);

  if (storeRef.current === null) {
    storeRef.current = favoritesStore();
  }

  return (
    <FavoritesStoreContext.Provider value={storeRef.current}>
      {children}
    </FavoritesStoreContext.Provider>
  );
};

export const useFavoritesStore = <T,>(
  selector: (store: FavoritesStore) => T
): T => {
  const favoritesStoreContext = useContext(FavoritesStoreContext);
  if (!favoritesStoreContext) {
    throw new Error(
      'useFavoritesStore must be used within a FavoritesStoreProvider'
    );
  }
  return useStore(favoritesStoreContext, selector);
};
