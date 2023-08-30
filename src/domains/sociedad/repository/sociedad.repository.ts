import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';
import { getAllSociedadAsDropdownSchema } from './sociedad.schemas';
import { SociedadService } from './sociedad.service';

class SociedadRepository {
  static getAllSociedadAsDropdown = async () => {
    const response$ = from(SociedadService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllSociedadAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllSociedadAsDropdownAutoComplete = async (filter?: Partial<Record<'filter', string>>) => {
    const response$ = from(SociedadService.getAllAsDropdownAutocomplete(filter)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllSociedadAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default SociedadRepository;
