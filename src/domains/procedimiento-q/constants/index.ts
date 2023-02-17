import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const label = {
  procedimientoQ: 'Procedimiento Cantidad',
};

export const ProcedimientoQDataGridBreadcrumb: BreadcrumbItem[] = [
  { label: label.procedimientoQ, path: '/procedimiento-q' },
];

export const ProcedimientoQCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProcedimientoQDataGridBreadcrumb,
  { label: 'Nuevo', path: '/procedimiento-q/create' },
];

export const ProcedimientoQEditBreadcrumb: BreadcrumbItem[] = [
  ...ProcedimientoQDataGridBreadcrumb,
  { label: 'Editar', path: '' },
];
