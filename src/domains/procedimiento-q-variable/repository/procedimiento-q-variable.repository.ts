import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoQVariableService } from '@domains/procedimiento-q-variable/repository/procedimiento-q-variable.service';
import { getAllProcedimientoQVariablePaginatedSchema } from '@domains/procedimiento-q-variable/repository/procedimiento-q-variable.schemas';

class ProcedimientoQVariableRepository {
  static getAllProcedimientoQVariablePaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ProcedimientoQVariableService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoQVariablePaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoQVariableById = async (id: string) => {
    const response$ = from(ProcedimientoQVariableService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoQVariable = async (procedimientoQVariable: AnyValue) => {
    const response$ = from(ProcedimientoQVariableService.post(procedimientoQVariable)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoQVariable = async (procedimientoQVariable: AnyValue) => {
    const response$ = from(ProcedimientoQVariableService.patch(procedimientoQVariable)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoQVariableById = async (id: number) => {
    const response$ = from(ProcedimientoQVariableService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoQVariableRepository;
