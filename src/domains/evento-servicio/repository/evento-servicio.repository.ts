import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoServicioService } from './evento-servicio.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-servicio.chemas';

class EventoServicioRepository {
  static getAllEventDetails = async (params: AnyValue) => {
    console.log("🚀 ~ file: evento-cliente.repository.ts:12 ~ EventoClienteRepository ~ getAllEventDetails= ~ params:", params)
    const response$ = from(EventoServicioService.getAllEventDetails(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

}

export default EventoServicioRepository;
