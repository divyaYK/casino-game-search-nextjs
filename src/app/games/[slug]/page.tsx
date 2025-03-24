'use client';

import ErrorComponent from '@/components/Error/Error';
import { ICasinoGame } from '@/types/game';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import { useState } from 'react';
import { useFavoritesStore } from '@/providers/FavoritesStoreProvider';
import HeartIcon from '@/components/ui/icons/HeartIcon';

const GameDetails = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(['gameDetails', slug]) as ICasinoGame;
  const [isFavorite, setIsFavorite] = useState(data?.favorite);
  const { favorites, addGame, removeGame } = useFavoritesStore(
    (state) => state
  );

  if (!slug) return <ErrorComponent />;
  if (!data) return <ErrorComponent />;

  return (
    <div className={styles['page-wrapper']}>
      <Image src={data.thumbnail} alt={data.name} width={200} height={300} />
      <header className={styles['page-heading']}>
        <h1>{data.name}</h1>
        <Button
          variant={'4'}
          className={isFavorite ? styles.heart_filled : styles.heart_unfilled}
          onClick={() => {
            setIsFavorite((flag) => !flag);
            if (favorites.includes(data.name)) {
              removeGame(data.name);
            } else {
              addGame(data.name);
            }
          }}
        >
          <HeartIcon />
        </Button>
      </header>
      <h2>Vendor: {data.vendor}</h2>
      <p>{data.description}</p>
      <p>Win rate: {data.theoreticalPayOut * 100}%</p>
    </div>
  );
};

export default GameDetails;
