import { injectable } from 'tsyringe';

import axios from 'axios';
import type { AxiosRequestHeaders, AxiosRequestConfig, AxiosPromise } from 'axios';

const BASE_URL = import.meta.env.VITE_API_HOST;

@injectable()
class ApiProvider {
  private instance;

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Authorization': `Bearer ${''}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  private getDefaultHeaders(): AxiosRequestHeaders {
    const headers: AxiosRequestHeaders = {};

    return headers;
  }

  get = <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.instance.get(url, { ...this.getDefaultHeaders(), ...config });

  post = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.instance.post(url, payload, { ...this.getDefaultHeaders(), ...config });

  put = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.instance.put(url, payload, { ...this.getDefaultHeaders(), ...config });

  patch = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.instance.patch(url, payload, { ...this.getDefaultHeaders(), ...config });

  delete = <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.instance.delete(url, { ...this.getDefaultHeaders(), ...config });
}

export default ApiProvider;
