import type { AxiosPromise, AxiosResponse, AxiosError, AxiosResponseHeaders } from 'axios';

export const handleResponse = <T>(promise: AxiosPromise<T>): Promise<HandlePromise<T>> => {
  return new Promise(resolve => {
    promise.then(response => resolve([response, undefined])).catch(error => resolve([undefined, error]));
  });
};

export type HandlePromise<T> = [Undefined<AxiosResponse<T>>, Undefined<AxiosError>];

export const downloadPdfAxios = (file: AnyValue, fileName = 'descarga.pdf') => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getFileNameHeaders = (headers: AxiosResponseHeaders, fileName = 'descarga.pdf') => {
  return headers['content-disposition']
    ? headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '')
    : fileName;
};

const isJsonBlob = (data: AnyValue) => data instanceof Blob && data.type === 'application/json';

export const blobToJSON = async (data: AnyValue) => {
  const responseData = isJsonBlob(data) ? await data.text() : data || {};
  const responseJSON = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;
  return responseJSON;
};
