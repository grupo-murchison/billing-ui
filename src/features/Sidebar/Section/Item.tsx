import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const SectionItem = ({ data }: SectionItemProps) => {
  if (!data.path) {
    return null;
  }

  return (
    <li className='section__item'>
      <NavLink to={data.path} className={({ isActive }) => (isActive ? 'active' : '')}>
        {data.icon}
        <span>{data.label}</span>
      </NavLink>
    </li>
  );
};

type SectionItemProps = {
  data: {
    path?: string;
    icon: ReactNode;
    label: string;
  };
};

export default SectionItem;
