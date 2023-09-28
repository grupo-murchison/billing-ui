import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { CalculoService } from './calculo.service';
import {
  FormDataTypeCalculoFacturacionMasiva,
  getAllCalculoFacturacionLogSchema,
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

  static getFacturacionLog = async (params: AnyValue) => {
    const response$ = from(CalculoService.getFacturacionLog(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllCalculoFacturacionLogSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static downloadProforma = async (facturacionContratoId: string) => {
    return await RepositoryUtils.fromRxjs(CalculoService.downloadProforma(facturacionContratoId));
  };
}

export default CalculoRepository;
