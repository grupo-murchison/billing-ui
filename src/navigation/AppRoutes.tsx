import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoutes from '@navigation/PrivateRoutes';
import AuthRoutes from '@navigation/AuthRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/*' element={<AuthRoutes />} />
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
