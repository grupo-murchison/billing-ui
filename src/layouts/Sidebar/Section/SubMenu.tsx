import { Fragment, useCallback, useState } from 'react';
import type { ReactNode, MouseEvent } from 'react';

import clsx from 'clsx';

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

import MenuItem from '@layouts/Sidebar/Section/Item';

const SectionSubMenu = ({ data }: SectionSubMenuProps) => {
  const [isSubMenuCollapsed, setIsMenuCollapsed] = useState(true);

  const handleTogglerClick = useCallback((e: MouseEvent) => {
    e.preventDefault();

    setIsMenuCollapsed(prev => !prev);
  }, []);

  if (!data.childs) {
    return null;
  }

  return (
    <li
      className={clsx('section__item section__item--submenu', {
        'is-collapsed': isSubMenuCollapsed,
      })}
    >
      <a href='#!' onClick={handleTogglerClick}>
        {data.icon}
        <span>{data.label}</span>
        {isSubMenuCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </a>
      <ul>
        {data.childs.map((x, k) => (
          <Fragment key={k}>{x.path ? <MenuItem data={x} /> : x.childs ? <SectionSubMenu data={x} /> : <></>}</Fragment>
        ))}
      </ul>
    </li>
  );
};

type SectionSubMenuProps = {
  data: {
    icon: ReactNode;
    label: string;
    childs?: ChildProps[];
  };
};

type ChildProps = {
  path?: string;
  icon: ReactNode;
  label: string;
  childs?: ChildProps[];
};

export default SectionSubMenu;
