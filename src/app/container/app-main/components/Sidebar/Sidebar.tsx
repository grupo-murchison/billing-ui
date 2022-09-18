import { MENU_ITEMS } from '@app/container/app-main/components/Sidebar/_constants';

import MenuSection from '@app/container/app-main/components/Sidebar/Section';

import './Sidebar.scss';

const Sidebar = () => {
  return (
    <nav className='app-nav'>
      <div className='nav-sidebar'>
        {MENU_ITEMS.map((x, k) => (
          <MenuSection key={k} item={x} />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
