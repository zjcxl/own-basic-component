import { getRequestConfig } from '@own-basic-component/config'
import type { BaseRequestModel, RequestConfig, ResultModel } from '@own-basic-component/config'
import { RequestModel } from '../core'
import { METHOD_TYPE_POST } from '../types'
import { handleFormDataParams } from '../util/handle-params-util'
import type { MiddleRequestResult } from '../types'

/**
 * 文件上传类 默认文件字段为file
 */
export class RequestFileModel<T = any, RESPONSE_TYPE = ResultModel<T>> extends RequestModel<T, RESPONSE_TYPE> {
  constructor(api: string, file: File, field = 'file', config: RequestConfig<T, RESPONSE_TYPE> = getRequestConfig<T, RESPONSE_TYPE>()) {
    super(METHOD_TYPE_POST, api, { [field]: file }, config)
  }

  /**
   * 请求之前处理的内容
   * @param model 请求对象
   * @param config 配置信息
   */
  before(model: BaseRequestModel<T, RESPONSE_TYPE>, config: RequestConfig<T, RESPONSE_TYPE>): MiddleRequestResult<T, RESPONSE_TYPE> {
    return super.before(model, config)
  }

  /**
   * 最后的请求信息处理
   * @param config 请求信息
   * @param requestConfig 请求配置信息
   */

  protected setCustomConfig(config: any, requestConfig: RequestConfig<T, RESPONSE_TYPE>) {
    config.method = METHOD_TYPE_POST
    // 设置请求头信息
    if (config.headers)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    handleFormDataParams(this.data, requestConfig)
  }
}
