import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoProcedimientoQService } from '@domains/tipo-procedimiento-q/repository/tipo-procedimiento-q.service';
import { getAllTipoProcedimientoQAsDropdownSchema } from '@domains/tipo-procedimiento-q/repository/tipo-procedimiento-q.schemas';

class TipoProcedimientoQRepository {
  static getAllTipoProcedimientoQAsDropdown = async () => {
    const response$ = from(TipoProcedimientoQService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoProcedimientoQAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoProcedimientoQRepository;
