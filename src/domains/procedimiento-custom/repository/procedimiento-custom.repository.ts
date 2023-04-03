import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { ProcedimientoCustomService } from '@domains/procedimiento-custom/repository/procedimiento-custom.service';
import {
  getAllProcedimientoCustomPaginatedSchema,
  getAllProcedimientoCustomAsDropdownSchema,
} from '@domains/procedimiento-custom/repository/procedimiento-custom.schemas';

class ProcedimientoCustomRepository {
  static getAllProcedimientoCustomPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ProcedimientoCustomService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoCustomPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllProcedimientoCustomAsDropdown = async () => {
    const response$ = from(ProcedimientoCustomService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoCustomAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoCustomById = async (id: string) => {
    const response$ = from(ProcedimientoCustomService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoCustom = async (procedimientoCustom: AnyValue) => {
    const response$ = from(ProcedimientoCustomService.post(procedimientoCustom)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoCustom = async (procedimientoCustom: AnyValue) => {
    const response$ = from(ProcedimientoCustomService.patch(procedimientoCustom)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoCustomById = async (id: number) => {
    const response$ = from(ProcedimientoCustomService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoCustomRepository;
