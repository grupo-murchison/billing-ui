import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class MonedaService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>('api/v1/monedas/all/dropdown'));

    return [response, error];
  };
}

export { MonedaService };
