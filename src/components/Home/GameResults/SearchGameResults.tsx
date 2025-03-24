import { getQueryClient } from '@/providers/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import AllGamesIcon from '@/components/ui/icons/GamesIcon';
import styles from './GameResults.module.scss';
import { searchGames } from '@/services/searchGames';
import SearchGameGrid from '../GameGrid/SearchGameGrid';

const SearchGameResults = ({ query }: { query: string }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ['searchGames', query],
    queryFn: () => searchGames(query),
  });
  return (
    <section>
      <HydrationBoundary key={uuid()} state={dehydrate(queryClient)}>
        <SearchGameGrid
          label={'Game Results'}
          icon={<AllGamesIcon className={styles.games_icon} />}
          query={query}
        />
      </HydrationBoundary>
    </section>
  );
};

export default SearchGameResults;
