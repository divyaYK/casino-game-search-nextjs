'use client';

import styles from './SearchInput.module.scss';
import Input from '@/components/ui/Input/Input';
import { useFilterStore } from '@/providers/FilterStoreProvider';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import SearchIcon from '@/components/ui/icons/SearchIcon';

const SearchInput = () => {
  const {
    setSearchStr,
    setSearchInputRef,
    setIsSearchQuerySet,
    setFilterStr,
    setIsFilterSet,
    searchStr,
  } = useFilterStore((state) => state);
  const [searchValue, setSearchValue] = useState(searchStr);

  const debouncedSetSearch = useCallback(
    debounce((query: string) => {
      setSearchStr(query);
      if (query === '') {
        setIsSearchQuerySet(false);
      } else {
        setIsSearchQuerySet(true);
      }
      setIsFilterSet(false);
      setFilterStr('');
    }, 500),
    [setSearchStr, setIsSearchQuerySet, setIsFilterSet, setFilterStr]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    debouncedSetSearch(newValue);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  useEffect(() => {
    if (inputRef.current) {
      setSearchInputRef(inputRef);
    }
  }, [setSearchInputRef]);

  return (
    <div className={styles['search-bar__wrapper']}>
      <SearchIcon />
      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        placeholder="Search a game..."
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
