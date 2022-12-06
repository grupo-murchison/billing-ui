import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { RepositoryUtils } from '@app/utils';

import { ContratoService } from '@domains/contrato/repository/contrato.service';
import { getAllContratoPaginatedSchema } from '@domains/contrato/repository/contrato.schemas';

class ContratoRepository {
  static getAllContratoPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ContratoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllContratoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static createContrato = async (Contrato: AnyValue) => {
    const response$ = from(ContratoService.post(Contrato)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ContratoRepository;
