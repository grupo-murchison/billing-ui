import { useContext } from 'react';

import { Navigate } from 'react-router-dom';

import { AuthContext, ComponentInjectorProvider } from '@app/contexts';

import MainLayout from 'layout';

import { ProductoSoftlandRoutes } from '@domains/producto-softland/navigation';
import { ProcedimientoPSRoutes } from '@domains/procedimiento-ps/navigation';
import { ProcedimientoPRoutes } from '@domains/procedimiento-p/navigation';
import { ProcedimientoQRoutes } from '@domains/procedimiento-q/navigation';
import { ProcedimientoCustomRoutes } from '@domains/procedimiento-custom/navigation';
import { ModeloAcuerdoRoutes } from '@domains/modelo-acuerdo/navigation';
import { ConceptoAcuerdoRoutes } from '@domains/concepto-acuerdo/navigation';
import { ContratoRoutes } from '@domains/contrato/navigation';
import { FacturacionRoutes } from '@domains/facturacion/navigation';
import RootRoute from '@domains/root/Root.route';

const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

  //TODO estaria bueno migrar a useRoutes de mantis

  return (
    <ComponentInjectorProvider>
      <MainLayout>
        <ProductoSoftlandRoutes />
        <ProcedimientoPSRoutes />
        <ProcedimientoPRoutes />
        <ProcedimientoQRoutes />
        <ProcedimientoCustomRoutes />
        <ModeloAcuerdoRoutes />
        <ConceptoAcuerdoRoutes />
        <ContratoRoutes />
        <FacturacionRoutes />
        <RootRoute />
      </MainLayout>
    </ComponentInjectorProvider>
  );
};

export default PrivateRoutes;
