import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoCustomCreate } from '@domains/procedimiento-custom/container/procedimiento-custom-create';
import { ProcedimientoCustomEdit } from '@domains/procedimiento-custom/container/procedimiento-custom-edit';
import { ProcedimientoCustomDataGrid } from '@domains/procedimiento-custom/container/procedimiento-custom-datagrid';

import { ProcedimientoCustomProvider } from '@domains/procedimiento-custom/contexts';

export const ProcedimientoCustomRoutes = () => {
  return (
    <ProcedimientoCustomProvider>
      <Routes>
        <Route path='/procedimiento-custom' element={<ProcedimientoCustomDataGrid />}>
          <Route path='/procedimiento-custom/create' element={<ProcedimientoCustomCreate />} />
          <Route path='/procedimiento-custom/:id/edit' element={<ProcedimientoCustomEdit />} />
        </Route>
        <Route path='/procedimiento-custom/*' element={<Navigate to='/' replace />} />
      </Routes>
    </ProcedimientoCustomProvider>
  );
};

export default ProcedimientoCustomRoutes;
