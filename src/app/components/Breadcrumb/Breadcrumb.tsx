import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import styles from '@app/components/Breadcrumb/Breadcrumb.module.scss';

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className={styles['breadcrumb']}>
      <Link to='/'>Inicio</Link>
      <span>&#62;</span>
      {items.map((x, k) => {
        return k !== items.length - 1 ? (
          <>
            <Link key={k} to={x.path}>
              {x.label}
            </Link>
            <span>&#62;</span>
          </>
        ) : (
          <Typography key={k} color='text.primary'>
            {x.label}
          </Typography>
        );
      })}
    </div>
  );
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export type BreadcrumbItem = {
  path: string;
  label: string;
};

export default Breadcrumb;
