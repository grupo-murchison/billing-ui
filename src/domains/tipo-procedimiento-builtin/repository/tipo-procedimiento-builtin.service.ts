import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class TipoProcedimientoBuiltinService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/tipos-procedimiento-builtin/all/dropdown'),
    );

    return [response, error];
  };
}

export { TipoProcedimientoBuiltinService };
