import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { MonedaService } from '@domains/moneda/repository/moneda.service';
import { getAllMonedaAsDropdownSchema } from '@domains/moneda/repository/moneda.schemas';

class MonedaRepository {
  static getAllMonedaAsDropdown = async () => {
    const response$ = from(MonedaService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllMonedaAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default MonedaRepository;
