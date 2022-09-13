import { container, injectable } from 'tsyringe';

import { from, map, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@utils';

import { ProductoSoftlandService } from './productoSoftland.service';

@injectable()
class ProductoSoftlandRepository {
  constructor(public productoSoftlandService: ProductoSoftlandService) {}

  createProductoSoftland = async (credit: AnyValue) => {
    const response$ = from(this.productoSoftlandService.post(credit)).pipe(map(RepositoryUtils.getResponse));
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default container.resolve(ProductoSoftlandRepository);
