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
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: alpha('#000', 0.85),
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  MuiDataGrid: {
    styleOverrides: {
      row: {
        '&.Mui-selected': {
          // 'color': colors.primary.main,
          // 'backgroundColor': alpha(colors.primary.main, 0.05),
          'fontWeight': 900,
          '&:hover': {
            // backgroundColor: alpha(colors.secondary.main, 0.85),
            color: 'white',
          },
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
  },
};
