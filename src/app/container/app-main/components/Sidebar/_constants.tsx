import { SetttingsIcon } from '@assets/icons';

export const MENU_MODELOS_ITEMS = {
  title: 'Modelos',
  childs: [
    {
      label: 'Modelo acuerdo',
      icon: <SetttingsIcon />,
      path: '/modelo-acuerdo',
    },
  ],
};

export const MENU_PROCEDIMIENTOS_ITEMS = {
  title: 'Procedimientos',
  childs: [
    {
      label: 'Procedimiento Q',
      icon: <SetttingsIcon />,
      path: '/procedimiento-q',
    },
    {
      label: 'Procedimiento P',
      icon: <SetttingsIcon />,
      path: '/procedimiento-p',
    },
    {
      label: 'Procedimiento PS',
      icon: <SetttingsIcon />,
      path: '/procedimiento-ps',
    },
  ],
};

export const MENU_OTHER_ITEMS = {
  title: 'Otros',
  childs: [
    {
      label: 'Producto Softland',
      icon: <SetttingsIcon />,
      path: '/producto-softland',
    },
  ],
};

export const MENU_ITEMS = [MENU_MODELOS_ITEMS, MENU_PROCEDIMIENTOS_ITEMS, MENU_OTHER_ITEMS];
