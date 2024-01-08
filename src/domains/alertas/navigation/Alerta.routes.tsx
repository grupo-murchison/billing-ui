import { Routes, Route, Navigate } from 'react-router-dom';

import { AlertaProvider } from '@domains/alertas/contexts'
import { AlertaDataGrid } from '@domains/alertas/container/alerta-datagrid';

const AlertaRoutes = () => {
    return (
        <Routes>
            <Route
                path='/alerta'
                element={
                    <AlertaProvider>
                        <AlertaDataGrid />
                    </AlertaProvider>
                }
            >
            </Route>
            <Route path='/alerta/*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};

export default AlertaRoutes;
