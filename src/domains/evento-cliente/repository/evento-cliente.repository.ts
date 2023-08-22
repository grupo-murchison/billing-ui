import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoClienteService } from './evento-cliente.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-clientes.chemas';

class EventoClienteRepository {
  static getAllEventDetails = async (params: any) => {
    const response$ = from(EventoClienteService.getAllEventDetails(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllEventsAsDropdown = async () => {
    const response$ = from(EventoClienteService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllClienteAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
  
  static getAllEventsAsDropdownAutoComplete = async (filter?: Partial<Record<'filter', string>>) => {
    const response$ = from(EventoClienteService.getAllAsEventsAutocomplete(filter)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllClienteAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

}

export default EventoClienteRepository;
