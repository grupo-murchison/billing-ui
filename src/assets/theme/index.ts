import { createTheme } from '@mui/material/styles';
import '@fontsource-variable/open-sans';
import '@fontsource/roboto';

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
    // h1: {
    //   fontFamily: 'Roboto',
    //   fontSize: '2.3125rem',
    //   letterSpacing: '-0.125rem',
    //   lineHeight: '2.75rem',
    //   fontWeight: 900,
    // },
    // h2: {
    //   fontFamily: 'Roboto',
    //   fontSize: '1.75rem',
    //   letterSpacing: '-1.125rem',
    //   lineHeight: '2.75rem',
    //   fontWeight: 700,
    // },
    // h3: {
    //   fontFamily: 'Roboto',
    //   fontSize: '1.3125rem',
    //   letterSpacing: '-0.0625rem',
    //   lineHeight: '1.75rem',
    //   fontWeight: 700,
    // },
    // h4: {
    //   fontFamily: 'Roboto',
    //   fontSize: '1.1875rem',
    //   letterSpacing: '-0.0625rem',
    //   lineHeight: '1.5rem',
    //   fontWeight: 700,
    // },
    // h5: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '1.0625rem',
    //   letterSpacing: '-0.0625rem',
    //   lineHeight: '1.5rem',
    //   fontWeight: 600,
    // },
    // h6: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '1rem',
    //   letterSpacing: '0rem',
    //   lineHeight: '1.5rem',
    //   fontWeight: 700,
    // },
    // body1: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '1rem',
    //   letterSpacing: '0rem',
    //   lineHeight: '1.5rem',
    //   fontWeight: 400,
    // },
    // body2: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '0.8125rem',
    //   letterSpacing: '0rem',
    //   lineHeight: '1.25rem',
    //   fontWeight: 400,
    // },
    // subtitle1: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '1.1875rem',
    //   letterSpacing: '0.4375rem',
    //   lineHeight: '1.25rem',
    //   //falta el dato en miro
    //   fontWeight: 400,
    // },
    // button: {
    //   fontFamily: 'Open Sans Variable',
    //   textTransform: 'capitalize',
    //   fontSize: '1.125rem',
    //   letterSpacing: '0rem',
    //   lineHeight: '1.25rem',
    //   fontWeight: 600,
    // },
    // overline: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '0.8125rem',
    //   letterSpacing: '0.125rem',
    //   lineHeight: '1.25rem',
    //   fontWeight: 400,
    // },
    // caption: {
    //   fontFamily: 'Open Sans Variable',
    //   fontSize: '0.73125rem',
    //   letterSpacing: '0.125rem',
    //   lineHeight: '1rem',
    //   fontWeight: 400,
    // },
    h1: {
      fontFamily: 'Roboto',
      fontSize: '37px',
      letterSpacing: '-2px',
      lineHeight: '44px',
      fontWeight: 900,
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: '28px',
      letterSpacing: '-2px',
      lineHeight: '34px',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: '21px',
      letterSpacing: '-1px',
      lineHeight: '28px',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: '19px',
      letterSpacing: '-1px',
      lineHeight: '24px',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Open Sans Variable',
      fontSize: '17px',
      letterSpacing: '-1px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Open Sans Variable',
      fontSize: '16px',
      letterSpacing: '0px',
      lineHeight: '24px',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Open Sans Variable',
      fontSize: '16px',
      letterSpacing: '0px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Open Sans Variable',
      fontSize: '13px',
      letterSpacing: '0px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: 'Open Sans Variable',
      fontSize: '19px',
      letterSpacing: '-1px',
      lineHeight: '28px',
      //falta el dato en miro
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Open Sans Variable',
      textTransform: 'capitalize',
      fontSize: '18px',
      letterSpacing: '0px',
      lineHeight: '20px',
      fontWeight: 600,
    },
    overline: {
      fontFamily: 'Open Sans Variable',
      fontSize: '13px',
      letterSpacing: '2px',
      lineHeight: '16px',
      fontWeight: 400,
    },
    caption: {
      fontFamily: 'Open Sans Variable',
      fontSize: '11.7px',
      letterSpacing: '2px',
      lineHeight: '16px',
      fontWeight: 400,
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
