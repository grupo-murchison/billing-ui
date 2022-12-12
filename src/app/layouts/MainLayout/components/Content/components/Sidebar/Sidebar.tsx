import { useContext } from 'react';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';
import { MENU_ITEMS } from '@app/layouts/MainLayout/constants';

import { Item } from '@app/layouts/MainLayout/components/Content/components/Sidebar/components';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/Sidebar.module.scss';

const Sidebar = () => {
  const { isSidebarOpen } = useContext(MainLayoutContext);

  return (
    <div className={`${styles['content-sidebar']} ${isSidebarOpen ? styles['content-sidebar--open'] : ''}`}>
      {MENU_ITEMS.map(x => (
        <Item key={x.title} title={x.title} icon={x.icon} items={x.childs} />
      ))}
    </div>
  );
};

export default Sidebar;
