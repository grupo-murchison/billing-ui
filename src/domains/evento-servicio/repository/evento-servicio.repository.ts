import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoServicioService } from './evento-servicio.service';

function extractEventsOfData(response: AnyValue) {
  let a:Array<AnyValue> = []

  const responseParsed = response?.data.data.map((element:AnyValue) => { return  element.eventos[0]  }).map((evento:AnyValue) => { return evento})

  for (let i = 0; i < responseParsed.length; i++) {
    const element = responseParsed[i];
    a = [...a, ...element]
  }

  response.data.data = a
  response.data.meta = {itemCount: a.length}

  return response
}

class EventoServicioRepository {
  static getAllEventDetails = async (params: AnyValue) => {
    const response$ = from(EventoServicioService.getAllEventDetails(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return extractEventsOfData(response);
  };

}

export default EventoServicioRepository;