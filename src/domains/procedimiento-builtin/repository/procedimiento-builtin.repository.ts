import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoBuiltinService } from '@domains/procedimiento-builtin/repository/procedimiento-builtin.service';
import { getAllProcedimientoBuiltinAsDropdownSchema } from '@domains/procedimiento-builtin/repository/procedimiento-builtin.schemas';

class ProcedimientoBuiltinRepository {
  static getAllProcedimientoBuiltinAsDropdown = async () => {
    const response$ = from(ProcedimientoBuiltinService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoBuiltinAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoBuiltinRepository;
