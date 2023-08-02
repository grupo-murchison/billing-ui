import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const FacturacionLabelAndPath = { label: 'Facturación', path: '/facturacion' };

export const FacturacionDataGridBreadcrumb: BreadcrumbItem[] = [{ ...FacturacionLabelAndPath }];

export const FacturacionEditBreadcrumb: BreadcrumbItem[] = [
  { label: 'Facturación Reversión', path: `${FacturacionLabelAndPath.path}/edit` },
];

export const FacturacionReporteBreadcrumb: BreadcrumbItem[] = [
  { label: 'Facturación Reporte', path: '/facturacion/reporte' },
];
