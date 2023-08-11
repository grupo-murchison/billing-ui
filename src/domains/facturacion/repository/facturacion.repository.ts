import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { FacturacionService } from './facturacion.service';
import { FacturacionMasivaSchema, getAllFacturasReportePaginatedSchema } from './facturacion.schemas';

class FacturacionRepository {
  static getAllFacturasPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(FacturacionService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getFacturasById = async (id: string) => {
    const response$ = from(FacturacionService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getFacturasByIdAndContratoVariables = async (id: string) => {
    const response$ = from(FacturacionService.getByIdFull(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateFacturas = async (contrato: AnyValue) => {
    const response$ = from(FacturacionService.patch(contrato)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteFacturasById = async (id: number) => {
    const response$ = from(FacturacionService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static facturacionManual = async (contratoId: number) => {
    const response$ = from(FacturacionService.facturacionManual(contratoId)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static facturacionMasiva = async (data: FacturacionMasivaSchema) => {
    const response$ = from(FacturacionService.facturacionMasiva(data)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default FacturacionRepository;
