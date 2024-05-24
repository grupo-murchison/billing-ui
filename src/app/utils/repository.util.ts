import { AxiosError, AxiosResponse } from 'axios';
import { OperatorFunction, UnaryFunction, from, lastValueFrom, map } from 'rxjs';

import z from 'zod';

import type { HandlePromise } from './axios.util';

const getResponse = <T>() => {
  return map(([response, error]: HandlePromise<T>) => {
    if (response) {
      return response;
    }
    const err = AxiosHandlerError(error);

    throw new Error(`${JSON.stringify(err?.message)}`);
  });
};

export const PIPES = {
  getResponse,
  validateWithSchema: <T>(schema: z.ZodType<T>) => {
    return map((response: AxiosResponse): AxiosResponse<z.infer<typeof schema>> => {
      try {
        schema.parse(response.data);
      } catch (error) {
        console.error(error);
      }
      return response;
    });
  },
};

function identity<T>(x: T): T {
  return x;
}

function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
  if (fns.length === 0) {
    return identity as UnaryFunction<AnyValue, AnyValue>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: AnyValue, fn: UnaryFunction<T, R>) => fn(prev), input as AnyValue);
  };
}

export const fromRxjs = async <T>(
  axiosService: Promise<HandlePromise<T>>,
  ...operations: OperatorFunction<AnyValue, AnyValue>[]
) => {
  const response$ = from(axiosService).pipe(getResponse(), pipeFromArray(operations));

  const response = await lastValueFrom<AxiosResponse<T>>(response$);
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
    //! axiosError.code => ERR_BAD_REQUEST
    console.warn('Response Error:');
    console.log(axiosError.response);

    handleErrorRequest(axiosError, error);
  } else if (axiosError.request) {
    //? La petición fue hecha pero no se recibió respuesta. Is an instance of XMLHttpRequest: https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest
    console.warn('No Response. Request:');
    console.log(axiosError.request);

    error.message = axiosError.message;
  } else {
    //! Algo sucedió al configurar la solicitud que provocó un error
    console.warn('Axios Request Error');
    console.error(axiosError.config);
    error.message = axiosError.message;
  }

  //* https://github.com/axios/axios#error-types
  switch (axiosError.code) {
    case AxiosError.ERR_NETWORK:
    case AxiosError.ECONNABORTED: // => Conexion cerrada, por ejemplo si el usuario recarga la página antes de recibir respuesta
      error.message = 'Error de red o conexión.';
      break;
    case AxiosError.ERR_BAD_REQUEST:
      // isAxiosError: true => "Request failed with status code 404", 400, etc
      handleErrorRequest(axiosError, error);
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

function handleErrorRequest(axiosError: Undefined<AxiosError<unknown, AnyValue>>, error: IError) {
  if (axiosError?.response?.data) {
    error.message = axiosError?.response.data;
    error.status = axiosError?.response.status;
    error.headers = axiosError?.response.headers;
  }
}

interface IError {
  message: AnyValue;
  status: number | null;
  headers: AnyValue;
}
