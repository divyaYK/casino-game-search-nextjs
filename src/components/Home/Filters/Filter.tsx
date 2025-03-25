'use client';

import { useState } from 'react';
import styles from './Filters.module.scss';
import Button from '@/components/ui/Button/Button';
import { useFilterStore } from '@/providers/FilterStoreProvider';

interface IFilterProps {
  label: string;
  value: string;
}

// Component utilizes zustand to set or remove the filter
const Filter = ({ label, value }: IFilterProps) => {
  const { filterStr, setFilterStr, setIsFilterSet } = useFilterStore(
    (state) => state
  );
  const [isActive, setIsActive] = useState(filterStr.includes(value));
  return (
    <Button
      variant={'1'}
      className={`${styles.filter} ${isActive ? styles.active : ''}`}
      onClick={() => {
        let newFilterStr = '';
        if (isActive) {
          newFilterStr = filterStr.replaceAll(`&${value}`, '');
          setFilterStr(newFilterStr);
          setIsActive(false);
        } else {
          newFilterStr = `${filterStr}&${value}`;
          setFilterStr(newFilterStr);
          setIsActive(true);
        }
        if (newFilterStr !== '') {
          setIsFilterSet(true);
        } else {
          setIsFilterSet(false);
        }
      }}
    >
      {label}
    </Button>
  );
};

export default Filter;
