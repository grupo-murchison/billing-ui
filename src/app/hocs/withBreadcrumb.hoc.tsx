import type { ComponentType } from 'react';

import { Breadcrumb } from '@app/components';

export type BreadcrumbItem = {
  path: string;
  label: string;
};

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
