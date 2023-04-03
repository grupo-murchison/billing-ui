import { DescriptionIcon, AccountTreeIcon, InventoryIcon } from '@assets/icons';

export const MENU_CONTRATOS_ITEMS = {
  title: 'Contratos',
  icon: <DescriptionIcon />,
  childs: [
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

export const MENU_PROCEDIMIENTOS_ITEMS = {
  title: 'Procedimientos',
  icon: <AccountTreeIcon />,
  childs: [
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

export const MENU_OTHER_ITEMS = {
  title: 'Otros',
  icon: <InventoryIcon />,
  childs: [
    {
      label: 'Producto Softland',
      path: '/producto-softland',
    },
  ],
};

export const MENU_ITEMS = [MENU_CONTRATOS_ITEMS, MENU_PROCEDIMIENTOS_ITEMS, MENU_OTHER_ITEMS];
