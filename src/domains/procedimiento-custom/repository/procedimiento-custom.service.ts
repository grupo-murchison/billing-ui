import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class ProcedimientoCustomService {
  // TODO: Implement next BASE_PATH const in the rest of service databases.
  private static BASE_PATH = 'api/v1/procedimiento-custom';

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/dropdown`),
    );

    return [response, error];
  };

  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/pagination`, { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${this.BASE_PATH}/${id}`));

    return [response, error];
  };

  static post = async (procedimientoQCustom: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${this.BASE_PATH}/crud`, procedimientoQCustom),
    );

    return [response, error];
  };

  static patch = async (procedimientoQCustom: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${this.BASE_PATH}/crud`, procedimientoQCustom),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.delete<AnyValue>(`${this.BASE_PATH}/crud/${id}`));

    return [response, error];
  };
}

export { ProcedimientoCustomService };
