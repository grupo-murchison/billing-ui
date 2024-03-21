import { RepositoryUtils } from '@app/utils';
import { EventoCargaService } from './evento-carga.service';

class EventoCargaRepository {
  static uploadFile = async (file: File) => {
    return await RepositoryUtils.fromRxjs(EventoCargaService.uploadFile(file));
  };
}

export default EventoCargaRepository;
