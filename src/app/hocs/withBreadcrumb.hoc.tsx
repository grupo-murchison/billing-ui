import type { ComponentType } from 'react';

import { Link } from 'react-router-dom';

import type { BreadcrumbItem } from '@app/utils/types/breadcrumb.type';

import { Breadcrumbs, Box, Typography } from '@mui/material';

const withBreadcrumb = <TProps,>(
  Component: ComponentType<TProps & JSX.IntrinsicAttributes>,
  breadcrumb: BreadcrumbItem[],
) => {
  return (props: TProps & JSX.IntrinsicAttributes) => {
    return (
      <>
        <Box component='div' sx={{ p: 2, backgroundColor: '#fff', marginBottom: '1rem' }}>
          <Breadcrumbs aria-label='breadcrumb'>
            <Link to='/'>Inicio</Link>
            {breadcrumb.map((x, k) => {
              return k !== breadcrumb.length - 1 ? (
                <Link key={k} to={x.path}>
                  {x.label}
                </Link>
              ) : (
                <Typography key={k} color='text.primary'>
                  {x.label}
                </Typography>
              );
            })}
          </Breadcrumbs>
        </Box>

        <Component {...props} />
      </>
    );
  };
};

export default withBreadcrumb;
