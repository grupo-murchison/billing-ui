import { ApiProvider, ApiProviderBilligProcessor } from '@providers';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

const BASE_PATH = 'v1/facturaciones';

class FacturacionService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/filter`, { params }),
    );

    return [response, error];
  };

  static facturacionManual = async (contratoId: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligProcessor.post<AnyValue>(`v1/main/facturacion/manual`, { contratoId: contratoId }),
    );

    return [response, error];
  };

  static getEventos = async (facturacionContratoConceptoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/eventosByFacturacionContratoConceptoId/${facturacionContratoConceptoId}`),
    );

    return [response, error];
  };

  static getDetallePeriodo = async (facturacionContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/conceptoByFacturacionContrato/${facturacionContratoId}`),
    );

    return [response, error];
  };
}

export { FacturacionService };
