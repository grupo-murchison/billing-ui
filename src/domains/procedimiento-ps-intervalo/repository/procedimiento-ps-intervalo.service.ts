import { ApiProvider } from '@providers';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoPSIntervaloService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/procedimiento-ps-intervalo/all/pagination', { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/procedimiento-ps-intervalo/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoPSIntervalo: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('v1/procedimiento-ps-intervalo/crud', procedimientoPSIntervalo),
    );

    return [response, error];
  };

  static patch = async (procedimientoPSIntervalo: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('v1/procedimiento-ps-intervalo/crud', procedimientoPSIntervalo),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`v1/procedimiento-ps-intervalo/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoPSIntervaloService };
