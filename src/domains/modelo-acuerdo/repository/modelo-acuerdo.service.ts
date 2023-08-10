import { ApiProvider } from '@providers';

// import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

const BASE_PATH = 'v1/modelos-acuerdo';

class ModeloAcuerdoService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/all/pagination`, { params }),
    );

    return [response, error];
  };

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/all/dropdown`));

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/${id}`));

    return [response, error];
  };

  static post = async (modeloAcuerdo: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${BASE_PATH}/crud`, modeloAcuerdo),
    );

    return [response, error];
  };

  static patch = async (modeloAcuerdo: AnyValue, id: any): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${BASE_PATH}/crud/${id}`, modeloAcuerdo),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.delete<AnyValue>(`${BASE_PATH}/crud/${id}`));

    return [response, error];
  };
}

export { ModeloAcuerdoService };
