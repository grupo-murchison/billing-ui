import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { FacturacionService } from './facturacion.service';
import { getAllFacturasReportePaginatedSchema } from './facturacion.schemas';

class FacturacionRepository {
  static getAllFacturasPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(FacturacionService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllFacturasReportePaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static facturacionManual = async (contratoId: number) => {
    const response$ = from(FacturacionService.facturacionManual(contratoId)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getEventos = async (facturacionContratoConceptoId: string) => {
    const response$ = from(FacturacionService.getEventos(facturacionContratoConceptoId)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default FacturacionRepository;
