import { BaseRequestModel, getRequestConfig, handleMergeRequestConfig } from '@own-basic-component/config'
import type { QueryType, RequestConfig, RequestExtra, ResultModel, TempResponseType } from '@own-basic-component/config'
import { METHOD_TYPE_DELETE, METHOD_TYPE_PATCH, METHOD_TYPE_POST, METHOD_TYPE_PUT } from '../types'
import { getHeadersFromConfig } from '../util/default-util'
import { handleFormDataParams } from '../util/handle-params-util'
import type { Method, MiddleRequestResult } from '../types'

/**
 * 请求对象
 */
class RequestModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends BaseRequestModel<T, RESPONSE_TYPE> {
  /**
   * 构造方法
   * @param method 请求方法
   * @param api 请求地址
   * @param data 请求参数
   * @param config 配置信息
   */
  constructor(method: Method, api: string, data?: QueryType, config?: RequestConfig<T, RESPONSE_TYPE>) {
    const oldConfig = getRequestConfig<T, RESPONSE_TYPE>()
    if (config)
      super(method, api, data, handleMergeRequestConfig(oldConfig, config))
    else
      super(method, api, data, oldConfig)
  }

  /**
   * 请求之前处理的内容
   * @param model 请求对象
   * @param config 配置信息
   */
  before(model: BaseRequestModel<T, RESPONSE_TYPE>, config: RequestConfig<T, RESPONSE_TYPE>): MiddleRequestResult<T, RESPONSE_TYPE> {
    return {
      type: 'continue',
      model,
      config,
    }
  }

  /**
   * 请求之后处理的内容
   * @param model 请求对象
   * @param config 配置信息
   * @param response 返回值
   */
  after(model: BaseRequestModel<T, RESPONSE_TYPE>, config: RequestConfig<T, RESPONSE_TYPE>, response: RESPONSE_TYPE): Omit<MiddleRequestResult<T, RESPONSE_TYPE>, 'type'> {
    return {
      model,
      config,
      response,
    }
  }

  /**
   * 自定义参数处理方法
   * @param config 请求信息
   * @param requestConfig 请求配置信息
   */
  protected setCustomConfig(config: any, requestConfig: RequestConfig<T, RESPONSE_TYPE>): void {
    if (requestConfig.contentType === 'application/x-www-form-urlencoded') {
      config.params = this.data
      return
    }
    if (this.method === METHOD_TYPE_POST || this.method === METHOD_TYPE_PUT || this.method === METHOD_TYPE_PATCH || this.method === METHOD_TYPE_DELETE) {
      if (config.headers)
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'

      config.data = this.data
    }
    else {
      config.params = this.data
    }
    if (requestConfig.paramType === 'form')
      handleFormDataParams(this.data, config)
  }

  /**
   * 请求方法
   * @param config 配置信息（可以直接更换为最终的请求配置）
   */
  request(config?: RequestConfig<T, RESPONSE_TYPE>): Promise<RESPONSE_TYPE> {
    // 继续处理
    const useModel = this as BaseRequestModel<T, RESPONSE_TYPE>
    const uesConfig = (config || this.config)
    // 前置处理
    const before = this.before(useModel, uesConfig)
    if (before.type === 'done')
      return Promise.resolve(before.response as RESPONSE_TYPE)
    // 执行信息
    return new Promise((resolve, reject) => {
      // 获取请求配置信息
      const requestConfig: RequestConfig<T, RESPONSE_TYPE> = { ...this.getConfig(), ...(config || {}) }
      // 设置请求额外信息
      const extra: RequestExtra = {
        method: this.getMethod(),
        api: this.getApi(),
        data: { ...this.getData() },
      }
      // 获取请求头信息
      const headers: Record<string, string> = getHeadersFromConfig(extra, requestConfig)
      const baseUrlFlag = this.getApi().startsWith('http')
      // 组合请求信息
      const requestData: Record<string, any> = {
        baseURL: baseUrlFlag ? '' : requestConfig.baseUrl,
        method: this.getMethod(),
        url: this.getApi(),
        headers,
        timeout: requestConfig.timeout,
      }
      if (requestConfig.onUploadProgress)
        requestData.onUploadProgress = requestConfig.onUploadProgress
      // 处理最后的配置
      this.setCustomConfig(requestData, { ...requestConfig })
      if (this.requestMethod) {
        // 请求后处理的方法
        const afterArray = requestConfig.after?.() || []
        // 执行请求方法
        this.requestMethod<T, RESPONSE_TYPE>(useModel, requestData, uesConfig).then((result: TempResponseType<T, RESPONSE_TYPE>) => {
          if (!result.response || result.type === 'error') {
            afterArray.forEach(m => m('error', extra, result.response as RESPONSE_TYPE))
            reject(new Error('请求异常未处理'))
          }
          else {
            afterArray.forEach(m => m('success', extra, result.response as RESPONSE_TYPE))
            // 后置处理
            const afterData = this.after(useModel, uesConfig, result.response).response as RESPONSE_TYPE
            // 请求成功最后处理的信息
            config?.successFinally?.(afterData)
            // 返回数据
            resolve(afterData)
          }
        })
      }
      else {
        console.error('请求工具未定义')
      }
    })
  }
}

export {
  RequestModel,
}
