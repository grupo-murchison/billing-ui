import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const ENDPOINT = 'api/v1/sociedades';

class SociedadService {
  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${ENDPOINT}/all/dropdown`));

    return [response, error];
  };
}

export { SociedadService };
