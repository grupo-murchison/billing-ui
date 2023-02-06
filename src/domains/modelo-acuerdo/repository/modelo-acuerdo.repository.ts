import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

import { RepositoryUtils } from '@app/utils';

import { ModeloAcuerdoService } from '@domains/modelo-acuerdo/repository/modelo-acuerdo.service';
import {
  getAllModeloAcuerdoPaginatedSchema,
  getAllModeloAcuerdoAsDropdownSchema,
} from '@domains/modelo-acuerdo/repository/modelo-acuerdo.schemas';

class ModeloAcuerdoRepository {
  static getAllModeloAcuerdoPaginated = async (params: DataGridRepositoryFuncParams) => {
    const response$ = from(ModeloAcuerdoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllModeloAcuerdoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllModeloAcuerdoAsDropdown = async () => {
    const response$ = from(ModeloAcuerdoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllModeloAcuerdoAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getModeloAcuerdoById = async (id: string) => {
    const response$ = from(ModeloAcuerdoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createModeloAcuerdo = async (modeloAcuerdo: AnyValue) => {
    const response$ = from(ModeloAcuerdoService.post(modeloAcuerdo)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteModeloAcuerdoById = async (id: number) => {
    const response$ = from(ModeloAcuerdoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ModeloAcuerdoRepository;
