import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoServicioService } from '@domains/tipo-servicio/repository/tipoServicio.service';
import { getAllTiposServicioAsDropdownSchema } from '@domains/tipo-servicio/repository/tipoServicio.schemas';

class TipoServicioRepository {
  static getAllTiposServicioAsDropdown = async () => {
    const response$ = from(TipoServicioService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTiposServicioAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoServicioRepository;
