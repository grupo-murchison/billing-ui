import { Routes, Route, Navigate } from 'react-router-dom';

import { ProductoSoftlandCreate } from '@domains/producto-softland/container/producto-softland-create';
import { ProductoSoftlandEdit } from '@domains/producto-softland/container/producto-softland-edit';
import { ProductoSoftlandDataGrid } from '@domains/producto-softland/container/producto-softland-datagrid';

const ProductoSoftlandRoutes = () => {
  return (
    <Routes>
      <Route path='/producto-softland/:id/edit' element={<ProductoSoftlandEdit />} />
      <Route path='/producto-softland/create' element={<ProductoSoftlandCreate />} />
      <Route path='/producto-softland' element={<ProductoSoftlandDataGrid />} />
      <Route path='/producto-softland/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProductoSoftlandRoutes;
