import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PrivateRoutes from '@navigation/PrivateRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
