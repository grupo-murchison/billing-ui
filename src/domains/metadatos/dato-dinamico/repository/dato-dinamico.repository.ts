import { from, lastValueFrom } from 'rxjs';

import { RepositoryUtils } from '@app/utils';

import { RepositoryFuncParamsPaginated } from '@app/components/DataGrid';
import { DatoDinamicoService } from './dato-dinamico.service';
import { getAllDatoDinamicoPaginatedSchema } from './dato-dinamico.schemas';

class DatoDinamicoRepository {
  static getAllDatoDinamicoPaginated = async (params: RepositoryFuncParamsPaginated) => {
    const response$ = from(DatoDinamicoService.getAllPaginated(params)).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllDatoDinamicoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getAllDatoDinamicoAsDropdown = async () => {
    const response$ = from(DatoDinamicoService.getAllAsDropdown()).pipe(
      RepositoryUtils.PIPES.getResponse(),
      RepositoryUtils.PIPES.validateWithSchema(getAllDatoDinamicoPaginatedSchema),
    );
    const response = await lastValueFrom(response$);
    return response;
  };

  static getDatoDinamicoById = async (id: string) => {
    const response$ = from(DatoDinamicoService.getById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static createDatoDinamico = async (datosDinamicos: AnyValue) => {
    const response$ = from(DatoDinamicoService.post(datosDinamicos)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static updateDatoDinamico = async (datosDinamicos: AnyValue) => {
    const response$ = from(DatoDinamicoService.patch(datosDinamicos)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };

  static deleteDatoDinamicoById = async (id: number) => {
    const response$ = from(DatoDinamicoService.deleteById(id)).pipe(RepositoryUtils.PIPES.getResponse());
    const response = await lastValueFrom(response$);
    return response;
  };
}

export default DatoDinamicoRepository;
