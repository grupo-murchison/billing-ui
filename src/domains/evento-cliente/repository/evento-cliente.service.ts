import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoClienteService {
  private static BASE_PATH = 'v1/evento-detalle';
  // " /billing-services/api/v1/evento-detalle/filter?clienteId=1&eve[…]Id[]=12&fechaDesde=20230101&fechaHasta=20231231&page=1&take=5 "
  // clienteId=1&fechaDesde=20230101&fechaHasta=20231231&page=1&take=50


  static getAllEventDetails = async (params: any): Promise<HandlePromise> => {
    console.log('params',params)
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/filter`, {params}),
      );
    return [response, error];
  };


  // http://billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar/billing-services/api/v1/eventos/autocomplete?filter=a

  static getAllAsEventsAutocomplete = async (params?: Partial<Record<'filter', string>>): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/eventos/autocomplete?`, { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`v1/eventos/all/dropdown`));

    return [response, error];
  };


  // http://billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar/billing-services/api/v1/eventos/all/dropdown


}

export { EventoClienteService };
