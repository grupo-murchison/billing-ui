import { PaletteOptions } from '@mui/material';

import vars from '../scss/_variables.module.scss';

export const colors = {
  primary: { main: vars.primaryMain, light: vars.primaryLight },
  secondary: { main: vars.secondaryMain },
  error: { main: vars.errorMain },
  info: { main: vars.infoMain },
  success: { main: vars.successMain },
  warning: { main: vars.warningMain },
  background: { default: vars.backgroundDefault, paper: vars.backgroundPaper },
  text: { primary: vars.textPrimary, secondary: vars.textSecondary, disabled: vars.textDisabled },
};

export const palette: PaletteOptions = {
  primary: { main: colors.primary.main, light: colors.primary.light }, // Verde Murchison
  secondary: { main: colors.secondary.main }, // Gris Medio - texto secundario
  error: { main: colors.error.main }, // Rojo AIT
  info: { main: colors.info.main }, // Azul UTE
  success: { main: colors.success.main }, // Azul AIT
  warning: { main: colors.warning.main }, // Naranja TZ
  background: {
    default: colors.background.default,
    paper: colors.background.paper,
  },
  text: {
    primary: colors.text.primary,
    secondary: colors.text.secondary, // Gris Medio - texto secundario'
    disabled: colors.text.disabled,
  },
};
