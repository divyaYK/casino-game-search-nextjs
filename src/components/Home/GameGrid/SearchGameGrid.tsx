'use client';

import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.scss';
import { ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery } from '@tanstack/react-query';
import NoGamesFound from './NoGamesFound';
import ErrorComponent from '@/components/Error/Error';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import { searchGames } from '@/services/searchGames';

interface ISearchGameGridProps {
  label: string;
  icon: ReactNode;
  query: string;
}

const SearchGameGrid = ({ label, icon, query }: ISearchGameGridProps) => {
  const { data, isError, isLoading, isPending, isSuccess } = useQuery({
    queryKey: ['searchGames', query],
    queryFn: () => searchGames(query),
    maxPages: 1,
    gcTime: 1000 * 60 * 60 * 5, // 5 hours
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <div className={styles['game-grid']}>
      <div className={styles['game-grid__header']}>
        <div className={styles['heading']}>
          {icon}
          <h3>{label}</h3>
        </div>
      </div>
      <div className={styles['game-grid__body']}>
        {isSuccess && (
          <div className={`${styles['game-list']} ${styles.vertical}`}>
            {data.data.items.length ? (
              data.data.items.map((game) => (
                <GameCard key={uuid()} game={game} />
              ))
            ) : (
              <NoGamesFound />
            )}
          </div>
        )}
        {isError && <ErrorComponent />}

        {(isLoading || isPending) && <Skeleton />}
      </div>
    </div>
  );
};

export default SearchGameGrid;
