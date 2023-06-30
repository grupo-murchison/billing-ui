import { withBreadcrumb } from '@app/hocs';
import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';
import { Button, Typography } from '@mui/material';

function RootLayout() {
  return <></>;
}

const RootBreadcrumb: BreadcrumbItem[] = [{ label: '', path: '/' }];

export default withBreadcrumb(RootLayout, RootBreadcrumb);
