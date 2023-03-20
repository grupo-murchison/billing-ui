import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const ENDPOINT = 'api/v1/contrato-variables';

class ContratoVariablesService {
  static post = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.post<AnyValue>(`${ENDPOINT}/crud`, contrato));

    return [response, error];
  };

  static patch = async (contratoVariable: AnyValue, id: any): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${ENDPOINT}/crud/${id}`, contratoVariable),
    );

    return [response, error];
  };
}

export { ContratoVariablesService };
