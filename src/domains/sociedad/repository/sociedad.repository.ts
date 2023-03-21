import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { getAllClienteAsDropdownSchema as getAllSociedadAsDropdownSchema } from '@domains/cliente/repository/cliente.schemas';
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
}

export default SociedadRepository;
