import { v4 as uuid } from 'uuid';
import FireIcon from '@/components/ui/icons/FireIcon';
import JackpotIcon from '@/components/ui/icons/JackpotIcon';
import SlotsIcon from '@/components/ui/icons/SlotsIcon';
import ProvidersIcon from '@/components/ui/icons/ProvidersIcon';
import TableIcon from '@/components/ui/icons/TableIcon';
import GameShowIcon from '@/components/ui/icons/GameShowIcon';
import SportsIcon from '@/components/ui/icons/SportsIcon';
import NewIcon from '@/components/ui/icons/NewIcon';
import GameListItem from './GameListItem';

const GameListConstants = [
  {
    label: 'Featured Games',
    icon: <FireIcon />,
    filter: 'sort=featuredPriority',
  },
  {
    label: 'Jackpot Originals',
    icon: <JackpotIcon />,
    filter: 'vendor=JackpotOriginal',
  },
  {
    label: 'Slots',
    icon: <SlotsIcon />,
    filter: 'category=VIDEOSLOTS',
  },
  {
    label: 'Providers',
    icon: <ProvidersIcon />,
    filter: '',
  },
  {
    label: 'Table Games',
    icon: <TableIcon />,
    filter: 'category=TABLEGAMES',
  },
  {
    label: 'Game Shows',
    icon: <GameShowIcon />,
    filter: 'category=GAMESHOWSLIVEDEALER',
  },
  {
    label: 'Sports',
    icon: <SportsIcon />,
    filter: 'vendor=SPORTS',
  },
  {
    label: 'New Games',
    icon: <NewIcon />,
    filter: 'sort=createdAt&order=desc',
  },
];

const GameList = () => {
  return (
    <section>
      {GameListConstants.map((gameType) => {
        return gameType.label !== 'Providers' ? (
          <GameListItem
            key={uuid()}
            label={gameType.label}
            icon={gameType.icon}
            filter={gameType.filter}
          />
        ) : (
          <div key={uuid()}>Providers Grid</div>
        );
      })}
    </section>
  );
};

export default GameList;
