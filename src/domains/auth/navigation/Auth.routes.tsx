import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthLogin } from '@domains/auth/container/auth-login';

import { ROUTES } from '@app/routes'

const AuthRoutes = () => {

  const LOGINPATH = ROUTES.login.login
  const BASEPATH = ROUTES.login.base

  return (
    <Routes>
      <Route path={`/${LOGINPATH}`} element={<AuthLogin />} />
      <Route path='*' element={<Navigate to={`/${BASEPATH}/${LOGINPATH}`} replace />} />
    </Routes>
  );
};

export default AuthRoutes;
