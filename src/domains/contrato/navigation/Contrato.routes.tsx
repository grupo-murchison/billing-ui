import { Routes, Route, Navigate } from 'react-router-dom';

import { ContratoCreate } from '@domains/contrato/container/contrato-create';
import { ContratoDataGrid } from '@domains/contrato/container/contrato-datagrid';

import { ContratoProvider } from '@domains/contrato/contexts';

const ContratoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/contrato'
        element={
          <ContratoProvider>
            <ContratoDataGrid />
          </ContratoProvider>
        }
      >
        <Route path='/contrato/create' element={<ContratoCreate />} />
      </Route>
      <Route path='/contrato/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ContratoRoutes;
