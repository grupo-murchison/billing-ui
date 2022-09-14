import { from, map, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@utils';

import { ProductoSoftlandService } from './productoSoftland.service';

class ProductoSoftlandRepository {
  static createProductoSoftland = async (credit: AnyValue) => {
    const response$ = from(ProductoSoftlandService.post(credit)).pipe(map(RepositoryUtils.getResponse));
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProductoSoftlandRepository;
