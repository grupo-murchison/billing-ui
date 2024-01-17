import { Routes, Route, Navigate } from 'react-router-dom';
import { DatoDinamicoProvider } from '../contexts';
import { DatoDinamicoCreate } from '../container/dato-dinamico-create';
import { DatoDinamicoDataGrid } from '@domains/metadatos/dato-dinamico/container/dato-dinamico-datagrid';
import { DatoDinamicoEdit } from '@domains/metadatos/dato-dinamico/container/dato-dinamico-edit';
import { DatoDinamicoView } from '../container/dato-dinamico-view';

const DatoDinamicoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <DatoDinamicoProvider>
            <DatoDinamicoDataGrid />
          </DatoDinamicoProvider>
        }
      >
        <Route path='/dato-dinamico/create' element={<DatoDinamicoCreate />} />
        <Route path='/dato-dinamico/:datoDinamicoId/edit' element={<DatoDinamicoEdit />} />
        <Route path='/dato-dinamico/:datoDinamicoId' element={<DatoDinamicoView />} />
      </Route>
      <Route path='/dato-dinamico/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default DatoDinamicoRoutes;
