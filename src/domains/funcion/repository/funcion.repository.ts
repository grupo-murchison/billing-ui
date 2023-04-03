import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { FuncionService } from './funcion.service';
import {
  getAllFuncionAsDropdownSchema,
} from './funcion.schemas';

class FuncionRepository {
  static getAllFuncionAsDropdown = async () => {
    const response$ = from(FuncionService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllFuncionAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default FuncionRepository;
