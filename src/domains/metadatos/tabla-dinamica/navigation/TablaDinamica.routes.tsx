import { Routes, Route, Navigate } from 'react-router-dom';
import { TablaDinamicaProvider } from '../contexts';
import { TablaDinamicaDataGrid } from '../container/tabla-dinamica-datagrid';
import { TablaDinamicaCreate } from '../container/tabla-dinamica-create';
import { TablaDinamicaEdit } from '../container/tabla-dinamica-edit';
import { TablaDinamicaView } from '../container/tabla-dinamica-view';

const TablaDinamicaRoutes = () => {
  return (
    <Routes>
      <Route
        path='/tabla-dinamica'
        element={
          <TablaDinamicaProvider>
            <TablaDinamicaDataGrid />
          </TablaDinamicaProvider>
        }
      >
        <Route path='/tabla-dinamica/create' element={<TablaDinamicaCreate />} />
        <Route path='/tabla-dinamica/:tablaDinamicaId/edit/*' element={<TablaDinamicaEdit />} />
        <Route path='/tabla-dinamica/:tablaDinamicaId/*' element={<TablaDinamicaView />} />
      </Route>
      <Route path='/tabla-dinamica/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default TablaDinamicaRoutes;
