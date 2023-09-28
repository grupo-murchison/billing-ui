import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { FacturacionService } from './facturacion.service';
import { FormDataTypeCalculoFacturacionMasiva, getAllFacturasReportePaginatedSchema } from './facturacion.schemas';

class FacturacionRepository {
  static getAllCalculosPaginated = async (params: RepositoryFuncParamsPaginated) => {
    // const response$ = from(FacturacionService.getAllPaginated(params)).pipe(
    //   RepositoryUtils.PIPES.getResponse(),
    //   RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    // );
    // const response = await lastValueFrom(response$);
    // return response;

    return await RepositoryUtils.fromRxjs(
      FacturacionService.getAllPaginated(params),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    );
  };

  static calculoFacturacionManual = async (contratoId: number) => {
    const response$ = from(FacturacionService.calculoFacturacionManual(contratoId)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static calculoFacturacionMasiva = async (data: FormDataTypeCalculoFacturacionMasiva) => {
    const response$ = from(FacturacionService.calculoFacturacionMasiva(data)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getEventos = async (facturacionContratoConceptoId: string) => {
    const response$ = from(FacturacionService.getEventos(facturacionContratoConceptoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getDetallePeriodo = async (facturacionContratoId: string) => {
    const response$ = from(FacturacionService.getDetallePeriodo(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static revertirFacturacion = async (facturacionContratoId: string) => {
    const response$ = from(FacturacionService.revertirFacturacion(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static anularFacturacion = async (facturacionContratoId: string) => {
    const response$ = from(FacturacionService.anularFacturacion(facturacionContratoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getFacturacionLog = async (params: AnyValue) => {
    const response$ = from(FacturacionService.getFacturacionLog(params)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static downloadProforma = async (facturacionContratoId: string) => {
    return await RepositoryUtils.fromRxjs(FacturacionService.downloadProforma(facturacionContratoId));
  };
}

export default FacturacionRepository;
