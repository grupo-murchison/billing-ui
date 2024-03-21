import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoQService } from '@domains/procedimiento-q/repository/procedimiento-q.service';
import {
  getAllProcedimientoQPaginatedSchema,
  getAllProcedimientoQAsDropdownSchema,
} from '@domains/procedimiento-q/repository/procedimiento-q.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class TipoProcedimientoQRepository {
  static getAllProcedimientoQPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(ProcedimientoQService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoQPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllProcedimientoQAsDropdown = async () => {
    const response$ = from(ProcedimientoQService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoQAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getProcedimientoQById = async (id: string) => {
    const response$ = from(ProcedimientoQService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createProcedimientoQ = async (ProcedimientoQ: AnyValue) => {
    const response$ = from(ProcedimientoQService.post(ProcedimientoQ)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateProcedimientoQ = async (ProcedimientoQ: AnyValue) => {
    const response$ = from(ProcedimientoQService.patch(ProcedimientoQ)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteProcedimientoQById = async (id: number) => {
    const response$ = from(ProcedimientoQService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoProcedimientoQRepository;
