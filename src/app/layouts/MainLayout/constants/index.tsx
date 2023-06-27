import { DescriptionIcon, AccountTreeIcon, InventoryIcon, ReceiptIcon } from '@assets/icons';
import { ItemProps } from '../interfaces/main-layout.interface';

export const MENU_CONTRATOS_ITEMS: ItemProps = {
  title: 'Contratos',
  icon: <DescriptionIcon />,
  items: [
    {
      label: 'Contrato',
      path: '/contrato',
    },
    {
      label: 'Modelo acuerdo',
      path: '/modelo-acuerdo',
    },
    {
      label: 'Concepto acuerdo',
      path: '/concepto-acuerdo',
    },
  ],
};

export const MENU_PROCEDIMIENTOS_ITEMS: ItemProps = {
  title: 'Procedimientos',
  icon: <AccountTreeIcon />,
  items: [
    {
      label: 'Procedimiento Cantidad',
      path: '/procedimiento-q',
    },
    {
      label: 'Procedimiento Cantidad Custom',
      path: '/procedimiento-custom',
    },
    {
      label: 'Procedimiento Precio',
      path: '/procedimiento-p',
    },
    {
      label: 'Procedimiento Producto Softland',
      path: '/procedimiento-ps',
    },
  ],
};

export const MENU_OTHER_ITEMS: ItemProps = {
  title: 'Otros',
  icon: <InventoryIcon />,
  items: [
    {
      label: 'Producto Softland',
      path: '/producto-softland',
    },
  ],
};

export const MENU_FACTURACION_ITEMS: ItemProps = {
  title: 'Facturación',
  icon: <ReceiptIcon />,
  items: [
    {
      label: 'Facturación',
      path: '/facturas',
    },
  ],
};

export const MENU_ITEMS: ItemProps[] = [
  MENU_CONTRATOS_ITEMS,
  MENU_FACTURACION_ITEMS,
  MENU_PROCEDIMIENTOS_ITEMS,
  MENU_OTHER_ITEMS,
];
