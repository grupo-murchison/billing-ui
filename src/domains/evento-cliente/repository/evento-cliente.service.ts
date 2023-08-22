import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoClienteService {
  private static BASE_PATH_EVENTO_DETALLE = 'v1/evento-detalle';
  private static BASE_PATH_EVENTOS = 'v1/eventos';
  // " /billing-services/api/v1/evento-detalle/filter?clienteId=1&eve[…]Id[]=12&fechaDesde=20230101&fechaHasta=20231231&page=1&take=5 "
  // clienteId=1&fechaDesde=20230101&fechaHasta=20231231&page=1&take=50


  static getAllEventDetails = async (params: any): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTO_DETALLE}/filter`, {params}),
      );
    return [response, error];
  };


  // http://billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar/billing-services/api/v1/eventos/autocomplete?filter=a

  static getAllAsEventsAutocomplete = async (params?: Partial<Record<'filter', string>>): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTOS}/autocomplete?`, { params }),
    );

    return [response, error];
  };

  // http://billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar/billing-services/api/v1/eventos/all/dropdown
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTOS}/all/dropdown`));

    return [response, error];
  };




}

export { EventoClienteService };
