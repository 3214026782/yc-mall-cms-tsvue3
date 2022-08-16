import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 新增一个接口类型，接收响应和返回的拦截器
export interface YCRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 扩展原来AxiosRequestConfig的参数类型加上了接收响应和返回的拦截器
export interface YCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YCRequestInterceptors<T>
  showLoading?: boolean
}
