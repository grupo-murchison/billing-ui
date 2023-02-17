import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoProcedimientoQService } from '@domains/tipo-procedimiento-q/repository/tipo-procedimiento-q.service';
import { getAllTipoDatoAsDropdownSchema } from '@domains/tipo-dato/repository/tipo-dato.schemas';

class TipoDatoRepository {
  static getAllTipoDatoAsDropdown = async () => {
    const response$ = from(TipoProcedimientoQService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoDatoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoDatoRepository;
