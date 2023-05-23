import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ReglaFechaPeriodoService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/reglas-fecha-periodo/all/dropdown'),
    );

    return [response, error];
  };
}

export { ReglaFechaPeriodoService };
