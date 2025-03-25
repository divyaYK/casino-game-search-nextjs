'use client';

import Link from 'next/link';
import styles from './Navbar.module.scss';
import Button from '../ui/Button/Button';
import SearchIcon from '../ui/icons/SearchIcon';
import CustomerServiceIcon from '../ui/icons/CustomerServiceIcon';
import DesktopLogo from '@/assets/Jackpot_Large_Logo.svg';
import MobileLogo from '@/assets/Jackpot_Small_Logo.svg';
import { usePathname } from 'next/navigation';
import { useFilterStore } from '@/providers/FilterStoreProvider';

const Navbar = () => {
  const pathname = usePathname();
  const searchInputRef = useFilterStore((state) => state.searchInputRef);

  // Assuming the purpose is the same searching games, it focuses on the search bar in the home page
  const handleSearchClick = () => {
    if (pathname === '/' && searchInputRef?.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbar__container}>
        <Link href="/" className={styles.navbar__brand}>
          <DesktopLogo className={styles.logo__desktop} />
          <MobileLogo className={styles.logo__mobile} />
        </Link>

        <ul className={styles.navbar__links}>
          <li className="hide-on-mobile">
            <Button
              variant={'1'}
              className={styles.search_btn}
              onClick={handleSearchClick}
            >
              <SearchIcon />
            </Button>
          </li>
          <li className="hide-on-mobile">
            <Button variant={'1'} className={styles.customer_service_btn}>
              <CustomerServiceIcon />
            </Button>
          </li>
          <li>
            <Link href="/login" className={styles.navbar__link}>
              <Button variant={'1'} className={styles.login_btn}>
                Login
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/register" className={styles.navbar__link}>
              <Button variant={'2'} className={styles.register_btn}>
                Register
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
