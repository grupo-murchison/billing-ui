import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPDataGrid } from '@domains/procedimiento-p/container/procedimiento-p-datagrid';
import { ProcedimientoPCreate } from '@domains/procedimiento-p/container/procedimiento-p-create';
import { ProcedimientoPEdit } from '@domains/procedimiento-p/container/procedimiento-p-edit';
import { ProcedimientoPProvider } from '@domains/procedimiento-p/contexts';

const ProcedimientoPRoutes = () => {
  return (
    <Routes>
      <Route
        path='/procedimiento-p'
        element={
          <ProcedimientoPProvider>
            <ProcedimientoPDataGrid />
          </ProcedimientoPProvider>
        }
      >
        <Route path='/procedimiento-p/create' element={<ProcedimientoPCreate />} />
        <Route path='/procedimiento-p/:procedimientoPId/edit/*' element={<ProcedimientoPEdit />} />
      </Route>
      <Route path='/procedimiento-p/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProcedimientoPRoutes;
