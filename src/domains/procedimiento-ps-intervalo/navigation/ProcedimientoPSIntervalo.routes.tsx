import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSDataGrid } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-datagrid';
import { ProcedimientoPSIntervaloCreate } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create';
import { ProcedimientoPSIntervaloEdit } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit';

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
        <Route path='/procedimiento-ps-intervalo/create' element={<ProcedimientoPSIntervaloCreate />} />
        <Route
          path='/procedimiento-ps-intervalo/:procedimientoPSIntervaloId/edit'
          element={<ProcedimientoPSIntervaloEdit />}
        />
      </Route>
      <Route path='/procedimiento-ps-intervalo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
