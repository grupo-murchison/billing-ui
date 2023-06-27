import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: { main: '#007749' }, // Verde Murchison
    secondary: { main: '#505E70' }, // Gris Medio / texto secundario
    error: { main: '#E41E2D' }, // Rojo AIT
    warning: { main: '#FF8200' }, // Naranja TZ
    info: { main: '#005C97' }, // Azul UTE
    success: { main: '#003A76' }, // Azul AIT
    background: {
      default: '#F3F6F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          borderRadius: '6px',
          padding: '2px 16px',
          fontSize: '0.875rem',
          // fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
