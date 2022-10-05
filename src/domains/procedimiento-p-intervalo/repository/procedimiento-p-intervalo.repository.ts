import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoPIntervaloService } from '@domains/procedimiento-p-intervalo/repository/procedimiento-p-intervalo.service';
import { getAllProcedimientoPIntervaloPaginatedSchema } from '@domains/procedimiento-p-intervalo/repository/procedimiento-p-intervalo.schemas';

class ProcedimientoPIntervaloRepository {
  static getAllProcedimientoPIntervaloPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ProcedimientoPIntervaloService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPIntervaloPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoPIntervaloById = async (id: string) => {
    const response$ = from(ProcedimientoPIntervaloService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoPIntervalo = async (procedimientoPIntervalo: AnyValue) => {
    const response$ = from(ProcedimientoPIntervaloService.post(procedimientoPIntervalo)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoPIntervalo = async (procedimientoPIntervalo: AnyValue) => {
    const response$ = from(ProcedimientoPIntervaloService.patch(procedimientoPIntervalo)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoPIntervaloById = async (id: number) => {
    const response$ = from(ProcedimientoPIntervaloService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoPIntervaloRepository;
