import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProductoSoftlandService {
  static getAllPaginated = async (): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/productos-softland/all/pagination'),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`api/v1/productos-softland/${id}`),
    );

    return [response, error];
  };

  static post = async (productoSoftland: AnyValue): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/productos-softland/crud', productoSoftland),
    );

    return [response, error];
  };

  static patch = async (productoSoftland: AnyValue): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('api/v1/productos-softland/crud', productoSoftland),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`api/v1/productos-softland/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProductoSoftlandService };
