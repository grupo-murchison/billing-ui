import { useContext, useMemo } from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import { Content } from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/components';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/Item.module.scss';

const Item = ({ title, icon, items }: ItemProps) => {
  const location = useLocation();
  const validRoutes = matchRoutes(items, location);

  const { toogleSidebar } = useContext(MainLayoutContext);

  const isActive = useMemo(() => {
    return validRoutes ? validRoutes.length > 0 : false;
  }, [validRoutes]);

  return (
    <div className={styles['menu-item']}>
      <div className={`${styles['item-icon']} ${isActive ? styles['item-icon--active'] : ''}`}>
        <span onClick={toogleSidebar}>{icon}</span>
      </div>
      <Content title={title} items={items} isActive={isActive} />
    </div>
  );
};

type ItemProps = {
  title: string;
  icon: JSX.Element;
  items: {
    label: string;
    path: string;
  }[];
};

export default Item;
