import { Menu as MenuIcon, SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';

const Navbar = () => {
  return (
    <header className='app-header'>
      <div className='header__navbar'>
        <div className='navbar__logo'>
          <img src='./logo/logo-placeholder.png' alt='LOGO' />
        </div>
        <div className='navbar__menu-toggler'>
          <MenuIcon />
        </div>
        <div className='navbar__toolbar'>
          <div className='toolbar__profile'>
            <div className='toolbar__profile--user-thumbnail'>
              <img src='./img/user-profile-thumbnail.jpg' alt='USER-THUMBNAIL' />
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
