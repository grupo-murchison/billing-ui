import { ApiProvider } from '@providers';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const ENDPOINT = 'api/v1/contratos';

class ContratoService {
  static getAllPaginated = async (params: DataGridRepositoryFuncParams): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${ENDPOINT}/all/pagination`, { params }),
    );

    return [response, error];
  };

  static getById = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${ENDPOINT}/${id}`));

    return [response, error];
  };

  static getByIdFull = async (id: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.get<AnyValue>(`${ENDPOINT}/${id}/full`));

    return [response, error];
  };

  static post = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.post<AnyValue>(`${ENDPOINT}/crud`, contrato));

    return [response, error];
  };

  static patch = async (contrato: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.patch<AnyValue>(`${ENDPOINT}/crud`, contrato),
    );

    return [response, error];
  };

  static deleteById = async (id: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(ApiProvider.delete<AnyValue>(`${ENDPOINT}/crud/${id}`));

    return [response, error];
  };

  static postVariablesPorContratoProcedimientoQ = async (contratoId: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.post<AnyValue>(`${ENDPOINT}/variablesPorContratoProcedimientoQ`, contratoId),
    );

    return [response, error];
  };
}

export { ContratoService };
