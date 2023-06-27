import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext, ThemeProvider } from '@app/contexts';

import { MainLayout } from '@app/layouts';

import { ProductoSoftlandRoutes } from '@domains/producto-softland/navigation';
import { ProcedimientoPSRoutes } from '@domains/procedimiento-ps/navigation';
import { ProcedimientoPRoutes } from '@domains/procedimiento-p/navigation';
import { ProcedimientoQRoutes } from '@domains/procedimiento-q/navigation';
import { ProcedimientoCustomRoutes } from '@domains/procedimiento-custom/navigation';
import { ModeloAcuerdoRoutes } from '@domains/modelo-acuerdo/navigation';
import { ConceptoAcuerdoRoutes } from '@domains/concepto-acuerdo/navigation';
import { ContratoRoutes } from '@domains/contrato/navigation';
import { FacturasRoutes } from '@domains/facturas/navigation';
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
        <ProcedimientoCustomRoutes />
        <ModeloAcuerdoRoutes />
        <ConceptoAcuerdoRoutes />
        <ContratoRoutes />
        <FacturasRoutes />
        <RootRoute />
      </MainLayout>
    </ThemeProvider>
  );
};

export default PrivateRoutes;
