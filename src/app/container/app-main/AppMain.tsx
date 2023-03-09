import { AppRoutes } from '@app/navigation';
import { AuthProvider } from '@app/contexts';

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import customTheme from '@assets/theme';

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
