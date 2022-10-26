import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class TipoProcedimientoQService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/tipos-procedimiento-q/all/dropdown'),
    );

    return [response, error];
  };
}

export { TipoProcedimientoQService };
