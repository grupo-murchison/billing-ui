import { Routes, Route, Navigate } from 'react-router-dom';

import { FacturacionEdit } from '@domains/facturacion/container/facturacion-crud';

import { FacturacionProvider } from '@domains/facturacion/contexts';
import { FacturacionDataGrid } from '../container/facturacion-datagrid';

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
      <Route path='/facturacion/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturacionRoutes;
