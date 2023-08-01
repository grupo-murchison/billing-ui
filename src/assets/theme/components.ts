import { Components } from '@mui/material';
import { colors } from './pallete';

export const components: Components = {
  MuiButton: {
    styleOverrides: {
      // Name of the slot
      root: {
        borderRadius: '6px',
        padding: '5px 20px',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        'padding': '13px',
        '&.Mui-selected': {
          'backgroundColor': colors.primary.light,
          'borderLeft': '5px white solid',
          '&:hover': {
            backgroundColor: colors.primary.light,
          },
        },
      },
    },
  },
  MuiGrid2: {
    styleOverrides: {
      root: {},
    },
  },
};
