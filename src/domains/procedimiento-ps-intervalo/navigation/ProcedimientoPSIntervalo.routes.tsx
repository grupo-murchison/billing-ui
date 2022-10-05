import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSDataGrid } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-datagrid';
// import { ProcedimientoPSCreate } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create';
// import { ProcedimientoPSEdit } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit';
import { ProcedimientoPSIntervaloProvider } from '@domains/procedimiento-ps-intervalo/contexts';

export const ProcedimientoPSIntervaloWithinProcedimientoPSRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProcedimientoPSIntervaloProvider>
            <ProcedimientoPSDataGrid />
          </ProcedimientoPSIntervaloProvider>
        }
      >
        {/* <Route path='/procedimiento-ps/create' element={<ProcedimientoPSCreate />} />
        <Route path='/procedimiento-ps/:id/edit' element={<ProcedimientoPSEdit />} /> */}
      </Route>
      <Route path='/intervalos/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
