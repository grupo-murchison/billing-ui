import { from, lastValueFrom, map } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { CalculoService } from './calculo.service';
import { FormDataTypeCalculoFacturacionMasiva, getAllFacturasReportePaginatedSchema } from './calculo.schemas';
import { AxiosResponse } from 'axios';
import { fromRxjs } from '@app/utils/repository.util';
import { CalculoContratoEvento } from './schemas/types';
import { DataGridResponse } from '@app/components/DataGrid/contexts/types';

class CalculoRepository {
  static getAllCalculosPaginated = async (params: RepositoryFuncParamsPaginated) => {
    // const response$ = from(FacturacionService.getAllPaginated(params)).pipe(
    //   RepositoryUtils.PIPES.getResponse(),
    //   RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    // );
    // const response = await lastValueFrom(response$);
    // return response;

    return await RepositoryUtils.fromRxjs(
      CalculoService.getAllPaginated(params),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    );
  };

  static calculoFacturacionManual = async (contratoId: number, planFacturacionId: number, periodoNumber: number) => {
    const response$ = from(CalculoService.calculoFacturacionManual(contratoId, planFacturacionId, periodoNumber)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static calculoFacturacionMasiva = async (data: FormDataTypeCalculoFacturacionMasiva) => {
    const response$ = from(CalculoService.calculoFacturacionMasiva(data)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getEventos = async (facturacionContratoConceptoId: string) => {
    const response$ = from(CalculoService.getEventos(facturacionContratoConceptoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getDetallePeriodo = async (facturacionContratoId: string) => {
    const response$ = from(CalculoService.getDetallePeriodo(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static revertirFacturacion = async (facturacionContratoId: string) => {
    const response$ = from(CalculoService.revertirFacturacion(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static anularFacturacion = async (facturacionContratoId: string) => {
    const response$ = from(CalculoService.anularFacturacion(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllEventDetails = async (params: AnyValue) => {
    return await fromRxjs(CalculoService.getAllEventDetails(params), extractEventsOfData);
  };

  static getCalculoLog = async (params: AnyValue) => {
    const response$ = from(CalculoService.getCalculoLog(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllCalculoLogSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static downloadProforma = async (calculoContratoId: number, contratoId: number) => {
    return await RepositoryUtils.fromRxjs(CalculoService.downloadProforma(calculoContratoId, contratoId));
  };
}

export default CalculoRepository;

const extractEventsOfData = map((response: AxiosResponse<DataGridResponse<CalculoContratoEvento>>) => {
  const responseParsed = response.data.data
    .map(eventosConDetalles => {
      return eventosConDetalles.eventos[0].map(event => {
        event._id = event.id;
        event.id = eventosConDetalles.id + '-' + event.id;
        return event;
      });
    })
    .reduce((acc: AnyValue[], curr: AnyValue[]) => acc.concat(curr), []);

  response.data.data = responseParsed;
  response.data.meta = { itemCount: responseParsed.length };

  return response;
});
