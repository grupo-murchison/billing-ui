import { Routes, Route, Navigate } from 'react-router-dom';

import { ModeloAcuerdoDataGrid } from '@domains/modelo-acuerdo/container/modelo-acuerdo-datagrid';
import { ModeloAcuerdoCreate } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create';
import { ModeloAcuerdoEdit } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit';
import { ModeloAcuerdoProvider } from '@domains/modelo-acuerdo/contexts';

const ModeloAcuerdoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/modelo-acuerdo'
        element={
          <ModeloAcuerdoProvider>
            <ModeloAcuerdoDataGrid />
          </ModeloAcuerdoProvider>
        }
      >
        <Route path='/modelo-acuerdo/create' element={<ModeloAcuerdoCreate />} />
        <Route path='/modelo-acuerdo/:modeloAcuerdoId/edit' element={<ModeloAcuerdoEdit />} />
      </Route>
      <Route path='/modelo-acuerdo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ModeloAcuerdoRoutes;
