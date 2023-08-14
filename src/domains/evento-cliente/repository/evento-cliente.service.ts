import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoClienteService {
  private static BASE_PATH = 'v1/evento-detalle';
  // " /billing-services/api/v1/evento-detalle/filter?clienteId=1&eve[…]Id[]=12&fechaDesde=20230101&fechaHasta=20231231&page=1&take=5 "

  static getAllEventDetails = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/filter?clienteId=1&fechaDesde=20230101&fechaHasta=20231231&page=1&take=50`),
      );
      console.log("🚀 ~ file: evento-cliente.service.ts:12 ~ EventoClienteService ~ getAllEventDetails= ~ error:", error)
    console.log("🚀 ~ file: evento-cliente.service.ts:14 ~ EventoClienteService ~ getAllEventDetails= ~ response:", response)

    return [response, error];
  };
}

export { EventoClienteService };
