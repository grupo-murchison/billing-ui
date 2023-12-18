import { useEffect } from 'react';
import { AppRoutes } from '@app/routes';
import { AuthProvider } from '@app/contexts';

import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';

import { useTranslation} from 'react-i18next';

import customTheme from '@assets/theme';

const App = () => {
  
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = 'Billing';
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <AppRoutes />
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
