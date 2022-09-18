import { useCallback } from 'react';

import { MenuIcon, SettingsOutlinedIcon } from '@assets/icons';

import './Navbar.scss';

const Navbar = () => {
  const handleTogglerClick = useCallback(() => {
    const bodyNode = document.getElementById('app-body');

    const isMenuOpen = bodyNode?.classList.contains('menu-open');

    if (isMenuOpen) {
      bodyNode?.classList.remove('menu-open');
      bodyNode?.classList.add('menu-closed');
    } else {
      bodyNode?.classList.add('menu-open');
      bodyNode?.classList.remove('menu-closed');
    }
  }, []);

  return (
    <header className='app-header'>
      <div className='header__navbar'>
        <div className='navbar__logo'>
          <img src='/logo/logo-placeholder.png' alt='LOGO' />
        </div>
        <div className='navbar__menu-toggler' onClick={handleTogglerClick}>
          <MenuIcon />
        </div>
        <div className='navbar__toolbar'>
          <div className='toolbar__profile'>
            <div className='toolbar__profile--user-thumbnail'>
              <img src='/img/user-profile-thumbnail.jpg' alt='USER-THUMBNAIL' />
            </div>
            <div className='toolbar__profile--wheel'>
              <SettingsOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
