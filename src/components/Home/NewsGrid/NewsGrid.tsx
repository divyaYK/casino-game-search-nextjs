import styles from './NewsGrid.module.scss';
import Image from 'next/image';
import AirDropImage from '../../../../public/$JACKPOT Airdrop.png';

const NewsGrid = () => {
  return (
    <div className={styles.grid__container}>
      <div className={styles.grid__item}>
        <Image src={AirDropImage} alt="Jackpot Airdrop coming soon" />
      </div>
    </div>
  );
};

export default NewsGrid;
