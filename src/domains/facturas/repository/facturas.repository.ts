import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { RepositoryUtils } from '@app/utils';

import { FacturasService } from './facturas.service';
import { getAllFacturasPaginatedSchema } from './facturas.schemas';

class FacturasRepository {
  static getAllFacturasPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(FacturasService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllFacturasPaginatedV2 = async (params: DataGridRepositoryFuncParams) => {
    const response = await RepositoryUtils.fromRxjs(
      FacturasService.getAllPaginated(params),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasPaginatedSchema),
    );
    return response;
  };

  static getFacturasById = async (id: string) => {
    const response$ = from(FacturasService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getFacturasByIdAndContratoVariables = async (id: string) => {
    const response$ = from(FacturasService.getByIdFull(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateFacturas = async (contrato: AnyValue) => {
    const response$ = from(FacturasService.patch(contrato)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteFacturasById = async (id: number) => {
    const response$ = from(FacturasService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default FacturasRepository;
