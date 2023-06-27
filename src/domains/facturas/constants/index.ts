import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const FacturasLabelAndPath = { label: 'Facturas', path: '/facturas' };

export const FacturasDataGridBreadcrumb: BreadcrumbItem[] = [{ ...FacturasLabelAndPath }];

export const ContratoEditBreadcrumb: BreadcrumbItem[] = [
  { ...FacturasLabelAndPath },
  { label: 'Editar Factura', path: `${FacturasLabelAndPath.path}/edit` },
];
