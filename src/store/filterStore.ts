/**
 * File defines the global client-side state management setup using zustand
 */

import { RefObject } from 'react';
import { createStore } from 'zustand/vanilla';

type FilterState = {
  filterStr: string;
  searchStr: string;
  searchInputRef: RefObject<HTMLInputElement | null> | undefined;
  isFilterSet: boolean;
  isSearchQuerySet: boolean;
  isProviderSet: boolean;
};

type FilterActions = {
  setFilterStr: (value: string) => void;
  setSearchStr: (searchStr: string) => void;
  setSearchInputRef: (ref: RefObject<HTMLInputElement | null>) => void;
  setIsFilterSet: (isFilterSet: boolean) => void;
  setIsSearchQuerySet: (isSearchQuerySet: boolean) => void;
  setIsProviderSet: (isProviderSet: boolean) => void;
};

export type FilterStore = FilterState & FilterActions;

const defaultInitialState: FilterState = {
  filterStr: '',
  searchStr: '',
  searchInputRef: undefined,
  isFilterSet: false,
  isSearchQuerySet: false,
  isProviderSet: false,
};

export const filterStore = (
  initialState: FilterState = defaultInitialState
) => {
  return createStore<FilterStore>()((set) => ({
    ...initialState,
    setFilterStr: (filterStr) => set({ filterStr }),
    setSearchStr: (searchStr) => set({ searchStr }),
    setSearchInputRef: (ref) => {
      set({ searchInputRef: ref });
    },
    setIsFilterSet: (isFilterSet) => set({ isFilterSet }),
    setIsSearchQuerySet: (isSearchQuerySet) => set({ isSearchQuerySet }),
    setIsProviderSet: (isProviderSet) => set({ isProviderSet }),
  }));
};
