import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoPSService } from '@domains/procedimiento-ps/repository/procedimiento-ps.service';
import {
  getAllProcedimientoPSPaginatedSchema,
  getAllProcedimientoPSAsDropdownSchema,
} from '@domains/procedimiento-ps/repository/procedimiento-ps.schemas';

class ProcedimientoPSRepository {
  static getAllProcedimientoPSPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ProcedimientoPSService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPSPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllProcedimientoPSAsDropdown = async () => {
    const response$ = from(ProcedimientoPSService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPSAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoPSById = async (id: string) => {
    const response$ = from(ProcedimientoPSService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoPS = async (procedimientoPS: AnyValue) => {
    const response$ = from(ProcedimientoPSService.post(procedimientoPS)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoPS = async (procedimientoPS: AnyValue) => {
    const response$ = from(ProcedimientoPSService.patch(procedimientoPS)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoPSById = async (id: number) => {
    const response$ = from(ProcedimientoPSService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoPSRepository;
