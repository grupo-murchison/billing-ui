import { createTheme } from '@mui/material/styles';
import { typography } from './typography';
import { components } from './components';
import { transitions } from './transitions';
import { palette } from './pallete';

// A custom theme for this app
const theme = createTheme({
  palette: { ...palette },
  typography: { ...typography },
  components: { ...components },
  transitions: { ...transitions },
  shape: { borderRadius: 8 },
});

export default theme;
