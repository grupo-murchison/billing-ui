import { ApiProviderBilligEventBreakdown } from '@providers';

import { AxiosUtils } from '@app/utils';
import type { HandlePromise } from '@app/utils/axios.util';

class EventoCargaService {
  static uploadFile = async (file: File): Promise<HandlePromise> => {
    const formData = new FormData();
    formData.append('file', file);

    const [response, error] = await AxiosUtils.handleResponse(
      ApiProviderBilligEventBreakdown.post<AnyValue>('events/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    );

    return [response, error];
  };
}

export { EventoCargaService };
