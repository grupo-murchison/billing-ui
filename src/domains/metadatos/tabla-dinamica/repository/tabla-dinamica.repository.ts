import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';
import { TablaDinamicaService } from './tabla-dinamica.service';
import { getAllTablaDinamicaAsDropdownSchema, getAllTablaDinamicaPaginatedSchema } from './tabla-dinamica.schemas';

class TablaDinamicaRepository {
  static getAllTablaDinamicaPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(TablaDinamicaService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTablaDinamicaPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllTablaDinamicaAsDropdown = async () => {
    const response$ = from(TablaDinamicaService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllTablaDinamicaAsDropdownSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getTablaDinamicaById = async (id: string) => {
    const response$ = from(TablaDinamicaService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createTablaDinamica = async (tablaDinamica: AnyValue) => {
    const response$ = from(TablaDinamicaService.post(tablaDinamica)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateTablaDinamica = async (tablaDinamica: AnyValue) => {
    const response$ = from(TablaDinamicaService.patch(tablaDinamica)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteTablaDinamicaById = async (id: number) => {
    const response$ = from(TablaDinamicaService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default TablaDinamicaRepository;
