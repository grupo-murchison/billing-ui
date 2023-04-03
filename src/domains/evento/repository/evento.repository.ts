import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoService } from './evento.service';
import {
  getAllEventoAsDropdownSchema,
} from './evento.schemas';

class EventoRepository {
  static getAllEventoAsDropdown = async () => {
    const response$ = from(EventoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllEventoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default EventoRepository;
