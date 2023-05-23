import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoQVariableService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/procedimiento-q-variable/all/pagination', { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/procedimiento-q-variable/${id}`),
    );

    return [response, error];
  };

  static post = async (procedimientoQVariable: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('v1/procedimiento-q-variable/crud', procedimientoQVariable),
    );

    return [response, error];
  };

  static patch = async (procedimientoQVariable: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('v1/procedimiento-q-variable/crud', procedimientoQVariable),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`v1/procedimiento-q-variable/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoQVariableService };
