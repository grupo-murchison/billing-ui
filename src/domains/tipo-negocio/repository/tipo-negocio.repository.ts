import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoNegocioService } from './tipo-negocio.service';
import { getAllTipoNegocioAsDropdownSchema } from './tipo-negocio.schemas';

class TipoNegocioRepository {
  static getAllTipoNegocioAsDropdown = async () => {
    const response$ = from(TipoNegocioService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoNegocioAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoNegocioRepository;
