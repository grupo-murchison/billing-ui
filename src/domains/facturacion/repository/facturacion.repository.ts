import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { RepositoryUtils } from '@app/utils';

import { FacturacionService } from './facturacion.service';
import { getAllFacturasPaginatedSchema } from './facturacion.schemas';

class FacturacionRepository {
  static getAllFacturasPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(FacturacionService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllFacturasPaginatedV2 = async (params: DataGridRepositoryFuncParams) => {
    const response = await RepositoryUtils.fromRxjs(
      FacturacionService.getAllPaginated(params),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasPaginatedSchema),
    );
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
}

export default FacturacionRepository;
