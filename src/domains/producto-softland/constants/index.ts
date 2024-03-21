import { BreadcrumbItem } from '@app/hocs';

export const labelAndPath = { label: 'Producto Softland', path: '/producto-softland' };

export const ProductoSoftlandDataGridBreadcrumb: BreadcrumbItem[] = [labelAndPath];

export const ProductoSoftlandCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoftlandDataGridBreadcrumb,
  { label: 'Nuevo', path: '/producto-softland/create' },
];

export const ProductoSoftlandEditBreadcrumb: BreadcrumbItem[] = [
  ...ProductoSoftlandDataGridBreadcrumb,
  { label: 'Editar', path: '' },
];
