import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoQVariableDataGrid } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-datagrid';
import { ProcedimientoQVariableCreate } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-create';
import { ProcedimientoQVariableEdit } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-edit';

import { ProcedimientoQVariableProvider } from '@domains/procedimiento-q-variable/contexts';

export const ProcedimientoQVariableWithinProcedimientoQRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProcedimientoQVariableProvider>
            <ProcedimientoQVariableDataGrid />
          </ProcedimientoQVariableProvider>
        }
      >
        <Route path='/procedimiento-q-variable/create' element={<ProcedimientoQVariableCreate />} />
        <Route
          path='/procedimiento-q-variable/:procedimientoQVariableId/edit'
          element={<ProcedimientoQVariableEdit />}
        />
      </Route>
      <Route path='/procedimiento-q-variable/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
