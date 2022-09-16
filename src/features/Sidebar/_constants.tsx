import { SetttingsIcon } from '@design-system/icons';

export const MENU_DASHBOARD_ITEMS = {
  title: 'Dashboard',
  childs: [
    {
      label: 'Default',
      icon: <SetttingsIcon />,
      path: '/',
    },
    {
      label: 'Producto Softland',
      icon: <SetttingsIcon />,
      path: '/productosoftland',
    },
  ],
};

export const MENU_APPLICATION_ITEMS = {
  title: 'Application',
  childs: [
    {
      label: 'Users',
      icon: <SetttingsIcon />,
      childs: [
        {
          label: 'Social Profile',
          icon: <SetttingsIcon />,
          path: '/social-profile',
        },
        {
          label: 'Account Profile',
          icon: <SetttingsIcon />,
          childs: [
            {
              label: 'Profile 01',
              icon: <SetttingsIcon />,
              path: '/account-profile/profile-01',
            },
            {
              label: 'Profile 02',
              icon: <SetttingsIcon />,
              path: '/account-profile/profile-02',
            },
            {
              label: 'Profile 03',
              icon: <SetttingsIcon />,
              path: '/account-profile/profile-03',
            },
          ],
        },
      ],
    },
  ],
};

export const MENU_ITEMS = [MENU_DASHBOARD_ITEMS, MENU_APPLICATION_ITEMS];
