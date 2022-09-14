import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthPages } from '@pages';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/login' element={<AuthPages.LoginPage />} />
      <Route path='*' element={<Navigate to='/auth/login' replace />} />
    </Routes>
  );
};

export default AuthRoutes;
