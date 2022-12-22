import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ProcedimientoCustomService } from '@domains/procedimiento-custom/repository/procedimiento-custom.service';
import { getAllProcedimientoCustomAsDropdownSchema } from '@domains/procedimiento-custom/repository/procedimiento-custom.schemas';

class ProcedimientoCustomRepository {
  static getAllProcedimientoCustomAsDropdown = async () => {
    const response$ = from(ProcedimientoCustomService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllProcedimientoCustomAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ProcedimientoCustomRepository;
