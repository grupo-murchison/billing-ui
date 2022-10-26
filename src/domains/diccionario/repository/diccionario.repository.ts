import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { DiccionarioService } from '@domains/diccionario/repository/diccionario.service';
import { getAllDiccionarioAsDropdownSchema } from '@domains/diccionario/repository/diccionario.schemas';

class DiccionarioRepository {
  static getAllDiccionarioAsDropdown = async () => {
    const response$ = from(DiccionarioService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllDiccionarioAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default DiccionarioRepository;
