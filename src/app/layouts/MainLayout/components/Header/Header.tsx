import { useContext } from 'react';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import { MenuIcon, SearchIcon, QuestionMarkIcon, AccountCircleIcon } from '@assets/icons';

import styles from '@app/layouts/MainLayout/components/Header/Header.module.scss';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  const { toogleSidebar } = useContext(MainLayoutContext);

  return (
    <>
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
    </>
  );
};

// TODO Nuevo Header con componentes MUI nativos. Falta terminar y debe reemplazar al viejo
export const NavBar = () => {
  const { toogleSidebar } = useContext(MainLayoutContext);

  <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }} color='default'>
    <Toolbar>
      <div className={styles['sidebar-trigger']}>
        <span onClick={toogleSidebar}>
          <MenuIcon />
        </span>
      </div>
      <Typography variant='h6' noWrap component='div'>
        Clipped drawer
      </Typography>
    </Toolbar>
  </AppBar>;
};

export default Header;
