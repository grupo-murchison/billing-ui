import { Routes, Route, Navigate } from 'react-router-dom';

import { FacturacionEdit } from '@domains/facturacion/container/facturacion-crud';

import { FacturacionProvider } from '@domains/facturacion/contexts';
import { FacturacionDataGrid } from '@domains/facturacion/container/facturacion-datagrid';
import { FacturacionReporte } from '@domains/facturacion/container/facturacion-reporte';

const FacturacionRoutes = () => {
  return (
    <Routes>
      <Route
        path='/facturacion'
        element={
          <FacturacionProvider>
            <FacturacionDataGrid />
          </FacturacionProvider>
        }
      ></Route>
      <Route path='/facturacion/:facturaId/edit' element={<FacturacionEdit />} />
      <Route path='/facturacion/reporte' element={<FacturacionReporte />} />
      <Route path='/facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
