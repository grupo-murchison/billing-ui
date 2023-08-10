import type { ComponentType } from 'react';

import { Breadcrumb } from '@app/components';
import type { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

const withBreadcrumb = <TProps,>(
  Component: ComponentType<TProps & JSX.IntrinsicAttributes>,
  breadcrumb?: BreadcrumbItem[],
) => {
  return (props: TProps & JSX.IntrinsicAttributes) => {
    return (
      <>
        <Breadcrumb items={breadcrumb || []} />

        <Component {...props} />
      </>
    );
  };
};

export default withBreadcrumb;
