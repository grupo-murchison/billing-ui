import { Routes, Route, Navigate } from 'react-router-dom';

import { ConceptoAcuerdoDataGrid } from '@domains/concepto-acuerdo/container/concepto-acuerdo-datagrid';
import { ConceptoAcuerdoCreate } from '@domains/concepto-acuerdo/container/concepto-acuerdo-create';
import { ConceptoAcuerdoEdit } from '@domains/concepto-acuerdo/container/concepto-acuerdo-edit';

import { ConceptoAcuerdoProvider } from '@domains/concepto-acuerdo/contexts';

export const ConceptoAcuerdoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/concepto-acuerdo'
        element={
          <ConceptoAcuerdoProvider>
            <ConceptoAcuerdoDataGrid />
          </ConceptoAcuerdoProvider>
        }
      >
        <Route path='/concepto-acuerdo/create' element={<ConceptoAcuerdoCreate />} />
        <Route path='/concepto-acuerdo/:conceptoAcuerdoId/edit' element={<ConceptoAcuerdoEdit />} />
      </Route>
      <Route path='/concepto-acuerdo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
