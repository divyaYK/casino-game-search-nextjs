/**
 * File defines the persisted storage setup using zustand
 */

import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

type FavoritesState = {
  favorites: string[];
};

type FavoritesActions = {
  addGame: (game: string) => void;
  removeGame: (game: string) => void;
};

export type FavoritesStore = FavoritesState & FavoritesActions;

const defaultInitialState: FavoritesState = {
  favorites: [],
};

export const favoritesStore = (
  initialState: FavoritesState = defaultInitialState
) => {
  return createStore<FavoritesStore>()(
    persist(
      (set) => ({
        ...initialState,
        addGame: (game) =>
          set((state) => ({ favorites: [...state.favorites, game] })),
        removeGame: (game) =>
          set((state) => ({
            favorites: state.favorites.filter((g) => g !== game),
          })),
      }),
      {
        name: 'favorites-storage', // unique key in localStorage
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};
