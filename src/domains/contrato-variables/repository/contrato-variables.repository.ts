import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { ContratoVariablesService } from './contrato-variables.service';

class ContratoVariablesRepository {
  static createContratoVariable = async (contratoVariable: AnyValue) => {
    const response$ = from(ContratoVariablesService.post(contratoVariable)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateContratoVariable = async (contratoVariable: AnyValue, id: any) => {
    const response$ = from(ContratoVariablesService.patch(contratoVariable, id)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ContratoVariablesRepository;
