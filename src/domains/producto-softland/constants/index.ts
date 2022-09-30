import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const ProductoSoflandDataGridBreadcrumb: BreadcrumbItem[] = [
  { label: 'Producto Sofland', path: '/producto-softland' },
];

export const ProductoSoflandCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoflandDataGridBreadcrumb,
  { label: 'Nuevo', path: '/producto-softland/create' },
];

export const ProductoSoflandEditBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoflandDataGridBreadcrumb,
  { label: 'Editar', path: '' },
];
