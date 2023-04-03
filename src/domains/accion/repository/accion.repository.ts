import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { AccionService } from './accion.service';
import {
  getAllAccionAsDropdownSchema,
} from './accion.schemas';

class AccionRepository {
  static getAllAccionAsDropdown = async () => {
    const response$ = from(AccionService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllAccionAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default AccionRepository;
