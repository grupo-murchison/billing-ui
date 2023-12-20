import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';
import { TablasDinamicasService } from './tablas-dinamicas.service';
import { getAllTablasDinamicasAsDropdownSchema, getAllTablasDinamicasPaginatedSchema } from './tablas-dinamicas.schemas';

class TablasDinamicasRepository {
  static getAllTablasDinamicasPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(TablasDinamicasService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTablasDinamicasPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllTablasDinamicasAsDropdown = async () => {
    const response$ = from(TablasDinamicasService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTablasDinamicasAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getTablasDinamicasById = async (id: string) => {
    const response$ = from(TablasDinamicasService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createTablasDinamicas = async (tablasDinamicas: AnyValue) => {
    const response$ = from(TablasDinamicasService.post(tablasDinamicas)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateTablasDinamicas = async (tablasDinamicas: AnyValue) => {
    const response$ = from(TablasDinamicasService.patch(tablasDinamicas)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteTablasDinamicasById = async (id: number) => {
    const response$ = from(TablasDinamicasService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TablasDinamicasRepository;
