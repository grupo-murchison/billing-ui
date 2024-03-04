import { Routes, Route, Navigate } from 'react-router-dom';

import { EventoErrorProvider } from '@domains/evento-error/contexts';
import { EventoErrorDataGrid } from '@domains/evento-error/container/evento-error-datagrid';

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
        </Routes>
    );
};

export default EventoErrorRoutes;
