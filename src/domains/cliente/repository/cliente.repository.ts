import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ClienteService } from '@domains/cliente/repository/cliente.service';
import { getAllClienteAsDropdownSchema } from '@domains/cliente/repository/cliente.schemas';

class ClienteRepository {
  static getAllClienteAsDropdown = async () => {
    const response$ = from(ClienteService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllClienteAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getClienteById = async (id: string) => {
    const response$ = from(ClienteService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ClienteRepository;
