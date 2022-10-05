import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoPService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-p/all/pagination', { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`api/v1/procedimiento-p/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoPS: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/procedimiento-p/crud', procedimientoPS),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`api/v1/procedimiento-p/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoPService };
