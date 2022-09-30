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
      label: 'ProcedimientoPS',
      icon: <SetttingsIcon />,
      path: '/procedimiento-ps',
    },
  ],
};

export const MENU_ITEMS = [MENU_MAIN_ITEMS];
