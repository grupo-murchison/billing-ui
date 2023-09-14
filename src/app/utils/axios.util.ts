import type { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

export const handleResponse = (promise: AxiosPromise): Promise<HandlePromise> => {
  return new Promise(resolve => {
    promise.then(response => resolve([response, undefined])).catch(error => resolve([undefined, error]));
  });
};

export type HandlePromise = [Undefined<AxiosResponse>, Undefined<AxiosError>];

export const downloadPdf = (url: any) => {
  window.location.href = `${url}`;
};

export const downloadPdfAxios = (file: any, fileName = 'descarga.pdf') => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getFileNameHeaders = (headers: any, fileName = 'descarga.pdf') => {
  return headers['content-disposition']
    ? headers['content-disposition'].split('filename=')[1].replace(/['"]+/g, '')
    : fileName;
};

const isJsonBlob = (data: any) => data instanceof Blob && data.type === 'application/json';

export const blobToJSON = async (data: any) => {
  const responseData = isJsonBlob(data) ? await data.text() : data || {};
  const responseJSON = typeof responseData === 'string' ? JSON.parse(responseData) : responseData;
  return responseJSON;
};
