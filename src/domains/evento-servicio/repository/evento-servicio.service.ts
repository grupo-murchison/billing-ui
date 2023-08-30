import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoServicioService {
  private static BASE_PATH = 'v1/facturaciones';

  static getAllEventDetails = async (params: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/eventosByFilter`, {params}),
    );
    return [response, error];
  };

}

export { EventoServicioService };
