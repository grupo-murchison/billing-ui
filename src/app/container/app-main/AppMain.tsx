import { AppRoutes } from '@app/navigation';
import { AuthProvider } from '@app/contexts';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(0, 119, 73)',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppRoutes />
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
