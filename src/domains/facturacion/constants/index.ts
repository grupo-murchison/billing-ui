import { BreadcrumbItem } from '@app/utils/types/withBreadcrumb.type';

export const FacturacionLabelAndPath = { label: 'Facturación', path: '/facturacion' };

export const FacturacionDataGridBreadcrumb: BreadcrumbItem[] = [{ ...FacturacionLabelAndPath }];

export const FacturacionReversionBreadcrumb: BreadcrumbItem[] = [
  { label: 'Facturación Reversión', path: `${FacturacionLabelAndPath.path}/reversion` },
];

export const FacturacionReporteBreadcrumb: BreadcrumbItem[] = [
  { label: 'Facturación Reporte', path: '/facturacion/reporte' },
];

export const ClienteEventosBreadcrumb: BreadcrumbItem[] = [
  { label: 'Eventos Del Cliente', path: '/facturacion/eventos-cliente' },
];

export const EventosServiciosBreadcrumb: BreadcrumbItem[] = [
  { label: 'Eventos Servicios', path: '/eventos-servicios-cliente' },
];

export const FacturacionMasivaBreadcrumb: BreadcrumbItem[] = [
  { label: 'Facturación Masiva', path: '/facturacion/masiva' },
];

export const FacturacionLogBreadcrumb: BreadcrumbItem[] = [{ label: 'Log de Facturación', path: '/facturacion/log' }];
