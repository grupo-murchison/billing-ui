import { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { MainLayoutContext } from '@app/layouts/MainLayout/contexts';

import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@assets/icons';

import styles from '@app/layouts/MainLayout/components/Content/components/Sidebar/components/Item/components/Content/Content.module.scss';

const Content = ({ title, items, isActive, isOpen, closeItself }: ContentProps) => {
  const { isSidebarOpen, closeSidebar } = useContext(MainLayoutContext);

  const [isContentItemsVisible, setIsContentItemsVisible] = useState<boolean>(false);

  const handleArrowToggleClick = useCallback(() => {
    setIsContentItemsVisible(prevValue => !prevValue);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsContentItemsVisible(true);
    }
  }, [isOpen]);

  return (
    <div
      className={clsx(styles['content'], {
        [styles['content--open']]: isSidebarOpen || isOpen,
        [styles['content--self-open']]: !isSidebarOpen && isOpen,
      })}
    >
      <div
        className={clsx(styles['content-title'], {
          [styles['content-title--active']]: isActive,
          [styles['content-title--hide']]: isOpen && !isSidebarOpen,
        })}
      >
        <span>{title}</span>
        <span onClick={handleArrowToggleClick}>
          {isContentItemsVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </span>
      </div>
      <ul className={`${styles['content-items']} ${isContentItemsVisible ? '' : styles['content-items--hide']}`}>
        {items?.map(x => (
          <li key={x.path}>
            <Link
              to={x.path}
              onClick={() => {
                closeSidebar();
                closeItself();
              }}
            >
              {x.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

type ContentProps = {
  isActive: boolean;
  isOpen: boolean;
  title: string;
  closeItself: () => void;
  items: {
    label: string;
    path: string;
  }[];
};

export default Content;
