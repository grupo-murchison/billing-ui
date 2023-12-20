import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';
import { DatosDinamicosService } from './datos-dinamicos.service';
import { getAllDatosDinamicosPaginatedSchema } from './datos-dinamicos.schemas';

class DatosDinamicosRepository {
  static getAllDatosDinamicosPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(DatosDinamicosService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllDatosDinamicosPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllDatosDinamicosAsDropdown = async () => {
    const response$ = from(DatosDinamicosService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllDatosDinamicosPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getDatosDinamicosById = async (id: string) => {
    const response$ = from(DatosDinamicosService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createDatosDinamicos = async (datosDinamicos: AnyValue) => {
    const response$ = from(DatosDinamicosService.post(datosDinamicos)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateDatosDinamicos = async (datosDinamicos: AnyValue) => {
    const response$ = from(DatosDinamicosService.patch(datosDinamicos)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteDatosDinamicosById = async (id: number) => {
    const response$ = from(DatosDinamicosService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default DatosDinamicosRepository;
