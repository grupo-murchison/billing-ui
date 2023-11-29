import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoCampoService } from './evento-campo.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-campo.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class EventoCampoRepository {

  static getAllEventoCampoPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(EventoCampoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllEventoCampoAsDropdown = async () => {
    const response$ = from(EventoCampoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getEventoCampoById = async (id: string) => {
    const response$ = from(EventoCampoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getEventoCampoByEventoId = async (eventoId: string) => {
    const response$ = from(EventoCampoService.getByEventoId(eventoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static createEventoCampo = async (evento: AnyValue) => {
    const response$ = from(EventoCampoService.create(evento)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateEventoCampo = async (evento: AnyValue) => {
    const response$ = from(EventoCampoService.update(evento)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteEventoCampoById = async (id: number) => {
    const response$ = from(EventoCampoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default EventoCampoRepository;
