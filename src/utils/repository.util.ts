import type { HandlePromise } from './axios.util';

export const getResponse = <T>([response, error]: HandlePromise<T>): T => {
  if (response) {
    return response;
  }

  throw new Error(`${error?.response?.data || '-'}`);
};
