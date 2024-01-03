import { Routes, Route, Navigate } from 'react-router-dom';

import { EventoProvider } from '@domains/evento/contexts';
import { EventoDataGrid } from '@domains/evento/container/evento-datagrid';
import { EventoCreate } from '@domains/evento/container/evento-create';
import { EventoEdit } from '../container/evento-edit';
import { EventoView } from '../container/evento-view';

const EventoRoutes = () => {
  return (
    <Routes>
      <Route
        path='/evento'
        element={
          <EventoProvider>
            <EventoDataGrid />
          </EventoProvider>
        }
      >
        <Route path='/evento/create' element={<EventoCreate />} />
        <Route path='/evento/:eventoId/edit/*' element={<EventoEdit />} />
        <Route path='/evento/:eventoId/*' element={<EventoView />} />
      </Route>
      <Route path='/evento/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default EventoRoutes;
