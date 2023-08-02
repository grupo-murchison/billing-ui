import { Components, darken, alpha } from '@mui/material';
import { colors } from './pallete';

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
        'padding': '13px',
        '&.Mui-selected': {
          'backgroundColor': alpha(colors.primary.light, 0.85),
          'borderLeft': '5px white solid',
          '&:hover': {
            backgroundColor: darken(colors.primary.main, 0.2),
          },
        },
        '&:hover': {
          backgroundColor: darken(colors.primary.main, 0.2),
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
