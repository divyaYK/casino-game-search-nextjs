'use client';

import GameCard from '../GameCard/GameCard';
import styles from './GameGrid.module.scss';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { getGames } from '@/services/getGames';
import { v4 as uuid } from 'uuid';
import { useInfiniteQuery } from '@tanstack/react-query';
import NoGamesFound from './NoGamesFound';
import ErrorComponent from '@/components/Error/Error';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import Button from '@/components/ui/Button/Button';
import ButtonGroup from '@/components/ui/Button/ButtonGroup';
import ArrowLeftIcon from '@/components/ui/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';

interface IGameGridProps {
  label: string;
  icon: ReactNode;
  filter: string;
  viewFullList: boolean;
}

// Scroll width amount to scroll forwards and backwards
const CUSTOM_SCROLL_AMOUNT = 6 * 200;

/**
 * @name GameGrid
 * @description Handles Infinite Scrolling (Pagination) with game list div to scroll over
 */
const GameGrid = ({ label, icon, filter, viewFullList }: IGameGridProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetchNextPageError,
    isLoading,
    isPending,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ['games', filter, 10],
    queryFn: ({ pageParam = 0 }) => getGames(filter, 10, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data?.count < 10 ? undefined : 10,
    maxPages: 1,
    gcTime: 1000 * 60 * 60 * 5, // caching for 5 hours
    staleTime: 1000 * 60 * 60 * 10, // stale period for 10 hours
  });
  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [viewAll, setViewAll] = useState(viewFullList);

  // TODO: Fix left side scrolling and disabling
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) {
      return;
    }
    const container = scrollRef.current;
    const scrollWidth =
      direction === 'left' ? -CUSTOM_SCROLL_AMOUNT : CUSTOM_SCROLL_AMOUNT;
    container.scrollBy({ left: scrollWidth, behavior: 'smooth' });
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScrollEnd = () => checkScrollPosition();
    container.addEventListener('scroll', handleScrollEnd);
    return () => container.removeEventListener('scroll', handleScrollEnd);
  }, []);

  return (
    <div className={styles['game-grid']}>
      <div className={styles['game-grid__header']}>
        <div className={styles['heading']}>
          {icon}
          <h3>{label}</h3>
        </div>
        <div className={styles.controls}>
          <Button variant={'5'} onClick={() => setViewAll((flag) => !flag)}>
            {viewAll ? 'Hide' : 'View All'}
          </Button>
          <ButtonGroup>
            <Button
              variant={'5'}
              className={styles.nav_button}
              disabled={!viewAll ? !canScrollLeft : true}
              onClick={() => handleScroll('left')}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              variant={'5'}
              className={styles.nav_button}
              disabled={!viewAll ? !canScrollRight : true}
              onClick={() => handleScroll('right')}
            >
              <ArrowRightIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={styles['game-grid__body']}>
        {isSuccess &&
          data?.pages.map((page) => (
            <div
              className={`${styles['game-list']} ${viewAll ? styles.vertical : styles.horizontal}`}
              key={uuid()}
              ref={scrollRef}
            >
              {page.data.count && page.data.items.length ? (
                page.data.items.map((game) => (
                  <GameCard key={uuid()} game={game} />
                ))
              ) : (
                <NoGamesFound />
              )}
              {isFetchingNextPage && <Skeleton />}
            </div>
          ))}
        {(isError || isFetchNextPageError) && <ErrorComponent />}

        {(isLoading || isPending) && <Skeleton />}
        <div ref={observerRef} className={styles['game-grid__gradient']} />
      </div>
    </div>
  );
};

export default GameGrid;
