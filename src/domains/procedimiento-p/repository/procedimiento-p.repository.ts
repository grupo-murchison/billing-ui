import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoPService } from '@domains/procedimiento-p/repository/procedimiento-p.service';
import {
  getAllProcedimientoPPaginatedSchema,
  getAllProcedimientoPAsDropdownSchema,
} from '@domains/procedimiento-p/repository/procedimiento-p.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class ProcedimientoPRepository {
  static getAllProcedimientoPPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(ProcedimientoPService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllProcedimientoPAsDropdown = async () => {
    const response$ = from(ProcedimientoPService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoPAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoPById = async (id: string) => {
    const response$ = from(ProcedimientoPService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoP = async (procedimientoP: AnyValue) => {
    const response$ = from(ProcedimientoPService.post(procedimientoP)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoP = async (procedimientoP: AnyValue) => {
    const response$ = from(ProcedimientoPService.patch(procedimientoP)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoPById = async (id: number) => {
    const response$ = from(ProcedimientoPService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoPRepository;
