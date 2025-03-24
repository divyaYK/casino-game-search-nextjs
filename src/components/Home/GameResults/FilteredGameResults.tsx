import { getQueryClient } from '@/providers/get-query-client';
import { getGames } from '@/services/getGames';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import GameGrid from '../GameGrid/GameGrid';
import AllGamesIcon from '@/components/ui/icons/GamesIcon';
import styles from './GameResults.module.scss';

const FilteredGameResults = ({ filter }: { filter: string }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ['games', 10, filter],
    queryFn: () => getGames(filter, 10),
  });
  return (
    <section>
      <HydrationBoundary key={uuid()} state={dehydrate(queryClient)}>
        <GameGrid
          label={'Game Results'}
          icon={<AllGamesIcon className={styles.games_icon} />}
          filter={filter}
          viewFullList={true}
        />
      </HydrationBoundary>
    </section>
  );
};

export default FilteredGameResults;
