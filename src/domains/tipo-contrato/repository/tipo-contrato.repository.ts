import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoContratoService } from '@domains/tipo-contrato/repository/tipo-contrato.service';
import { getAllTiposContratoAsDropdownSchema } from '@domains/tipo-contrato/repository/tipo-contrato.schemas';

class TipoContratoRepository {
  static getAllTiposContratoAsDropdown = async () => {
    const response$ = from(TipoContratoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTiposContratoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoContratoRepository;
