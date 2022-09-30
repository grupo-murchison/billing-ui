import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoPSIntervaloService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-ps-intervalo/all/pagination', { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`api/v1/procedimiento-ps-intervalo/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoPSIntervalo: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/procedimiento-ps-intervalo/crud', procedimientoPSIntervalo),
    );

    return [response, error];
  };

  static patch = async (procedimientoPSIntervalo: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('api/v1/procedimiento-ps-intervalo/crud', procedimientoPSIntervalo),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`api/v1/procedimiento-ps-intervalo/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoPSIntervaloService };
