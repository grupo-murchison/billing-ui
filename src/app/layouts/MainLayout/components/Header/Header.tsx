import { useContext } from 'react';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import { MenuIcon, SearchIcon, QuestionMarkIcon, AccountCircleIcon } from '@assets/icons';

import styles from '@app/layouts/MainLayout/components/Header/Header.module.scss';

const Header = () => {
  const { toogleSidebar } = useContext(MainLayoutContext);

  return (
    <div className={styles['header']}>
      <div className={styles['sidebar-trigger']}>
        <span onClick={toogleSidebar}>
          <MenuIcon />
        </span>
      </div>
      {/* // TODO Ajustar estilos del logo  */}
      <div className={styles['header-container']}>
        <div className={styles['header-brand']}>
          <img src='/logo/logo-murchison.png' alt='LOGO' />
        </div>
        <div className={`${styles['icon-wrapper']} ${styles['icon-wrapper-search']}`}>
          <SearchIcon />
        </div>
        <div className={`${styles['icon-wrapper']} ${styles['icon-wrapper-help']}`}>
          <QuestionMarkIcon />
        </div>
        <div className={styles['user-tools']}>
          <AccountCircleIcon />
          <span>Nombre de Usuario</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
