import { Routes, Route, Navigate } from 'react-router-dom';

import { ProcedimientoPSDataGrid } from '@domains/procedimiento-ps/container/procedimiento-ps-datagrid';

const ProcedimientoPSRoutes = () => {
  return (
    <Routes>
      <Route path='/procedimiento-ps' element={<ProcedimientoPSDataGrid />} />
      <Route path='/procedimiento-ps/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProcedimientoPSRoutes;
