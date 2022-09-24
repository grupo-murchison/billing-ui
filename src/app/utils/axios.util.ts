import type { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

export const handleResponse = (promise: AxiosPromise): Promise<HandlePromise> => {
  return new Promise(resolve => {
    promise.then(response => resolve([response, undefined])).catch(error => resolve([undefined, error]));
  });
};

export type HandlePromise = [Undefined<AxiosResponse>, Undefined<AxiosError>];
