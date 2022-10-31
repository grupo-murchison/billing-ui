import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoProcedimientoBuiltinService } from '@domains/tipo-procedimiento-builtin/repository/tipo-procedimiento-builtin.service';
import { getAllTipoProcedimientoBuiltinAsDropdownSchema } from '@domains/tipo-procedimiento-builtin/repository/tipo-procedimiento-builtin.schemas';

class TipoProcedimientoBuiltinRepository {
  static getAllTipoProcedimientoBuiltinAsDropdown = async () => {
    const response$ = from(TipoProcedimientoBuiltinService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoProcedimientoBuiltinAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoProcedimientoBuiltinRepository;
