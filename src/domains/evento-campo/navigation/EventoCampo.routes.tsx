import { Routes, Route, Navigate } from 'react-router-dom';

import { EventoCampoProvider } from '../contexts';
import { EventoCampoDataGrid } from '@domains/evento-campo/container/evento-campo-datagrid';
import { EventoCampoCreate } from '@domains/evento-campo/container/evento-campo-create';
import { EventoCampoEdit } from '@domains/evento-campo/container/evento-campo-edit';

export const EventoCampoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <EventoCampoProvider>
            <EventoCampoDataGrid />
          </EventoCampoProvider>
        }
      >
        <Route path='/evento-campo/create' element={<EventoCampoCreate />} />
        <Route path='/evento-campo/:eventoCampoId/edit' element={<EventoCampoEdit />} />
      </Route>
      <Route path='/evento-campo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
