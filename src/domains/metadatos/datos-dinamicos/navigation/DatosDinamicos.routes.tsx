import { Routes, Route, Navigate } from 'react-router-dom';
import { DatosDinamicosProvider } from '../contexts';
import { DatosDinamicosCreate } from '../container/datos-dinamicos-create';
import { DatosDinamicosDataGrid } from '@domains/metadatos/datos-dinamicos/container/datos-dinamicos-datagrid';
import { DatosDinamicosEdit } from '@domains/metadatos/datos-dinamicos/container/datos-dinamicos-edit';
import { DatosDinamicosView } from '../container/datos-dinamicos-view';

const DatosDinamicosRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <DatosDinamicosProvider>
            <DatosDinamicosDataGrid />
          </DatosDinamicosProvider>
        }
      >
        <Route path='/datos-dinamicos/create' element={<DatosDinamicosCreate />} />
        <Route path='/datos-dinamicos/:datoId/edit' element={<DatosDinamicosEdit />} />
        <Route path='/datos-dinamicos/:datoId' element={<DatosDinamicosView />} />
      </Route>
      <Route path='/datos-dinamicos/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default DatosDinamicosRoutes;
