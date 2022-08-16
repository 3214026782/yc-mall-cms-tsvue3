import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YCRequestInterceptors, YCRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEAFULT_LOADING = true

// 用这种方法封装的类，每次new出来都是一个单独的实例，并且非常具有扩展性
class YCRequest {
  // axios的实例
  instance: AxiosInstance
  // 拦截器 类型来着自己定义的type.ts
  interceptors?: YCRequestInterceptors
  // 判断每个请求是否显示loading
  showLoading?: boolean
  // 自己定义的loading实例，方便取消
  loading?: LoadingInstance

  // 类的构造器 初始化aioxs实例
  constructor(config: YCRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 初始化并且应用拦截器(可选) 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都会有的拦截器')
        if (this.showLoading) {
          // 加载时出现loading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有实例都会有的拦截器')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都会有的拦截器')
        // 将loading移除
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有实例都会有的拦截器')
        // 将loading移除
        this.loading?.close()
        // 例子：判断不同的httpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  //request方法 传入对应参数
  request<T = any>(config: YCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          console.log(res)

          // 2.将showLoading设置冲true，这样不会影响到下一个请求
          this.showLoading = DEAFULT_LOADING

          // 3.讲结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          //将showLoading设置冲true，这样不会影响到下一个请求
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }
  //定义get请求，就是把config配置解构传入request，并且加上了method
  get<T = any>(config: YCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: YCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YCRequest
