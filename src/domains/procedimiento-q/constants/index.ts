import { BreadcrumbItem } from '@app/hocs';

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
