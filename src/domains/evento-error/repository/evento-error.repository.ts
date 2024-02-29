import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoErrorService } from './evento-error.service';
import { getAllEventoAsDropdownSchema, getAllEventoPaginatedSchema } from './evento-error.schemas';
import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

class EventoErrorRepository {
  static readonly getAllEventoPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(EventoErrorService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllEventoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    console.log('🚀 ~ EventoRepository ~ getAllEventoPaginated= ~ response:', response);
    return response;
  };
}

export default EventoErrorRepository;
