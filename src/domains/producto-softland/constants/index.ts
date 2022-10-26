import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const ProductoSoftlandDataGridBreadcrumb: BreadcrumbItem[] = [
  { label: 'Producto Sofland', path: '/producto-softland' },
];

export const ProductoSoftlandCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoftlandDataGridBreadcrumb,
  { label: 'Nuevo', path: '/producto-softland/create' },
];

export const ProductoSoftlandEditBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoftlandDataGridBreadcrumb,
  { label: 'Editar', path: '' },
];
