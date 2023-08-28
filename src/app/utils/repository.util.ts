import { AxiosError, AxiosResponse } from 'axios';
import { from, lastValueFrom, map } from 'rxjs';

import z from 'zod';

import type { HandlePromise } from './axios.util';

const getResponse = () => {
  return map(([response, error]: HandlePromise) => {
    if (response) {
      return response;
    }

    const err = AxiosHandlerError(error);

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

export const fromRxjs = async (axiosService: Promise<HandlePromise>, pipes?: AnyValue) => {
  const response$ = from(axiosService).pipe(getResponse(), pipes());

  const response = await lastValueFrom(response$);
  return response;
};

function AxiosHandlerError(axiosError: Undefined<AxiosError<unknown, AnyValue>>) {
  const error: IError = {
    message: null,
    status: null,
    headers: null,
  };

  console.info('isAxiosError:', axiosError?.isAxiosError);

  if (axiosError?.isAxiosError) {
    handleAxiosError(axiosError, error);
  } else {
    handleUnexpectedError(axiosError, error);
  }
  return error;
}

function handleAxiosError(axiosError: AxiosError<unknown, AnyValue>, error: IError) {
  console.info('Axios error code: ', axiosError.code);

  if (axiosError?.response?.data) {
    //* La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango de 2xx
    console.warn('Response Error:');
    console.log(axiosError.response);

    error.message = axiosError.response.data;
    error.status = axiosError.response.status;
    error.headers = axiosError.response.headers;
  } else if (axiosError.request) {
    //? La petición fue hecha pero no se recibió respuesta. Is an instance of XMLHttpRequest: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest
    console.warn('No Response. Request:');
    console.log(axiosError.request);

    error.message = axiosError.message;
  } else {
    //! Algo sucedió al configurar la solicitud que provocó un error
    console.error('Axios Request Error');
    console.error(axiosError.config);
    error.message = axiosError.message;
  }

  //* https://github.com/axios/axios#error-types
  switch (axiosError.code) {
    case AxiosError.ERR_NETWORK: // isAxiosError: true
    case AxiosError.ECONNABORTED: // => Conexion cerrada, por ejemplo si el usuario recarga la página antes de recibir respuesta
      error.message = 'Error de red o conexión.';
      break;
    case AxiosError.ERR_BAD_REQUEST:
      error.message = axiosError.message; // isAxiosError: true => "Request failed with status code 404"
      break;
    default:
      error.message = axiosError.message;
      break;
  }
}

function handleUnexpectedError(axiosError: Undefined<AxiosError<unknown, AnyValue>>, error: IError) {
  error.message = 'Ocurrió un error inesperado.';
  console.error(error.message);
  console.log(axiosError);
}

interface IError {
  message: AnyValue;
  status: number | null;
  headers: AnyValue;
}
