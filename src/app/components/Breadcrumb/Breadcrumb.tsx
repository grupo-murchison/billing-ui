import { Link as RouterLink } from 'react-router-dom';

import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { NavigateNextIcon } from '@assets/icons';
import { useTranslation } from 'react-i18next';


const Breadcrumb = ({ items }: BreadcrumbProps) => {

  const { t, i18n } = useTranslation();
  
  const breadcrumbs = [{ label: t('breadcrumb.inicio') , path: '/' }].concat(items);

  return (
    <Stack spacing={2} marginBottom={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='medium' sx={{ color: 'text.primary' }} />}
        aria-label='breadcrumb'
      >
        {breadcrumbs.map((item, index) => {
          if ((breadcrumbs.length > 1 && index === 0) || index !== breadcrumbs.length - 1) {
            return (
              <Link
                key={index}
                component={RouterLink}
                to={item.path}
                underline='hover'
                variant='h4'
                color='text.primary'
              >
                {item.label}
              </Link>
            );
          } else {
            return (
              <Typography key={index} variant='h4' color='text.secondary'>
                {item.label}
              </Typography>
            );
          }
        })}
      </Breadcrumbs>
    </Stack>
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
