import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class ProcedimientoCustomService {
  private static BASE_PATH = 'v1/procedimiento-custom';

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/dropdown`),
    );

    return [response, error];
  };

  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
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
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.delete<AnyValue>(`${this.BASE_PATH}/crud/${id}`),
    );

    return [response, error];
  };
}

export { ProcedimientoCustomService };
