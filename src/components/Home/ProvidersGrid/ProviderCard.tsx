'use client';

import Image, { StaticImageData } from 'next/image';
import styles from './ProvidersGrid.module.scss';
import { useFilterStore } from '@/providers/FilterStoreProvider';
import { useState } from 'react';

interface IProviderCardProps {
  name: string;
  filter: string;
  imgSrc: StaticImageData;
}
const ProviderCard = ({ name, filter, imgSrc }: IProviderCardProps) => {
  const { filterStr, setIsProviderSet, isProviderSet, setFilterStr } =
    useFilterStore((state) => state);
  const [isActive, setIsActive] = useState(filterStr === filter);

  const handleClick = () => {
    if (isActive) {
      setIsActive(false);
      setIsProviderSet(false);
      setFilterStr('');
    } else {
      setIsActive(true);
      setIsProviderSet(true);
      setFilterStr(filter);
    }
  };

  if (isProviderSet) {
    if (isActive) {
      return (
        <button
          title={name}
          className={`${styles['provider-card__wrapper']} ${isActive ? styles.active : ''}`}
          onClick={handleClick}
        >
          <Image src={imgSrc} alt={name} width={160} height={100} />
        </button>
      );
    }
  } else {
    return (
      <button
        title={name}
        className={`${styles['provider-card__wrapper']} ${isActive ? styles.active : ''}`}
        onClick={handleClick}
        suppressHydrationWarning
      >
        <Image src={imgSrc} alt={name} width={160} height={100} />
      </button>
    );
  }
};

export default ProviderCard;
