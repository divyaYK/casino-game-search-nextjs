'use client';

import Link from 'next/link';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import { useFavoritesStore } from '@/providers/FavoritesStoreProvider';
import { useQueryClient } from '@tanstack/react-query';
import { ICasinoGame } from '@/types/game';

interface IGameCardProps {
  game: ICasinoGame;
}

/**
 * @name GameCard
 * @description The GameCard component is responsible for rendering a single game card;
 * Added Heart Button to favorite the games, redirects to game details page on click
 */
const GameCard = ({ game }: IGameCardProps) => {
  const { favorites, addGame, removeGame } = useFavoritesStore(
    (state) => state
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    game.favorite || favorites.includes(game.name)
  );
  const queryClient = useQueryClient();
  return (
    <Link
      href={`/games/${game.slug}`}
      className={styles['game-card__wrapper']}
      style={{ borderColor: game.borderColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        queryClient.setQueryData(['gameDetails', game.slug], {
          ...game,
          favorite: isFavorite,
        });
      }}
    >
      <div
        className={styles['game-card__overlay']}
        style={isHovered ? {} : { display: 'none' }}
      >
        <Button
          variant={'4'}
          className={isFavorite ? styles.heart_filled : styles.heart_unfilled}
          onClick={() => {
            setIsFavorite((flag) => !flag);
            if (favorites.includes(game.name)) {
              removeGame(game.name);
            } else {
              addGame(game.name);
            }
          }}
        >
          <HeartIcon />
        </Button>
      </div>
      <div
        className={styles['game-card__blur']}
        style={{ backgroundImage: `url(${game.thumbnailBlur})` }}
      />
      <Image src={game.thumbnail} alt={game.name} width={171} height={227} />
    </Link>
  );
};

export default GameCard;
