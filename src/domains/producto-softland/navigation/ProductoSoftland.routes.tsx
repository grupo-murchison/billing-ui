import { Routes, Route, Navigate } from 'react-router-dom';

import { ProductoSoftlandCreate } from '@domains/producto-softland/container/producto-softland-create';
import { ProductoSoftlandGrid } from '@domains/producto-softland/container/producto-softland-grid';

const ProductoSoftlandRoutes = () => {
  return (
    <Routes>
      <Route path='/producto-softland/create' element={<ProductoSoftlandCreate />} />
      <Route path='/producto-softland' element={<ProductoSoftlandGrid />} />
      <Route path='/producto-softland/*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default ProductoSoftlandRoutes;
