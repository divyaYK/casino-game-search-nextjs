'use client';

import { FilterStore, filterStore } from '@/store/filterStore';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

/**
 * Filter store that handles CRUD operations on filters.
 */

export type FilterStoreAPI = ReturnType<typeof filterStore>;

export const FilterStoreContext = createContext<FilterStoreAPI | undefined>(
  undefined
);

interface IFilterStoreProviderProps {
  children: ReactNode;
}

export const FilterStoreProvider = ({
  children,
}: IFilterStoreProviderProps) => {
  const storeRef = useRef<FilterStoreAPI | null>(null);

  if (storeRef.current === null) {
    storeRef.current = filterStore();
  }

  return (
    <FilterStoreContext.Provider value={storeRef.current}>
      {children}
    </FilterStoreContext.Provider>
  );
};

export const useFilterStore = <T,>(selector: (store: FilterStore) => T): T => {
  const filterStoreContext = useContext(FilterStoreContext);
  if (!filterStoreContext) {
    throw new Error('useFilterStore must be used within a FilterStoreProvider');
  }
  return useStore(filterStoreContext, selector);
};
