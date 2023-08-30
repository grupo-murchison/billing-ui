import { BreadcrumbItem } from '@app/hocs';

export const ContartoLabelAndPath = { label: 'Contrato', path: '/contrato' };

export const ContratoDataGridBreadcrumb: BreadcrumbItem[] = [{ ...ContartoLabelAndPath }];

export const ContratoCreateBreadcrumb: BreadcrumbItem[] = [
  { ...ContartoLabelAndPath },
  { label: 'Nuevo Contrato', path: `${ContartoLabelAndPath.path}/create` },
];

export const ContratoEditBreadcrumb: BreadcrumbItem[] = [
  { ...ContartoLabelAndPath },
  { label: 'Editar Contrato', path: `${ContartoLabelAndPath.path}/edit` },
];
