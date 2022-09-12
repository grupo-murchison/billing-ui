import { MENU_ITEMS } from '@features/Sidebar/_constants';

import MenuSection from '@features/Sidebar/Section';

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
