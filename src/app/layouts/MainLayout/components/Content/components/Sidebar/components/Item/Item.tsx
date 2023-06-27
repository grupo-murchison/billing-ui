import { useCallback, useMemo, useContext } from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';

import { Content } from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/components';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/Item.module.scss';
import { ItemProps } from '@app/layouts/MainLayout/interfaces/main-layout.interface';

const Item = ({ title, icon, items }: ItemProps) => {
  const location = useLocation();
  const validRoutes = matchRoutes(items, location);

  const { idSidebarItemOpen, toogleSidebarItemContent, closeSidebarItemContent } = useContext(MainLayoutContext);

  const isItemOpen = useMemo(() => {
    return idSidebarItemOpen === title;
  }, [idSidebarItemOpen, title]);

  const isActive = useMemo(() => {
    return validRoutes ? validRoutes.length > 0 : false;
  }, [validRoutes]);

  const toogleItemContent = useCallback(() => {
    toogleSidebarItemContent(title);
  }, [toogleSidebarItemContent, title]);

  const closeItself = useCallback(() => {
    closeSidebarItemContent();
  }, [closeSidebarItemContent]);

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

export default Item;
