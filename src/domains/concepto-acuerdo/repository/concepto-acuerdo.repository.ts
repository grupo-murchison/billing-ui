import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/components';

import { RepositoryUtils } from '@app/utils';

import { ConceptoAcuerdoService } from '@domains/concepto-acuerdo/repository/concepto-acuerdo.service';
import { getAllConceptoAcuerdoPaginatedSchema } from '@domains/concepto-acuerdo/repository/concepto-acuerdo.schemas';

class ConceptoAcuerdoRepository {
  static getAllConceptoAcuerdoPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ConceptoAcuerdoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllConceptoAcuerdoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getConceptoAcuerdoById = async (id: string) => {
    const response$ = from(ConceptoAcuerdoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createConceptoAcuerdo = async (ConceptoAcuerdo: AnyValue) => {
    const response$ = from(ConceptoAcuerdoService.post(ConceptoAcuerdo)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateConceptoAcuerdo = async (ConceptoAcuerdo: AnyValue) => {
    const response$ = from(ConceptoAcuerdoService.patch(ConceptoAcuerdo)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteConceptoAcuerdoById = async (id: number) => {
    const response$ = from(ConceptoAcuerdoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ConceptoAcuerdoRepository;
