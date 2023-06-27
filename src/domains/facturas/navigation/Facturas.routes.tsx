import { Routes, Route, Navigate } from 'react-router-dom';

import { ContratoEdit } from '@domains/contrato/container/contrato-crud';

import { FacturasProvider } from '@domains/facturas/contexts';
import { FacturasDataGrid } from '../container/facturas-datagrid';

const FacturasRoutes = () => {
  return (
    <Routes>
      <Route
        path='/facturas'
        element={
          <FacturasProvider>
            <FacturasDataGrid />
          </FacturasProvider>
        }
      ></Route>
      <Route path='/facturas/:contratoId/edit' element={<ContratoEdit />} />
      <Route path='/facturas/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default FacturasRoutes;
