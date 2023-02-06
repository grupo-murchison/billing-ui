import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoQService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-q/all/pagination', { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-q/all/dropdown'),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`api/v1/procedimiento-q/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoQ: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/procedimiento-q/crud', procedimientoQ),
    );

    return [response, error];
  };

  static patch = async (procedimientoQ: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('api/v1/procedimiento-q/crud', procedimientoQ),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`api/v1/procedimiento-q/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoQService };
