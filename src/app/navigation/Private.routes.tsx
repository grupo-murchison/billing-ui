import { useContext } from 'react';

import { Navigate, Route } from 'react-router-dom';

import { AuthContext, ThemeProvider } from '@app/contexts';

import { MainLayout } from '@app/layouts';

import { ProductoSoftlandRoutes } from '@domains/producto-softland/navigation';
import { ProcedimientoPSRoutes } from '@domains/procedimiento-ps/navigation';
import { ProcedimientoPRoutes } from '@domains/procedimiento-p/navigation';
import { ProcedimientoQRoutes } from '@domains/procedimiento-q/navigation';
import { ModeloAcuerdoRoutes } from '@domains/modelo-acuerdo/navigation';
import { ConceptoAcuerdoRoutes } from '@domains/concepto-acuerdo/navigation';
import { ContratoRoutes } from '@domains/contrato/navigation';
import RootRoute from '@domains/root/Root.route';

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  return (
    <ThemeProvider>
      <MainLayout>
        <ProductoSoftlandRoutes />
        <ProcedimientoPSRoutes />
        <ProcedimientoPRoutes />
        <ProcedimientoQRoutes />
        <ModeloAcuerdoRoutes />
        <ConceptoAcuerdoRoutes />
        <ContratoRoutes />
        <RootRoute />
      </MainLayout>
    </ThemeProvider>
  );
};

export default PrivateRoutes;
