import { ApiProvider, ApiProviderBilligProcessor } from '@providers';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { FacturacionMasivaSchema } from './facturacion.schemas';

const BASE_PATH = 'v1/facturaciones';

class FacturacionService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/filter`, { params }),
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

  static facturacionManual = async (contratoId: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligProcessor.post<AnyValue>(`v1/main/facturacion/manual`, { contratoId: contratoId }),
    );

    return [response, error];
  };

  static facturacionMasiva = async (data: FacturacionMasivaSchema): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligProcessor.post<AnyValue>(`v1/main/facturacion/automatica`, data),
    );
    return [response, error];
  };
}

export { FacturacionService };
