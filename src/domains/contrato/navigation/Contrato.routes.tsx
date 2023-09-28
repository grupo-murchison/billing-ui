import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from '@app/routes';

import { ContratoCreate, ContratoEdit } from '@domains/contrato/container/contrato-crud';
import { ContratoDataGrid } from '@domains/contrato/container/contrato-datagrid';

import { ContratoProvider } from '@domains/contrato/contexts';

const basePath = ROUTES.contrato;

const ContratoRoutes = () => {
  return (
    <Routes>
      <Route
        path={basePath}
        element={
          <ContratoProvider>
            <ContratoDataGrid />
          </ContratoProvider>
        }
      ></Route>
      <Route path={`${basePath}/:contratoId/edit`} element={<ContratoEdit />} />
      <Route path={`${basePath}/create`} element={<ContratoCreate />} />
      <Route path={`${basePath}/*`} element={<Navigate to={basePath} replace />} />
    </Routes>
  );
};

export default ContratoRoutes;
