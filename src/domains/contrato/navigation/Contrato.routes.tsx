import { Routes, Route, Navigate } from 'react-router-dom';

import { ContratoCreateV2 as ContratoCreate} from '@domains/contrato/container/contrato-create';
import { ContratoEdit } from '@domains/contrato/container/contrato-edit';
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
        <Route path='/contrato/:contratoId/edit' element={<ContratoEdit />} />
      </Route>
      <Route path='/contrato/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ContratoRoutes;
