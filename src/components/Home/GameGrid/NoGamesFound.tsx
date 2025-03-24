import DisabledIcon from '@/components/ui/icons/DisabledIcon';
import styles from './GameGrid.module.scss';

const NoGamesFound = () => {
  return (
    <div className={styles.no_data}>
      <DisabledIcon />
      Games Not Found
    </div>
  );
};

export default NoGamesFound;
