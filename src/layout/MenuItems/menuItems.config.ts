// assets
import { IMenuItemGroup } from './menu-items.interface';

//nano
import { DescriptionIcon, InventoryIcon, AccountTreeIcon, ReceiptIcon, DashboardIcon } from '@assets/icons';

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
          url: '/contrato',
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
      id: 'facturacion',
      title: 'Facturación',
      type: 'collapse',
      icon: ReceiptIcon,
      children: [
        {
          id: 'facturacion',
          title: 'Facturación',
          type: 'item',
          url: '/facturacion',
          breadcrumbs: false,
        },
        {
          id: 'facturacionReversion',
          title: 'Reversión',
          type: 'item',
          url: '/facturacion/reversion',
          breadcrumbs: false,
        },
        {
          id: 'facturacionReporte',
          title: 'Reporte',
          type: 'item',
          url: '/facturacion/reporte',
          breadcrumbs: false,
        },
        {
          id: 'facturacionMasiva',
          title: 'Masiva',
          type: 'item',
          url: 'facturacion/masiva',
          breadcrumbs: false,
        },
        {
          id: 'facturacionLog',
          title: 'Log de Facturación',
          type: 'item',
          url: 'facturacion/log',
          breadcrumbs: false,
        },
        {
          id: 'facturacionEventosCliente',
          title: 'Eventos Del Cliente',
          type: 'item',
          url: '/eventos-cliente',
          breadcrumbs: false,
        },
        {
          id: 'facturacionEventosServiciosCliente',
          title: 'Eventos Por Servicios ',
          type: 'item',
          url: '/eventos-servicios-cliente',
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

const menuItems: IMenuItemGroup[] = [dashboard, contrato, facturaciones, otros];

export default menuItems;
