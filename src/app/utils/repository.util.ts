import type { AxiosResponse } from 'axios';
import { map } from 'rxjs';

import z from 'zod';

import type { HandlePromise } from './axios.util';

export const PIPES = {
  getResponse: () => {
    return map(([response, error]: HandlePromise) => {
      if (response) {
        return response;
      }

      throw new Error(`${error?.response?.data || '-'}`);
    });
  },
  validateWithSchema: <T>(schema: z.ZodType<T>) => {
    return map((response: AxiosResponse): AxiosResponse<z.infer<typeof schema>> => {
      response.data = schema.parse(response.data);

      return response;
    });
  },
};
