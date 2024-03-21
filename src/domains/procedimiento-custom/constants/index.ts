import { BreadcrumbItem } from '@app/hocs';

export const label = {
  procedimientoCustom: 'Procedimiento Cantidad Custom',
};

export const ProcedimientoCustomDataGridBreadcrumb: BreadcrumbItem[] = [
  { label: label.procedimientoCustom, path: '/procedimiento-custom' },
];

export const ProcedimientoCustomCreateBreadcrumb: BreadcrumbItem[] = [
  ...ProcedimientoCustomDataGridBreadcrumb,
  { label: 'Nuevo', path: '/procedimiento-custom/create' },
];

export const ProcedimientoCustomEditBreadcrumb: BreadcrumbItem[] = [
  ...ProcedimientoCustomDataGridBreadcrumb,
  { label: 'Editar', path: '' },
];
