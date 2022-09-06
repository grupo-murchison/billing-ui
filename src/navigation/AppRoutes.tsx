import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PageExample } from '@pages';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='example' element={<PageExample />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
