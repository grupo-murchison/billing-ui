import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { EventoCampoService } from './evento-campo.service';
import {
  getAllEventoCampoAsDropdownSchema,
} from './evento-campo.schemas';

class EventoCampoRepository {
  static getAllEventoCampoAsDropdown = async () => {
    const response$ = from(EventoCampoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllEventoCampoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default EventoCampoRepository;
