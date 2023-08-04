import { from, lastValueFrom } from 'rxjs';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';

import { RepositoryUtils } from '@app/utils';

import { ContratoService } from '@domains/contrato/repository/contrato.service';
import {
  getAllContratoFacturacionPaginated,
  getAllContratoPaginatedSchema,
} from '@domains/contrato/repository/contrato.schemas';

class ContratoRepository {
  static getAllContratoPaginated = async (params: RepositoryFuncParamsPaginated) => {
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
    const response$ = from(ContratoService.getByIdFull(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createContrato = async (Contrato: AnyValue) => {
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

  static variablesPorContratoProcedimientoQ = async (Contrato: AnyValue) => {
    const response$ = from(ContratoService.postVariablesPorContratoProcedimientoQ(Contrato)).pipe(
      RepositoryUtils.PIPES.getResponse(),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllContratoFacturacionPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(ContratoService.getAllContratoFacturacionPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllContratoFacturacionPaginated),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getPlanFacturacionPeriodos = async (params: Partial<Record<'contratoId', number>>) => {
    const response$ = from(ContratoService.getPlanFacturacionPeriodos(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      // RepositoryUtils.PIPES.validateWithSchema(getAllContratoFacturacionPaginated),
    );
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default ContratoRepository;
