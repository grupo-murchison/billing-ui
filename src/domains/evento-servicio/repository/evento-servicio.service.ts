import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoServicioService {
  private static BASE_PATH = 'v1/evento-detalle';
  // " /billing-services/api/v1/evento-detalle/filter?clienteId=1&eve[…]Id[]=12&fechaDesde=20230101&fechaHasta=20231231&page=1&take=5 "
  // clienteId=1&fechaDesde=20230101&fechaHasta=20231231&page=1&take=50


  static getAllEventDetails = async (params: AnyValue): Promise<HandlePromise> => {
    console.log('params',params)
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/filter`),
      );
    return [response, error];
  };

}

export { EventoServicioService };
