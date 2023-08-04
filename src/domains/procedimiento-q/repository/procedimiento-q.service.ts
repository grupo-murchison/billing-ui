import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class ProcedimientoQService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/procedimiento-q/all/pagination', { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>('v1/procedimiento-q/all/dropdown'),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`v1/procedimiento-q/${id}`));

    return [response, error];
  };

  static post = async (procedimientoQ: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>('v1/procedimiento-q/crud', procedimientoQ),
    );

    return [response, error];
  };

  static patch = async (procedimientoQ: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>('v1/procedimiento-q/crud', procedimientoQ),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`v1/procedimiento-q/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoQService };
