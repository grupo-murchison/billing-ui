import { AppRoutes } from '@app/navigation';
import { AuthProvider } from '@app/contexts';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
