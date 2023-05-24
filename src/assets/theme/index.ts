import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: { main: '#007749' }, // Verde Murchison
    secondary: { main: '#505E70' }, // Gris Medio / texto secundario
    error: { main: '#E41E2D' }, // Rojo AIT
    warning: { main: '#FF8200' }, // Naranja TZ
    info: { main: '#005C97' }, // Azul UTE
    success: { main: '#003A76'}// Azul AIT
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
  },
});

export default theme;
