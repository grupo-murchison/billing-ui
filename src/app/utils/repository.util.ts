import type { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { from, lastValueFrom, map } from 'rxjs';

import z from 'zod';

import type { HandlePromise } from './axios.util';

const getResponse = () => {
  return map(([response, error]: HandlePromise) => {
    if (response) {
      return response;
    }

    const err = AxiosHandlerError(error);

    // throw new Error(`${error?.response?.data || '-'}`);
    throw new Error(`${JSON.stringify(err?.message)}`);
  });
};

export const PIPES = {
  getResponse: () => {
    return map(([response, error]: HandlePromise) => {
      if (response) {
        return response;
      }

      const err = AxiosHandlerError(error);

      // throw new Error(`${error?.response?.data || '-'}`);
      throw new Error(`${JSON.stringify(err?.message)}`);
    });
  },
  validateWithSchema: <T>(schema: z.ZodType<T>) => {
    return map((response: AxiosResponse): AxiosResponse<z.infer<typeof schema>> => {
      response.data = schema.parse(response.data);

      return response;
    });
  },
};

export const fromRxjs = async (axiosService: Promise<HandlePromise>, pipes?: any) => {
  const response$ = from(axiosService).pipe(getResponse(), pipes());

  const response = await lastValueFrom(response$);
  return response;
};

function AxiosHandlerError(axiosError: Undefined<AxiosError<unknown, any>>) {
  const error: IError = {
    message: null,
    status: null,
    headers: null,
  };
  if (axiosError) {
    if (axiosError.response) {
      // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx

      error.message = axiosError.response.data;
      error.status = axiosError.response.status;
      error.headers = axiosError.response.headers;
      console.log('Axios Error Response: \n', axiosError.request);
    } else if (axiosError.request) {
      // La petición fue hecha pero no se recibió respuesta
      // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de http.ClientRequest en node.js
      error.message = axiosError.request;
      console.log('Axios Error Request: \n', axiosError.request);
    } else {
      // Algo paso al preparar la petición que lanzo un Error
      error.message = axiosError.message;
      console.log('Error al hacer la petición');
    }
    console.log('Axios Error Config: \n', axiosError.config);
    // error.message = axiosError.config;
    return error;
  }
}

interface IError {
  message: any;
  status: number | null;
  headers: any;
}
