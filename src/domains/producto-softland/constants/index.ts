import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const ProductoSoflandGridBreadcrumb: BreadcrumbItem[] = [
  { label: 'Producto Sofland', path: '/producto-softland' },
];

export const ProductoSoflandCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoflandGridBreadcrumb,
  { label: 'Nuevo', path: '/producto-softland/create' },
];

export const ProductoSoflandEditBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoflandGridBreadcrumb,
  { label: 'Editar', path: '' },
];
