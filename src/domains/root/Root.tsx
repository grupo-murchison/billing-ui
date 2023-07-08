import { withBreadcrumb } from '@app/hocs';
import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

function RootLayout() {
  return <></>;
}

const RootBreadcrumb: BreadcrumbItem[] = [{ label: '', path: '/' }];

export default withBreadcrumb(RootLayout, RootBreadcrumb);
