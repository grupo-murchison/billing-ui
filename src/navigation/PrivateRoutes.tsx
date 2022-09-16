import { useContext } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { PageContainer } from '@components';

import { AuthContext } from '@contexts';

import { Navbar, ProductoSoftland, Sidebar } from '@features';

import { PageExample } from '@pages';

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <PageContainer>
        <Routes>
          <Route path='/' element={<PageExample />} />
          <Route path='/productosoftland' element={<ProductoSoftland />} />
        </Routes>
      </PageContainer>
    </>
  );
};

export default PrivateRoutes;
