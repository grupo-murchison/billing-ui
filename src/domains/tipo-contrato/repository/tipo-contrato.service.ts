import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class TipoContratoService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/tipos-contrato/all/dropdown'),
    );

    return [response, error];
  };

  static getAllAsDropdownAutocomplete = async (params?: Partial<Record<'filter', string>>): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/tipos-contrato/autocomplete?`, { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/tipos-contrato/crud/${id}`),
    );

    return [response, error];
  };
}

export { TipoContratoService };
