import WarningIcon from '../ui/icons/WarningIcon';
import styles from './Error.module.scss';

// Component to display if API calls fail
const ErrorComponent = () => {
  return (
    <div className={styles.error__wrapper}>
      <p className={styles.error__heading}>
        <WarningIcon /> An error occurred.
      </p>
      <p className={styles.error__text}>Please try again later.</p>
      <p className={styles.error__text}>
        If the issue persists, please contact support.
      </p>
    </div>
  );
};

export default ErrorComponent;
