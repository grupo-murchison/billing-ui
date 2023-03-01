import { Routes, Route, Navigate } from 'react-router-dom';

import { ContratoCreate, ContratoEdit } from '@domains/contrato/container/contrato-crud';
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
      ></Route>
      <Route path='/contrato/:contratoId/edit' element={<ContratoEdit />} />
      <Route path='/contrato/create' element={<ContratoCreate />} />
      <Route path='/contrato/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ContratoRoutes;
