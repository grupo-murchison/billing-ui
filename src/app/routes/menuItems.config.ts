// assets
import { IMenuItemGroup } from '../../layout/interfaces/menu-items.interface';

//nano
import {
  DescriptionIcon,
  InventoryIcon,
  AccountTreeIcon,
  ReceiptIcon,
  DashboardIcon,
  MediationIcon,
} from '@assets/icons';

import { ROUTES } from './constants';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard: IMenuItemGroup = {
  id: 'dashboard',
  type: 'group',
  // title: 'Dashboard',
  // caption: 'Dashboard Caption',
  children: [
    {
      id: 'dashboard',
      icon: DashboardIcon,
      title: 'Inicio',
      type: 'item',
      url: '/',
    },
  ],
};

const contrato: IMenuItemGroup = {
  id: 'contratos',
  type: 'group',
  children: [
    {
      id: 'contratos',
      title: 'Contratos',
      type: 'collapse',
      icon: DescriptionIcon,
      children: [
        {
          id: 'contrato',
          title: 'Contrato',
          type: 'item',
          url: ROUTES.contrato,
          breadcrumbs: false,
        },
        {
          id: 'modeloAcuerdo',
          title: 'Modelo acuerdo',
          type: 'item',
          url: '/modelo-acuerdo',
          breadcrumbs: false,
        },
        {
          id: 'conceptoAcuerdo',
          title: 'Concepto Acuerdo',
          type: 'item',
          url: '/concepto-acuerdo',
          breadcrumbs: false,
        },
      ],
    },
    {
      id: 'procedimientos',
      title: 'Procedimientos',
      type: 'collapse',
      icon: AccountTreeIcon,
      children: [
        {
          id: 'procedimientoCantidad',
          title: 'Procedimiento Cantidad',
          type: 'item',
          url: '/procedimiento-q',
          breadcrumbs: false,
        },
        {
          id: 'procedimientoCantidadCustom',
          title: 'Procedimiento Cantidad Custom',
          type: 'item',
          url: '/procedimiento-custom',
          breadcrumbs: false,
        },
        {
          id: 'procedimientoPrecio',
          title: 'Procedimiento Precio',
          type: 'item',
          url: '/procedimiento-p',
          breadcrumbs: false,
        },
        {
          id: 'procedimientoProducto',
          title: 'Procedimiento Producto Softland',
          type: 'item',
          url: '/procedimiento-ps',
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const facturaciones: IMenuItemGroup = {
  id: 'facturaciones',
  // title: 'Facturaciones
  type: 'group',
  children: [
    {
      id: 'calculoFacturacion',
      title: 'Cálculo de Facturación',
      type: 'collapse',
      icon: ReceiptIcon,
      children: [
        {
          id: 'calculo',
          title: 'Calcular Facturación',
          type: 'item',
          url: '/calculo-facturacion',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionMasiva',
          title: 'Calcular Facturación Masiva',
          type: 'item',
          url: '/calculo-facturacion/masiva',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionReversion',
          title: 'Reversión',
          type: 'item',
          url: '/calculo-facturacion/reversion',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionReporte',
          title: 'Reporte',
          type: 'item',
          url: '/calculo-facturacion/reporte',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionLog',
          title: 'Log',
          type: 'item',
          url: '/calculo-facturacion/log',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionEventosServiciosCliente',
          title: 'Eventos Por Servicios ',
          type: 'item',
          url: '/calculo-facturacion/eventos-servicios-cliente',
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const eventos: IMenuItemGroup = {
  id: 'eventos',
  type: 'group',
  children: [
    {
      id: 'eventos',
      title: 'Eventos',
      type: 'collapse',
      icon: MediationIcon,
      children: [
        {
          id: 'evento',
          title: 'Evento',
          type: 'item',
          url: '/evento',
          breadcrumbs: false,
        },
        {
          id: 'calculoFacturacionEventosCliente',
          title: 'Eventos Del Cliente',
          type: 'item',
          url: '/calculo-facturacion/eventos-cliente',
          breadcrumbs: false,
        },
        {
          id: 'tablaDinamica',
          title: 'Tabla Dinámica',
          type: 'item',
          url: '/tabla-dinamica',
          breadcrumbs: false,
        },
        {
          id: 'eventoError',
          title: 'Evento con Error',
          type: 'item',
          url: '/evento-error',
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const otros: IMenuItemGroup = {
  id: 'otros',
  type: 'group',
  children: [
    {
      id: 'otros',
      title: 'Otros',
      type: 'collapse',
      icon: InventoryIcon,
      children: [
        {
          id: 'productoSoftland',
          title: 'Producto Softland',
          type: 'item',
          url: '/producto-softland',
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const menuItems: IMenuItemGroup[] = [dashboard, contrato, facturaciones, eventos, otros];

export default menuItems;
