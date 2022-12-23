import { DescriptionIcon, AccountTreeIcon, GppGoodIcon } from '@assets/icons';

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
      label: 'Procedimiento Q',
      path: '/procedimiento-q',
    },
    {
      label: 'Procedimiento P',
      path: '/procedimiento-p',
    },
    {
      label: 'Procedimiento PS',
      path: '/procedimiento-ps',
    },
  ],
};

export const MENU_OTHER_ITEMS = {
  title: 'Otros',
  icon: <GppGoodIcon />,
  childs: [
    {
      label: 'Producto Softland',
      path: '/producto-softland',
    },
  ],
};

export const MENU_ITEMS = [MENU_CONTRATOS_ITEMS, MENU_PROCEDIMIENTOS_ITEMS, MENU_OTHER_ITEMS];
