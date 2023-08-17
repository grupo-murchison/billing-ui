import { Routes, Route, Navigate } from 'react-router-dom';

import { FacturacionLogProvider, FacturacionProvider, FacturacionReporteProvider } from '@domains/facturacion/contexts';
import { Facturacion } from '@domains/facturacion/container/facturacion';
import { FacturacionReporte } from '@domains/facturacion/container/facturacion-reporte';
import { FacturacionReversion } from '@domains/facturacion/container/facturacion-reversion';
import { FacturacionMasiva } from '@domains/facturacion/container/facturacion-masiva';
import { FacturacionLog } from '../container/facturacion-log';

const FacturacionRoutes = () => {
  return (
    <Routes>
      <Route
        path='/facturacion'
        element={
          <FacturacionProvider>
            <Facturacion />
          </FacturacionProvider>
        }
      ></Route>
      <Route path='/facturacion/reversion' element={<FacturacionReversion />} />
      <Route
        path='/facturacion/reporte'
        element={
          <FacturacionReporteProvider>
            <FacturacionReporte />
          </FacturacionReporteProvider>
        }
      />
      <Route path='/facturacion/masiva' element={<FacturacionMasiva />} />
      <Route
        path='/facturacion/log'
        element={
          <FacturacionLogProvider>
            <FacturacionLog />
          </FacturacionLogProvider>
        }
      />

      <Route path='/facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
