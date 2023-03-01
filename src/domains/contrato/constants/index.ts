import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

const base = { label: 'Contrato', path: '/contrato' };

export const ContratoDataGridBreadcrumb: BreadcrumbItem[] = [{ ...base }];

export const ContratoCreateBreadcrumb: BreadcrumbItem[] = [
  { ...base },
  { label: 'Nuevo Contrato', path: `${base.path}/create` },
];

export const ContratoEditBreadcrumb: BreadcrumbItem[] = [
  { ...base },
  { label: 'Editar Contrato', path: `${base.path}/edit` },
];
