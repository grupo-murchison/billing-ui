import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoQCreate } from '@domains/procedimiento-q/container/procedimiento-q-create';
import { ProcedimientoQEdit } from '@domains/procedimiento-q/container/procedimiento-q-edit';
import { ProcedimientoQDataGrid } from '@domains/procedimiento-q/container/procedimiento-q-datagrid';

import { ProcedimientoQProvider } from '@domains/procedimiento-q/contexts';

const ProcedimientoQRoutes = () => {
  return (
    <Routes>
      <Route
        path='/procedimiento-q'
        element={
          <ProcedimientoQProvider>
            <ProcedimientoQDataGrid />
          </ProcedimientoQProvider>
        }
      >
        <Route path='/procedimiento-q/create' element={<ProcedimientoQCreate />} />
        <Route path='/procedimiento-q/:procedimientoQId/edit/*' element={<ProcedimientoQEdit />} />
      </Route>
      <Route path='/procedimiento-q/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProcedimientoQRoutes;
