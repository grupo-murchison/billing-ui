import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoServicioService } from './evento-servicio.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-servicio.chemas';

class EventoServicioRepository {
  static getAllEventDetails = async (params: any) => {
    console.log("🚀 ~ file: evento-cliente.repository.ts:12 ~ EventoClienteRepository ~ getAllEventDetails= ~ params:", params)
    const response$ = from(EventoServicioService.getAllEventDetails(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllEventsAsDropdown = async () => {
    const response$ = from(EventoServicioService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllClienteAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
  
  static getAllEventsAsDropdownAutoComplete = async (filter?: Partial<Record<'filter', string>>) => {
    const response$ = from(EventoServicioService.getAllAsEventsAutocomplete(filter)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllClienteAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

}

export default EventoServicioRepository;
