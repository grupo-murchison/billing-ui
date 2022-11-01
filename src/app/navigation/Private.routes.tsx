import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext, ThemeProvider } from '@app/contexts';

import { Navbar, PageContainer, Sidebar } from '@app/container/app-main/components';

import { ProductoSoftlandRoutes } from '@domains/producto-softland/navigation';
import { ProcedimientoPSRoutes } from '@domains/procedimiento-ps/navigation';
import { ProcedimientoPRoutes } from '@domains/procedimiento-p/navigation';
import { ProcedimientoQRoutes } from '@domains/procedimiento-q/navigation';
import { ModeloAcuerdoRoutes } from '@domains/modelo-acuerdo/navigation';
import { ConceptoAcuerdoRoutes } from '@domains/concepto-acuerdo/navigation';

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
        <ProcedimientoPRoutes />
        <ProcedimientoQRoutes />
        <ModeloAcuerdoRoutes />
        <ConceptoAcuerdoRoutes />
      </PageContainer>
    </ThemeProvider>
  );
};

export default PrivateRoutes;
