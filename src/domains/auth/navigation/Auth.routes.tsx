import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthLogin } from '@domains/auth/container/auth-login';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<AuthLogin />} />
      <Route path='*' element={<Navigate to='/auth/login' replace />} />
    </Routes>
  );
};

export default AuthRoutes;
