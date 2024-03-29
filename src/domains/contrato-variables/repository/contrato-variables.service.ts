import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const BASE_PATH = 'v1/contrato-variables';

class ContratoVariablesService {
  static post = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${BASE_PATH}/crud`, contrato),
    );

    return [response, error];
  };

  static patch = async (contratoVariable: AnyValue, id: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${BASE_PATH}/crud/${id}`, contratoVariable),
    );

    return [response, error];
  };

  static actualizarContratoVariables = async (contratoVariables: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${BASE_PATH}/many`, contratoVariables),
    );

    return [response, error];
  };
}

export { ContratoVariablesService };
