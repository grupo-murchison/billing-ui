import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { CalculoService } from './calculo.service';
import {
  FormDataTypeCalculoFacturacionMasiva,
  getAllFacturasReportePaginatedSchema,
} from './calculo.schemas';

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

  static calculoFacturacionManual = async (contratoId: number) => {
    const response$ = from(CalculoService.calculoFacturacionManual(contratoId)).pipe(
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
    if (!params.clienteId && !params.numeroSecuenciaCalculo && !params.fechaDesde && !params.fechaHasta) {
      return;
    }
    const response$ = from(CalculoService.getAllEventDetails(params)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return extractEventsOfData(response);
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

function extractEventsOfData(response: AnyValue) {
  let a: Array<AnyValue> = [];

  const responseParsed = response?.data.data
    .map((eventosConDetalles: AnyValue) => {
      eventosConDetalles.eventos[0].map((event: AnyValue) => {
        event._id = event.id;
        event.id = eventosConDetalles.id + '-' + event.id;
        return event;
      });
      return eventosConDetalles.eventos[0];
    })
    .map((evento: AnyValue) => {
      return evento;
    });

  for (let i = 0; i < responseParsed.length; i++) {
    const element = responseParsed[i];
    a = [...a, ...element];
  }

  response.data.data = a;
  response.data.meta = { itemCount: a.length };

  return response;
}
