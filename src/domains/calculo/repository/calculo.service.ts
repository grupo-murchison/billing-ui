import { ApiProvider, ApiProviderBilligProcessor, ApiProviderBilligReport } from '@providers';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';
import { FormDataTypeCalculoFacturacionMasiva } from './calculo.schemas';

const BASE_PATH = 'v1/calculos';

class CalculoService {
  static getAllPaginated = async (params: RepositoryFuncParamsPaginated): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/filter`, { params }),
    );

    return [response, error];
  };

  /**
   * Campo id de la tabla calculo_contrato_concepto
   * @param calculoContratoConceptoId
   * @returns
   */
  static getEventos = async (calculoContratoConceptoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/eventosByCalculoContratoConceptoId/${calculoContratoConceptoId}`),
    );

    return [response, error];
  };

  /**
   * Campo calculoContratoId de la tabla calculo_contrato_concepto (FK => id de la tabla calculo_contrato )
   * @param calculoContratoId
   * @returns
   */
  static getDetallePeriodo = async (calculoContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/conceptoByCalculoContrato/${calculoContratoId}`),
    );

    return [response, error];
  };

  static revertirFacturacion = async (calculoContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/reversar/${calculoContratoId}`),
    );

    return [response, error];
  };

  static anularFacturacion = async (calculoContratoId: string): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/anular/${calculoContratoId}`),
    );

    return [response, error];
  };

  static getAllEventDetails = async (params: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${BASE_PATH}/eventosByFilter`, { params }),
    );
    return [response, error];
  };

  static calculoFacturacionManual = async (contratoId: number): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligProcessor.post<AnyValue>(`v1/main/calculo/manual`, { contratoId: contratoId }),
    );

    return [response, error];
  };

  static calculoFacturacionMasiva = async (data: FormDataTypeCalculoFacturacionMasiva): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligProcessor.post<AnyValue>(`v1/main/calculo/automatico`, data),
    );
    return [response, error];
  };

  static getCalculoLog = async (params: AnyValue): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`v1/proceso-log/filter`, { params }),
    );
    return [response, error];
  };

  static downloadProforma = async (calculoContratoId: number, contratoId: number): Promise<HandlePromise> => {
    const body = { tipoFormato: 'PDF', calculoContratoId: calculoContratoId, contratoId: contratoId };

    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligReport.post('proforma', body, {
        responseType: 'blob',
      }),
    );

    return [response, error];
  };
}

export { CalculoService };
