import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const BASE_PATH = 'v1/sociedades';

class SociedadService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/all/dropdown`));

    return [response, error];
  };

  static getAllAsDropdownAutocomplete = async (params?: Partial<Record<'filter', string>>): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/autocomplete?`, { params }),
    );

    return [response, error];
  };
}

export { SociedadService };
