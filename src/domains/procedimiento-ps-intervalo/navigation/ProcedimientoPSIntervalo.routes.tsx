import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSIntervaloDataGrid } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-datagrid';
import { ProcedimientoPSIntervaloCreate } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create';
import { ProcedimientoPSIntervaloEdit } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit';

import { ProcedimientoPSIntervaloProvider } from '@domains/procedimiento-ps-intervalo/contexts';

export const ProcedimientoPSIntervaloWithinProcedimientoPSRoutes = (codigo: any) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProcedimientoPSIntervaloProvider>
            <ProcedimientoPSIntervaloDataGrid codigo={codigo} />
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
