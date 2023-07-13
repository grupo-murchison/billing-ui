import { createTheme } from '@mui/material/styles';
import { typography } from './typography';
import { components } from './components';
import { transitions } from './transitions';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: { main: '#007749' }, // Verde Murchison
    secondary: { main: '#505E70' }, // Gris Medio - texto secundario
    error: { main: '#E41E2D' }, // Rojo AIT
    warning: { main: '#FF8200' }, // Naranja TZ
    info: { main: '#005C97' }, // Azul UTE
    success: { main: '#003A76' }, // Azul AIT
    background: {
      default: '#F3F6F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#38485C',
      secondary: '#505E70', // Gris Medio - texto secundario'
      disabled: '#9EAABB',
    },
  },
  typography: { ...typography },
  components: { ...components },
  transitions: { ...transitions },
});

export default theme;
