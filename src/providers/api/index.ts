import axios from 'axios';
import type { AxiosRequestHeaders, AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

const BASE_URL = 'http://billing-services-tzevent-mgr-stg.apps.ocp.tzarate.com.ar/billing-services'; //import.meta.env.VITE_API_HOST;

class ApiProvider {
  private instance: Undefined<AxiosInstance>;

  private getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Authorization': `Bearer ${''}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
    }

    return this.instance;
  }

  private getDefaultHeaders(): AxiosRequestHeaders {
    const headers: AxiosRequestHeaders = {};

    return headers;
  }

  get = <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.getInstance().get(url, { ...this.getDefaultHeaders(), ...config });

  post = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.getInstance().post(url, payload, { ...this.getDefaultHeaders(), ...config });

  put = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.getInstance().put(url, payload, { ...this.getDefaultHeaders(), ...config });

  patch = <T>(url: string, payload: AnyValue, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.getInstance().patch(url, payload, { ...this.getDefaultHeaders(), ...config });

  delete = <T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> =>
    this.getInstance().delete(url, { ...this.getDefaultHeaders(), ...config });
}

export default new ApiProvider();
