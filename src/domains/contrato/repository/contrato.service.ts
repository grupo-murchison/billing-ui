import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const BASE_PATH = 'v1/contratos';

class ContratoService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/all/pagination`, { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/${id}`));

    return [response, error];
  };

  static getByIdFull = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${BASE_PATH}/${id}/full`));

    return [response, error];
  };

  static post = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${BASE_PATH}/crud`, contrato),
    );

    return [response, error];
  };

  static patch = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${BASE_PATH}/crud`, contrato),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.delete<AnyValue>(`${BASE_PATH}/crud/${id}`));

    return [response, error];
  };

  static postVariablesPorContratoProcedimientoQ = async (contratoId: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${BASE_PATH}/variablesPorContratoProcedimientoQ`, contratoId),
    );

    return [response, error];
  };

  static getAllContratoFacturacionPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/filter`, { params }),
    );

    return [response, error];
  };
}

export { ContratoService };
