import { Fragment, useCallback, useState } from 'react';
import type { ReactNode, MouseEvent } from 'react';

import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '@app/design-system/icons';

import MenuItem from '@app/container/app-main/components/Sidebar/Section/Item';

import { ClassNameHandlerLib } from '@libs';

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
      className={ClassNameHandlerLib.merge('section__item section__item--submenu', {
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
