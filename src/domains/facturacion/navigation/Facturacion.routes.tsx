import { Routes, Route, Navigate } from 'react-router-dom';

import { ClienteEventosProvider } from '@domains/facturacion/contexts';
import { FacturacionLogProvider, FacturacionProvider, FacturacionReporteProvider } from '@domains/facturacion/contexts';
import { Facturacion } from '@domains/facturacion/container/facturacion';
import { FacturacionReporte } from '@domains/facturacion/container/facturacion-reporte';
import { FacturacionReversion } from '@domains/facturacion/container/facturacion-reversion';
import { EventoClientes } from '../../evento-cliente/container/index';
import { FacturacionMasiva } from '@domains/facturacion/container/facturacion-masiva';
import { FacturacionLog } from '../container/facturacion-log';
import { EventosServicios } from '@domains/evento-servicio/container';
import { EventosServiciosProvider } from '@domains/evento-servicio/contexts/eventos.servicios.context';

const FacturacionRoutes = () => {
  return (
    <Routes>
      <Route
        path='/calculo-facturacion'
        element={
          <FacturacionProvider>
            <Facturacion />
          </FacturacionProvider>
        }
      ></Route>
      <Route
        path='/calculo-facturacion/reversion'
        element={
          <FacturacionReporteProvider>
            <FacturacionReversion />
          </FacturacionReporteProvider>
        }
      />
      <Route
        path='/calculo-facturacion/reporte'
        element={
          <FacturacionReporteProvider>
            <FacturacionReporte />
          </FacturacionReporteProvider>
        }
      />
      <Route
        path='/calculo-facturacion/eventos-cliente'
        element={
          <ClienteEventosProvider>
            <EventoClientes />
          </ClienteEventosProvider>
        }
      />
      <Route
        path='/calculo-facturacion/eventos-servicios-cliente'
        element={
          <EventosServiciosProvider>
            <EventosServicios />
          </EventosServiciosProvider>
        }
      />
      <Route path='/calculo-facturacion/masiva' element={<FacturacionMasiva />} />
      <Route
        path='/calculo-facturacion/log'
        element={
          <FacturacionLogProvider>
            <FacturacionLog />
          </FacturacionLogProvider>
        }
      />

      <Route path='/calculo-facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
