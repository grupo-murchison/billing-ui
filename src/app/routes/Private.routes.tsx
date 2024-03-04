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
import { CalculoRoutes } from '@domains/calculo/navigation';
import { EventoRoutes } from '@domains/evento/navigation';
import { TablaDinamicaRoutes } from '@domains/metadatos/tabla-dinamica/navigation';
import RootRoute from '@domains/root/Root.route';
import { EventoErrorRoutes } from '@domains/evento-error/navigation';


const PrivateRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />;
  }

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
        <CalculoRoutes />
        <EventoRoutes />
        <TablaDinamicaRoutes />
        <RootRoute />
        <EventoErrorRoutes />
      </MainLayout>
    </ComponentInjectorProvider>
  );
};

export default PrivateRoutes;
