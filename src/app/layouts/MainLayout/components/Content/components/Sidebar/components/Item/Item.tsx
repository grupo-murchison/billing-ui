import { useCallback, useMemo, useState } from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';

import { Content } from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/components';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/Item.module.scss';

const Item = ({ title, icon, items }: ItemProps) => {
  const location = useLocation();
  const validRoutes = matchRoutes(items, location);

  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);

  const isActive = useMemo(() => {
    return validRoutes ? validRoutes.length > 0 : false;
  }, [validRoutes]);

  const toogleItemContent = useCallback(() => {
    setIsItemOpen(prevValue => !prevValue);
  }, []);

  const closeItself = useCallback(() => {
    setIsItemOpen(false);
  }, []);

  return (
    <div className={styles['menu-item']}>
      <div
        className={`${styles['item-icon']} ${isActive ? styles['item-icon--active'] : ''}`}
        onClick={toogleItemContent}
      >
        <span>{icon}</span>
      </div>
      <Content title={title} items={items} isActive={isActive} isOpen={isItemOpen} closeItself={closeItself} />
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
