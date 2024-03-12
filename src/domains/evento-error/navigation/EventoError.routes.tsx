import { Routes, Route, Navigate } from 'react-router-dom';

import { EventoErrorProvider } from '@domains/evento-error/contexts';
import { EventoErrorDataGrid } from '@domains/evento-error/container/evento-error-datagrid';
import EventoErrorView from '../container/evento-error-view/EventoErrorView';

const EventoErrorRoutes = () => {
    return (
        <Routes>
            <Route
                path='/evento-error'
                element={
                    <EventoErrorProvider>
                        <EventoErrorDataGrid />
                    </EventoErrorProvider>
                }
            >
            </Route>
            <Route path='/evento-error/*' element={<Navigate to='/' replace />} />
            <Route path='/evento-error/:eventoId/*' element={<EventoErrorView />} />
        </Routes>
    );
};

export default EventoErrorRoutes;
