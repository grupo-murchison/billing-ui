import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class EventoErrorService {
  private static BASE_PATH = 'v1/event';

  static readonly getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    console.log('🚀 ~ AlertaService ~ getAllPaginated= ~ params:', params);
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/pagination`, { params }),
    );

    console.log('🚀 ~ AlertaService ~ getAllPaginated= ~ response:', response);
    return [response, error];
  };
}

export { EventoErrorService };
