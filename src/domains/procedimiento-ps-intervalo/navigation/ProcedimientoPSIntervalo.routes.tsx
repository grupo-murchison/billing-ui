import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSIntervaloDataGrid } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-datagrid';
import { ProcedimientoPSIntervaloCreate } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create';
import { ProcedimientoPSIntervaloEdit } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit';

import { ProcedimientoPSIntervaloProvider } from '@domains/procedimiento-ps-intervalo/contexts';
import { ProcedimientoPSIntervaloView } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-view';

export const ProcedimientoPSIntervaloWithinProcedimientoPSRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProcedimientoPSIntervaloProvider>
            <ProcedimientoPSIntervaloDataGrid />
          </ProcedimientoPSIntervaloProvider>
        }
      >
        <Route path='/procedimiento-ps-intervalo/create' element={<ProcedimientoPSIntervaloCreate />} />
        <Route
          path='/procedimiento-ps-intervalo/:procedimientoPSIntervaloId/edit'
          element={<ProcedimientoPSIntervaloEdit />}
        />
        <Route
          path='/procedimiento-ps-intervalo/:procedimientoPSIntervaloId'
          element={<ProcedimientoPSIntervaloView />}
        />
      </Route>
      <Route path='/procedimiento-ps-intervalo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
