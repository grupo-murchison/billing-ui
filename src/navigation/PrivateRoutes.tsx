import { useContext } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { PageContainer } from '@components';

import { AuthContext } from '@contexts';

import { Navbar, Sidebar } from '@features';

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
        </Routes>
      </PageContainer>
    </>
  );
};

export default PrivateRoutes;
