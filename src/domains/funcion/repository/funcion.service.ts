import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class FuncionService {
  private static BASE_PATH = 'v1/funciones';

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/dropdown`),
    );

    return [response, error];
  };
}

export { FuncionService };
