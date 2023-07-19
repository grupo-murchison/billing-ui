import { PaletteOptions } from '@mui/material';

import vars from '../scss/_variables.module.scss';

const colors = {
  primary: { main: vars.primaryMain },
  secondary: { main: vars.secondaryMain },
  error: { main: vars.errorMain },
  info: { main: vars.infoMain },
  success: { main: vars.successMain },
  warning: { main: vars.warningMain },
};

export const palette: PaletteOptions = {
  primary: { main: colors.primary.main }, // Verde Murchison
  secondary: { main: '#505E70' }, // Gris Medio - texto secundario
  error: { main: '#E41E2D' }, // Rojo AIT
  info: { main: '#005C97' }, // Azul UTE
  success: { main: '#003A76' }, // Azul AIT
  warning: { main: '#FF8200' }, // Naranja TZ
  background: {
    default: '#F3F6F9',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#38485C',
    secondary: '#505E70', // Gris Medio - texto secundario'
    disabled: '#9EAABB',
  },
};
