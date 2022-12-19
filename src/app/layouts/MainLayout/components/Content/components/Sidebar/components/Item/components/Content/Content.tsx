import { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@assets/icons';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/components/Content/Content.module.scss';

const Content = ({ title, items, isActive }: ContentProps) => {
  const { isSidebarOpen } = useContext(MainLayoutContext);

  const [isContentItemsVisible, setIsContentItemsVisible] = useState<boolean>(false);

  const handleArrowToggleClick = useCallback(() => {
    setIsContentItemsVisible(prevValue => !prevValue);
  }, []);

  return (
    <div className={`${styles['content']} ${isSidebarOpen ? styles['content--open'] : ''}`}>
      <div
        className={`
          ${styles['content-title']} 
          ${isActive ? styles['content-title--active'] : ''}
        `}
      >
        <span>{title}</span>
        <span onClick={handleArrowToggleClick}>
          {isContentItemsVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      <ul className={`${styles['content-items']} ${isContentItemsVisible ? '' : styles['content-items--hide']}`}>
        {items?.map(x => (
          <li key={x.path}>
            <Link to={x.path}>{x.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

type ContentProps = {
  isActive: boolean;
  title: string;
  items: {
    label: string;
    path: string;
  }[];
};

export default Content;
