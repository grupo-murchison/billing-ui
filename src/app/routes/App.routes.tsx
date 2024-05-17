import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoutes from '@app/routes/Private.routes';

import { AuthRoutes } from '@domains/auth/navigation';

import { LOGIN } from '@app/routes'

const AppRoutes = () => {

  const BASEPATH = LOGIN.base

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path={`${BASEPATH}/*`} element={<AuthRoutes />} />
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
