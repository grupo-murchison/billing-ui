import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSDataGrid } from '@domains/procedimiento-ps/container/procedimiento-ps-datagrid';
import { ProcedimientoPSCreate } from '@domains/procedimiento-ps/container/procedimiento-ps-create';
import { ProcedimientoPSEdit } from '@domains/procedimiento-ps/container/procedimiento-ps-edit';
import { ProcedimientoPSProvider } from '@domains/procedimiento-ps/contexts';

const ProcedimientoPSRoutes = () => {
  return (
    <Routes>
      <Route
        path='/procedimiento-ps'
        element={
          <ProcedimientoPSProvider>
            <ProcedimientoPSDataGrid />
          </ProcedimientoPSProvider>
        }
      >
        <Route path='/procedimiento-ps/create' element={<ProcedimientoPSCreate />} />
        <Route path='/procedimiento-ps/:procedimientoPSId/edit' element={<ProcedimientoPSEdit />} />
      </Route>
      <Route path='/procedimiento-ps/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProcedimientoPSRoutes;
