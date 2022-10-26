import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoDatoService } from '@domains/tipo-dato/repository/tipo-dato.service';
import { getAllTipoDatoAsDropdownSchema } from '@domains/tipo-dato/repository/tipo-dato.schemas';

class TipoDatoRepository {
  static getAllTipoDatoAsDropdown = async () => {
    const response$ = from(TipoDatoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTipoDatoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoDatoRepository;
