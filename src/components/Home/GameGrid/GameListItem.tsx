import { getQueryClient } from '@/providers/get-query-client';
import { getGames } from '@/services/getGames';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import GameGrid from './GameGrid';

const GameListItem = ({
  label,
  icon,
  filter,
}: {
  label: string;
  icon: ReactNode;
  filter: string;
}) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: [`${filter}Games`, 10, filter],
    queryFn: () => getGames(filter, 10),
  });
  return (
    <HydrationBoundary key={uuid()} state={dehydrate(queryClient)}>
      <GameGrid
        label={label}
        icon={icon}
        filter={filter}
        viewFullList={false}
      />
    </HydrationBoundary>
  );
};

export default GameListItem;
