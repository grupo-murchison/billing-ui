import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoClienteService } from './evento-cliente.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-clientes.chemas';

class EventoClienteRepository {
  static getAllEventDetails = async () => {
    const response$ = from(EventoClienteService.getAllEventDetails()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default EventoClienteRepository;
