import { MENU_ITEMS } from '@layouts/Sidebar/_constants';
import MenuSection from '@layouts/Sidebar/Section/Section';

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
