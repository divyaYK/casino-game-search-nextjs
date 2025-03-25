import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './ProvidersGrid.module.scss';
import { v4 as uuid } from 'uuid';
import ProviderCard from './ProviderCard';
import PragmaticPlay from '@/assets/vendorImages/Pragmatic Play.png';
import EvolutionGaming from '@/assets/vendorImages/Evolution Gaming.png';
import JackpotOriginal from '@/assets/vendorImages/Jackpot Originals.png';
import PlayNGo from "@/assets/vendorImages/Play'n Go.png";
import RelaxGaming from '@/assets/vendorImages/Relax Gaming.png';
import Button from '@/components/ui/Button/Button';
import ButtonGroup from '@/components/ui/Button/ButtonGroup';
import ArrowLeftIcon from '@/components/ui/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';

interface IProvidersGridProps {
  label: string;
  icon: ReactNode;
}

const ProvidersList = [
  {
    name: 'Pragmatic Play',
    filter: '&vendor=PragmaticPlay',
    thumbnail: PragmaticPlay,
  },
  {
    name: 'Evolution Gaming',
    filter: '&vendor=EvolutionGaming',
    thumbnail: EvolutionGaming,
  },
  {
    name: 'Jackpot Originals',
    filter: '&vendor=JackpotOriginal',
    thumbnail: JackpotOriginal,
  },
  {
    name: "Play'n Go",
    filter: "&vendor=Play'nGo",
    thumbnail: PlayNGo,
  },
  {
    name: 'Relax Gaming',
    filter: '&vendor=RelaxGaming',
    thumbnail: RelaxGaming,
  },
];

// Scroll width amount to scroll forwards and backwards
const CUSTOM_SCROLL_AMOUNT = 6 * 200;

const ProvidersGrid = ({ label, icon }: IProvidersGridProps) => {
  const [viewAll, setViewAll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
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
    const container = scrollRef.current;
    if (!container) return;
    const handleScrollEnd = () => checkScrollPosition();
    container.addEventListener('scroll', handleScrollEnd);
    return () => container.removeEventListener('scroll', handleScrollEnd);
  }, []);

  return (
    <div className={styles['provider-grid']}>
      <div className={styles['provider-grid__header']}>
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
      <div className={styles['provider-grid__body']}>
        <div
          ref={scrollRef}
          className={`${styles['provider-list']} ${styles.vertical}`}
        >
          {ProvidersList.map((provider) => (
            <ProviderCard
              key={uuid()}
              name={provider.name}
              filter={provider.filter}
              imgSrc={provider.thumbnail}
            />
          ))}
          <div className={styles['provider-grid__gradient']} />
        </div>
      </div>
    </div>
  );
};

export default ProvidersGrid;
