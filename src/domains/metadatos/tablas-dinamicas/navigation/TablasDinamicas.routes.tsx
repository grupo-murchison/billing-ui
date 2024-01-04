import { Routes, Route, Navigate } from 'react-router-dom';
import { TablasDinamicasProvider } from '../contexts';
import { TablasDinamicasDataGrid } from '../container/tablas-dinamicas-datagrid';
import { TablasDinamicasCreate } from '../container/tablas-dinamicas-create';
import { TablasDinamicasEdit } from '../container/tablas-dinamicas-edit';
import { TablasDinamicasView } from '../container/tablas-dinamicas-view';

const TablasDinamicasRoutes = () => {
  return (
    <Routes>
      <Route
        path='/tablas-dinamicas'
        element={
          <TablasDinamicasProvider>
            <TablasDinamicasDataGrid />
          </TablasDinamicasProvider>
        }
      >
        <Route path='/tablas-dinamicas/create' element={<TablasDinamicasCreate />} />
        <Route path='/tablas-dinamicas/:tablaId/edit/*' element={<TablasDinamicasEdit />} />
        <Route path='/tablas-dinamicas/:tablaId/*' element={<TablasDinamicasView />} />
      </Route>
      <Route path='/tablas-dinamicas/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default TablasDinamicasRoutes;
