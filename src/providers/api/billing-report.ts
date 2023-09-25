import axios from 'axios';
import type { AxiosRequestHeaders, AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BILLING_REPORT_HOST_PROXY
  : import.meta.env.VITE_BILLING_REPORT_HOST;
const PASS = import.meta.env.VITE_BILLING_REPORT_PASS;
const USER = import.meta.env.VITE_BILLING_REPORT_USER;

class ApiProvider {
  private instance: Undefined<AxiosInstance>;

  private getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: `${BASE_URL}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Expose-Headers': '*',
          'Access-Control-Allow-Credentials': true,
        },
        auth: { password: PASS, username: USER },
        withCredentials: true,
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
