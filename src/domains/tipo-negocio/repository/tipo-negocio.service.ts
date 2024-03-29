import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const BASE_PATH = 'v1/tipos-negocio';
class TipoNegocioService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/all/dropdown`));

    return [response, error];
  };
}

export { TipoNegocioService };
