import { Routes, Route, Navigate } from 'react-router-dom';

import { FacturacionProvider, FacturacionReporteProvider } from '@domains/facturacion/contexts';
import { Facturacion } from '@domains/facturacion/container/facturacion';
import { FacturacionReporte } from '@domains/facturacion/container/facturacion-reporte';
import { FacturacionReversion } from '@domains/facturacion/container/facturacion-reversion';
import { EventoClientes } from '../container/cliente-eventos';

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
          <FacturacionReporteProvider>
            <EventoClientes />
          </FacturacionReporteProvider>
        }
      />
      <Route path='/facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
