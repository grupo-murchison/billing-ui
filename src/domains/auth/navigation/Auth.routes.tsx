import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthLogin } from '@domains/auth/container/auth-login';

import { LOGIN } from '@app/routes'

const AuthRoutes = () => {

  const BASEPATH = LOGIN.base
  const AUTHPATH = LOGIN.auth

  return (
    <Routes>
      <Route path={`${BASEPATH}`} element={<AuthLogin />} />
      <Route path='*' element={<Navigate to={`${AUTHPATH}`} replace />} />
    </Routes>
  );
};

export default AuthRoutes;
