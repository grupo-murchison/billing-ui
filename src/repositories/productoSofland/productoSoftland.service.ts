import { injectable } from 'tsyringe';

import { ApiProvider } from '@providers';

import { AxiosUtils } from '@utils';
import type { HandlePromise } from '@utils/axios.util';

@injectable()
class ProductoSoftlandService {
  constructor(public apiProvider: ApiProvider) {}

  post = async (productoSoftland: AnyValue): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      this.apiProvider.post<AnyValue>('api/v1/productos-softland/crud', productoSoftland),
    );

    return [response, error];
  };
}

export { ProductoSoftlandService };
