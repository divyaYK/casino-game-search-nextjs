'use client';

import NewsGrid from '@/components/Home/NewsGrid/NewsGrid';
import Filters from '../components/Home/Filters/Filters';
import styles from './page.module.scss';
import SearchInput from '@/components/Home/SearchInput/SearchInput';
import GameList from '@/components/Home/GameGrid/GameList';
import { useFilterStore } from '@/providers/FilterStoreProvider';
import FilteredGameResults from '@/components/Home/GameResults/FilteredGameResults';
import SearchGameResults from '@/components/Home/GameResults/SearchGameResults';

export default function Home() {
  const { isFilterSet, isSearchQuerySet, searchStr, filterStr } =
    useFilterStore((state) => state);
  return (
    <div className={styles['page-wrapper']}>
      <NewsGrid />
      <SearchInput />
      <Filters />
      {isFilterSet && !isSearchQuerySet && (
        <FilteredGameResults filter={filterStr} />
      )}
      {isSearchQuerySet && <SearchGameResults query={searchStr} />}
      {!isFilterSet && !isSearchQuerySet && <GameList />}
    </div>
  );
}
