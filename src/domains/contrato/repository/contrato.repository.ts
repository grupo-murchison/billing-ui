import { from, lastValueFrom } from 'rxjs';

import type { DataGridRepositoryFuncParams } from '@app/pro-components';

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

  static getContratoById = async (id: string) => {
    const response$ = from(ContratoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static getContratoByIdAndContratoVariables = async (id: string) => {
    const response$ = from(ContratoService.getByIdAndContratoVariables(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createContrato = async (Contrato: AnyValue) => {
    console.log('Contrato :',Contrato);
    
    const response$ = from(ContratoService.post(Contrato)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateContrato = async (contrato: AnyValue) => {
    const response$ = from(ContratoService.patch(contrato)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteContratoById = async (id: number) => {
    const response$ = from(ContratoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ContratoRepository;
