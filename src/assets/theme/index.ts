import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 133, 80)', // === '#008651'
    },
    secondary: { main: 'rgb(112, 112, 112)' },
  },
  typography: {
    button: {
      textTransform: 'capitalize',
    },
  },
});

export default theme;
