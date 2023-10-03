import { Routes, Route, Navigate } from 'react-router-dom';

import { ClienteEventosProvider } from '@domains/calculo/contexts';
import { CalculoLogProvider as CalculoLogProvider, CalculoProvider, CalculoReporteProvider } from '@domains/calculo/contexts';
import { Calculo } from '@domains/calculo/container/calculo';
import { CalculoReporte } from '@domains/calculo/container/calculo-reporte';
import { CalculoReversion } from '@domains/calculo/container/calculo-reversion';
import { EventoClientes } from '../../evento-cliente/container/index';
import { CalculoMasiva } from '@domains/calculo/container/calculo-masiva';
import { CalculoLog } from '../container/calculo-log';
import { EventosServicios } from '@domains/calculo/container/eventos-servicio/container';
import { EventosServiciosProvider } from '@domains/calculo/container/eventos-servicio/contexts/eventos.servicios.context';

const CalculoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/calculo-facturacion'
        element={
          <CalculoProvider>
            <Calculo />
          </CalculoProvider>
        }
      ></Route>
      <Route
        path='/calculo-facturacion/reversion'
        element={
          <CalculoReporteProvider>
            <CalculoReversion />
          </CalculoReporteProvider>
        }
      />
      <Route
        path='/calculo-facturacion/reporte'
        element={
          <CalculoReporteProvider>
            <CalculoReporte />
          </CalculoReporteProvider>
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
      <Route path='/calculo-facturacion/masiva' element={<CalculoMasiva />} />
      <Route
        path='/calculo-facturacion/log'
        element={
          <CalculoLogProvider>
            <CalculoLog />
          </CalculoLogProvider>
        }
      />

      <Route path='/calculo-facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default CalculoRoutes;
