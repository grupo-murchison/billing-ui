import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoutes from '@app/routes/Private.routes';

import { AuthRoutes } from '@domains/auth/navigation';

import { ROUTES } from '@app/routes';
import { ToastProvider } from '@app/components/Toast/ToastProvider';

const AppRoutes = () => {
  const BASEPATH = ROUTES.login.base;
  const LOGINPATH = ROUTES.login.login;
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path={`/${BASEPATH}/*`} element={<AuthRoutes />} />
          <Route path={`/${LOGINPATH}/*`} element={<Navigate to={`/${BASEPATH}/${LOGINPATH}`} replace />} />
          <Route path='/*' element={<PrivateRoutes />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
