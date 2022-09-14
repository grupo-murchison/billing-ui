import { AppRoutes } from '@navigation';

import { AuthProvider } from '@contexts';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
