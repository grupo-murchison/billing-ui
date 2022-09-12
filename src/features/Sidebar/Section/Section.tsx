import { Fragment } from 'react';
import type { ReactNode } from 'react';

import MenuItem from '@features/Sidebar/Section/Item';
import SubMenu from '@features/Sidebar/Section/SubMenu';

const Section = ({ item }: SectionProps) => {
  return (
    <ul className='sidebar__section'>
      <li className='section__title'>{item.title}</li>
      {item.childs.map((x, k) => (
        <Fragment key={k}>{x.path ? <MenuItem data={x} /> : x.childs ? <SubMenu data={x} /> : <></>}</Fragment>
      ))}
    </ul>
  );
};

type SectionProps = {
  item: {
    title: string;
    childs: ChildProps[];
  };
};

type ChildProps = {
  path?: string;
  icon: ReactNode;
  label: string;
  childs?: ChildProps[];
};

export default Section;
