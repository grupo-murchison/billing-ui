import { Routes, Route, Navigate } from 'react-router-dom';

import { FacturacionProvider, FacturacionReporteProvider, ClienteEventosProvider } from '@domains/facturacion/contexts';
import { Facturacion } from '@domains/facturacion/container/facturacion';
import { FacturacionReporte } from '@domains/facturacion/container/facturacion-reporte';
import { FacturacionReversion } from '@domains/facturacion/container/facturacion-reversion';
import { EventoClientes } from '../container/cliente-eventos';
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
      <Route path='/facturacion/:facturaId/edit' element={<FacturacionReversion />} />
      <Route
        path='/facturacion/reporte'
        element={
          <FacturacionReporteProvider>
            <FacturacionReporte />
          </FacturacionReporteProvider>
        }
      />
      <Route
        path='/eventos-cliente'
        element={
          <ClienteEventosProvider>
            <EventoClientes />
          </ClienteEventosProvider>
        }
      />
      <Route path='/facturacion/masiva' element={<FacturacionMasiva />} />
      <Route path='/facturacion/log' element={<FacturacionLog />} />

      <Route path='/facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
