import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoPSService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-ps/all/pagination', { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('api/v1/procedimiento-ps/all/dropdown'),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`api/v1/procedimiento-ps/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoPS: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('api/v1/procedimiento-ps/crud', procedimientoPS),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`api/v1/procedimiento-ps/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoPSService };
