import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProductoSoftlandService } from '@domains/producto-softland/repository/producto-softland.service';
import {
  getAllProductoSoftlandPaginatedSchema,
  getAllProductoSoftlandAsDropdownSchema,
} from '@domains/producto-softland/repository/producto-softland.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class ProductoSoftlandRepository {
  static getAllProductoSoftlandPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(ProductoSoftlandService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProductoSoftlandPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllProductoSoftlandAsDropdown = async () => {
    const response$ = from(ProductoSoftlandService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProductoSoftlandAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProductoSoftlandById = async (id: string) => {
    const response$ = from(ProductoSoftlandService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProductoSoftland = async (productoSoftland: AnyValue) => {
    const response$ = from(ProductoSoftlandService.post(productoSoftland)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProductoSoftland = async (productoSoftland: AnyValue) => {
    const response$ = from(ProductoSoftlandService.patch(productoSoftland)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProductoSoftlandById = async (id: number) => {
    const response$ = from(ProductoSoftlandService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProductoSoftlandRepository;
