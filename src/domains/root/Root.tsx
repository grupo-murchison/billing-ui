import { withBreadcrumb } from '@app/hocs';
import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';
import { Typography } from '@mui/material';

function RootLayout() {
  return <Typography variant='h4'>Inicio</Typography>;
}

const RootBreadcrumb: BreadcrumbItem[] = [{ label: '', path: '/' }];

export default withBreadcrumb(RootLayout, RootBreadcrumb);
