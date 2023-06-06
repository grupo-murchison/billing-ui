import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPDataGrid } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-datagrid';
import { ProcedimientoPIntervaloCreate } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-create';
import { ProcedimientoPIntervaloEdit } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit';

import { ProcedimientoPIntervaloProvider } from '@domains/procedimiento-p-intervalo/contexts';

export const ProcedimientoPIntervaloWithinProcedimientoPRoutes = (codigo: any) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProcedimientoPIntervaloProvider>
            <ProcedimientoPDataGrid codigo={codigo} />
          </ProcedimientoPIntervaloProvider>
        }
      >
        <Route path='/procedimiento-p-intervalo/create' element={<ProcedimientoPIntervaloCreate />} />
        <Route
          path='/procedimiento-p-intervalo/:procedimientoPIntervaloId/edit'
          element={<ProcedimientoPIntervaloEdit />}
        />
      </Route>
      <Route path='/procedimiento-p-intervalo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
