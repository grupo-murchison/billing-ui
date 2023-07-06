import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const FacturacionLabelAndPath = { label: 'Factura', path: '/facturacion' };

export const FacturacionDataGridBreadcrumb: BreadcrumbItem[] = [{ ...FacturacionLabelAndPath }];

export const FacturacionEditBreadcrumb: BreadcrumbItem[] = [
  { ...FacturacionLabelAndPath },
  { label: 'Editar Factura', path: `${FacturacionLabelAndPath.path}/edit` },
];
