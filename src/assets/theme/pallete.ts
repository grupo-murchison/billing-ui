import { PaletteOptions } from '@mui/material';

import vars from '../scss/_variables.module.scss';

export const colors = {
  primary: {
    main: vars.primaryMain,
    light: vars.primaryLight,
    dark: vars.primaryDark,
    50: vars.primary50,
    100: vars.primary100,
    200: vars.primary200,
    300: vars.primary300,
    400: vars.primary400,
    500: vars.primary500,
    600: vars.primary600,
    700: vars.primary700,
    800: vars.primary800,
    900: vars.primary900,
  },
  secondary: { main: vars.secondaryMain },
  error: { main: vars.errorMain },
  info: { main: vars.infoMain },
  success: { main: vars.successMain },
  warning: { main: vars.warningMain },
  background: { default: vars.backgroundDefault, paper: vars.backgroundPaper },
  text: { primary: vars.textPrimary, secondary: vars.textSecondary, disabled: vars.textDisabled },
};

export const palette: PaletteOptions = {
  primary: { ...colors.primary }, // Verde Murchison
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
