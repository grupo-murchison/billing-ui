import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class EventoErrorService {
  private static BASE_PATH = 'v1/evento-error';

  static readonly getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/pagination`, { params }),
    );

    return [response, error];
  };
  static readonly getEventoById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${this.BASE_PATH}/${id}`));

    return [response, error];
  };
}

export { EventoErrorService };
