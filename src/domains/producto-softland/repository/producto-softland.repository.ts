import { from, map, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProductoSoftlandService } from '@domains/producto-softland/repository/producto-softland.service';

class ProductoSoftlandRepository {
  static getAllProductoSoftlandPaginated = async () => {
    const response$ = from(ProductoSoftlandService.getAllPaginated()).pipe(map(RepositoryUtils.getResponse));
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProductoSoftland = async (credit: AnyValue) => {
    const response$ = from(ProductoSoftlandService.post(credit)).pipe(map(RepositoryUtils.getResponse));
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProductoSoftlandRepository;
