import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoService } from './evento.service';
import {
  getAllEventoAsDropdownSchema, getAllEventoPaginatedSchema,
} from './evento.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class EventoRepository {
  static getAllEventoAsDropdown = async () => {
    const response$ = from(EventoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllEventoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllEventoPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(EventoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllEventoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
  
  static getEventoById = async (id: string) => {
    const response$ = from(EventoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createEvento = async (evento: AnyValue) => {
    const response$ = from(EventoService.create(evento)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateEvento = async (evento: AnyValue) => {
    const response$ = from(EventoService.update(evento)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteEventoById = async (id: number) => {
    const response$ = from(EventoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

}

export default EventoRepository;
