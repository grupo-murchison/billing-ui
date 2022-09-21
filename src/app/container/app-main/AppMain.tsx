import { AppRoutes } from '@app/navigation';
import { AuthProvider } from '@app/contexts';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App = () => {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppRoutes />
      </LocalizationProvider>
    </AuthProvider>
  );
};

export default App;
