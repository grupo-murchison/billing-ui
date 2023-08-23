import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoClienteService {
  private static BASE_PATH_EVENTO_DETALLE = 'v1/evento-detalle';
  private static BASE_PATH_EVENTOS = 'v1/eventos';

  static getAllEventDetails = async (params: any): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTO_DETALLE}/filter`, {params}),
      );
    return [response, error];
  };

  static getAllAsEventsAutocomplete = async (params?: Partial<Record<'filter', string>>): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTOS}/autocomplete?`, { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${this.BASE_PATH_EVENTOS}/all/dropdown`));

    return [response, error];
  };




}

export { EventoClienteService };
