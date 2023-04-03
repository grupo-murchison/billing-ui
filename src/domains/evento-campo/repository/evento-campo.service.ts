import { ApiProvider } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoCampoService {
  // TODO: Implement next BASE_PATH const in the rest of service databases.
  private static BASE_PATH = 'api/v1/evento-campo';

  static getAllAsDropdown = async (): Promise<HandlePromise> => {
    const [response, error] = await AxiosUtils.handleResponse(
      ApiProvider.get<AnyValue>(`${this.BASE_PATH}/all/dropdown`),
    );

    return [response, error];
  };
}

export { EventoCampoService };
