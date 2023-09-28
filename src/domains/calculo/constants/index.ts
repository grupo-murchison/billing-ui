import { BreadcrumbItem } from '@app/hocs';

export const CalculoFacturacionLabelAndPath = { label: 'Cálculo de Facturación', path: '/calculo-facturacion' };

export const CalculoFacturacionDataGridBreadcrumb: BreadcrumbItem[] = [{ ...CalculoFacturacionLabelAndPath }];

export const CalculoFacturacionReversionBreadcrumb: BreadcrumbItem[] = [
  { label: 'Reversión Cálculo de Facturación', path: `${CalculoFacturacionLabelAndPath.path}/reversion` },
];

export const CalculoFacturacionReporteBreadcrumb: BreadcrumbItem[] = [
  { label: 'Cálculo de Facturación Reporte', path: `${CalculoFacturacionLabelAndPath.path}/reporte` },
];

export const ClienteEventosBreadcrumb: BreadcrumbItem[] = [
  { label: 'Eventos Del Cliente', path: `${CalculoFacturacionLabelAndPath.path}/eventos-cliente` },
];

export const EventosServiciosBreadcrumb: BreadcrumbItem[] = [
  { label: 'Eventos por Servicios', path: `${CalculoFacturacionLabelAndPath.path}/eventos-servicios-cliente` },
];

export const CalculoFacturacionMasivaBreadcrumb: BreadcrumbItem[] = [
  { label: 'Cálculo de Facturación Masiva', path: `${CalculoFacturacionLabelAndPath.path}/masiva` },
];

export const CalculoFacturacionLogBreadcrumb: BreadcrumbItem[] = [
  { label: 'Log Cálculo de Facturación', path: `${CalculoFacturacionLabelAndPath.path}/log` },
];
