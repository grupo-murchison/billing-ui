import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { TipoPlanFacturacionService } from '@domains/tipo-plan-facturacion/repository/tipo-plan-facturacion.service';
import { getAllTiposPlanFacturacionAsDropdownSchema } from '@domains/tipo-plan-facturacion/repository/tipo-plan-facturacion.schemas';

class TipoPlanFacturacionRepository {
  static getAllTiposPlanFacturacionAsDropdown = async () => {
    const response$ = from(TipoPlanFacturacionService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTiposPlanFacturacionAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TipoPlanFacturacionRepository;
