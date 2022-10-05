import { SetttingsIcon } from '@assets/icons';

export const MENU_MAIN_ITEMS = {
  title: 'Principal',
  childs: [
    {
      label: 'Producto Softland',
      icon: <SetttingsIcon />,
      path: '/producto-softland',
    },
    {
      label: 'Procedimiento PS',
      icon: <SetttingsIcon />,
      path: '/procedimiento-ps',
    },
    {
      label: 'Procedimiento P',
      icon: <SetttingsIcon />,
      path: '/procedimiento-p',
    },
  ],
};

export const MENU_ITEMS = [MENU_MAIN_ITEMS];
