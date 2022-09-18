import { ApiProvider } from '@providers';

import { AxiosUtils } from '@utils';
import type { HandlePromise } from '@utils/axios.util';

class ProductoSoftlandService {
  static post = async (productoSoftland: AnyValue): Promise<HandlePromise<AnyValue>> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/productos-softland/crud', productoSoftland),
    );

    return [response, error];
  };
}

export { ProductoSoftlandService };
