import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ReglaFechaPeriodoService } from '@domains/regla-fecha-periodo/repository/regla-fecha-periodo.service';
import { getAllReglasFechaPeriodoAsDropdownSchema } from '@domains/regla-fecha-periodo/repository/regla-fecha-periodo.schemas';

class ReglaFechaPeriodoRepository {
  static getAllReglasFechaPeriodoAsDropdown = async () => {
    const response$ = from(ReglaFechaPeriodoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllReglasFechaPeriodoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ReglaFechaPeriodoRepository;
