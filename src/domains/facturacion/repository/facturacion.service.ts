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

  /**
   * Campo id de la tabla facturacion_contrato_concepto = FacturacionContratoConceptoEntity
   * @param facturacionContratoConceptoId
   * @returns
   */
  static getEventos = async (facturacionContratoConceptoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/eventosByFacturacionContratoConceptoId/${facturacionContratoConceptoId}`),
    );

    return [response, error];
  };

  /**
   * Campo facturacionContratoId de la tabla facturacion_contrato_concepto (FK => id de la tabla facturacion_contrato )
   * @param facturacionContratoId
   * @returns
   */
  static getDetallePeriodo = async (facturacionContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/conceptoByFacturacionContrato/${facturacionContratoId}`),
    );

    return [response, error];
  };

  static revertirFacturacion = async (facturacionContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/contrato/reversar/${facturacionContratoId}`),
    );

    return [response, error];
  };

  static anularFacturacion = async (facturacionContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/contrato/anular/${facturacionContratoId}`),
    );

    return [response, error];
  };
}

export { FacturacionService };
