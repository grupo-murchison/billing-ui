import { Components } from '@mui/material';

export const components: Components = {
  MuiButton: {
    styleOverrides: {
      // Name of the slot
      root: {
        padding: '5px 20px',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        padding: '13px',
      },
    },
  },
  MuiGrid2: {
    styleOverrides: {
      root: {},
    },
  },
};
