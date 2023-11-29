import { Routes, Route, Navigate } from 'react-router-dom';


import { EventoCampoProvider } from '../contexts';
import { EventoCampoDataGrid } from '@domains/evento-campo/container/evento-campo-datagrid';
import { EventoCampoCreate } from '@domains/evento-campo/container/evento-campo-create';
import { EventoCampoEdit } from '@domains/evento-campo/container/evento-campo-edit';

export const EventoCampoRoutes = (eventoId?: AnyValue) => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <EventoCampoProvider>
            <EventoCampoDataGrid eventoId={eventoId}/>
          </EventoCampoProvider>
        }
      >
      </Route>
        <Route path='/evento-campo/create' element={<EventoCampoCreate />} />
        <Route path='/evento-campo/:eventoCampoId/edit' element={<EventoCampoEdit />} />
      <Route path='/evento-campo/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
