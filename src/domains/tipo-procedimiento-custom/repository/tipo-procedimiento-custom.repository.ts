import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoProcedimientoCustomService } from '@domains/tipo-procedimiento-custom/repository/tipo-procedimiento-custom.service';
import { getAllTipoProcedimientoCustomAsDropdownSchema } from '@domains/tipo-procedimiento-custom/repository/tipo-procedimiento-custom.schemas';

class TipoProcedimientoCustomRepository {
  static getAllTipoProcedimientoCustomAsDropdown = async () => {
    const response$ = from(TipoProcedimientoCustomService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoProcedimientoCustomAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoProcedimientoCustomRepository;
