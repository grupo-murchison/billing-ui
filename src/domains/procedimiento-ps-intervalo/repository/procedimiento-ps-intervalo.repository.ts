import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoPSIntervaloService } from '@domains/procedimiento-ps-intervalo/repository/procedimiento-ps-intervalo.service';
import { getAllProcedimientoPSIntervaloPaginatedSchema } from '@domains/procedimiento-ps-intervalo/repository/procedimiento-ps-intervalo.schemas';

class ProcedimientoPSIntervaloRepository {
  static getAllProcedimientoPSIntervaloPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ProcedimientoPSIntervaloService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPSIntervaloPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoPSIntervaloById = async (id: string) => {
    const response$ = from(ProcedimientoPSIntervaloService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoPSIntervalo = async (procedimientoPSIntervalo: AnyValue) => {
    const response$ = from(ProcedimientoPSIntervaloService.post(procedimientoPSIntervalo)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoPSIntervalo = async (procedimientoPSIntervalo: AnyValue) => {
    const response$ = from(ProcedimientoPSIntervaloService.patch(procedimientoPSIntervalo)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoPSIntervaloById = async (id: number) => {
    const response$ = from(ProcedimientoPSIntervaloService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoPSIntervaloRepository;
