import { useEffect } from 'react';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';

const ProductoSoftlandGrid = () => {
  useEffect(() => {
    ProductoSoftlandRepository.getAllProductoSoftlandPaginated().then(data => {
      console.log(data);
    });
  }, []);

  return <>Hola</>;
};

export default ProductoSoftlandGrid;
