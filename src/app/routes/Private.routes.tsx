import { useContext, useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

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
import { EventoCargaRoutes } from '@domains/evento-carga/navigation/';
import { isTokenExpired } from '@app/utils/jwt.util';

const PrivateRoutes = () => {
  const { isAuthenticated, token, logout } = useContext(AuthContext);

  //* me fijo cada vez que cambia de ruta si el token sigue siendo valido
  const location = useLocation();
  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      logout();
    }
  }, [location, token, logout]);

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
        <EventoCargaRoutes />
      </MainLayout>
    </ComponentInjectorProvider>
  );
};

export default PrivateRoutes;
