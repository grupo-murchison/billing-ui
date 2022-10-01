import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext, ThemeProvider } from '@app/contexts';

import { Navbar, PageContainer, Sidebar } from '@app/container/app-main/components';

import { ProductoSoftlandRoutes } from '@domains/producto-softland/navigation';
import { ProcedimientoPSRoutes } from '@domains/procedimiento-ps/navigation';

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <ThemeProvider>
      <Navbar />
      <Sidebar />
      <PageContainer>
        <ProductoSoftlandRoutes />
        <ProcedimientoPSRoutes />
      </PageContainer>
    </ThemeProvider>
  );
};

export default PrivateRoutes;
