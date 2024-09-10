import type { LoadingBarConfig } from '../loading/types'
import type { MaskUtilConfig } from '../mask/types'
import type { MessageUtilConfig } from '../message/types'
import type { BaseRequestModel, RequestConfig, ResultModel } from '../request/types'

/**
 * 临时请求对象
 */
export interface TempResponseType<T = any, RESPONSE_TYPE = ResultModel<T>> {
  type: 'success' | 'error'
  response?: RESPONSE_TYPE
}

/**
 * 临时请求对象
 */
export type RequestMethod = <T = any, RESPONSE_TYPE = ResultModel<T>, CONFIG = object>
(
  requestModel: BaseRequestModel<T, RESPONSE_TYPE>,
  requestData: CONFIG,
  config: RequestConfig<T, RESPONSE_TYPE>,
) => Promise<TempResponseType<T, RESPONSE_TYPE>>

export interface ProjectConfig {
  /**
   * 请求前缀（此处设置不会调用全局配置）
   */
  baseUrl?: string
  /**
   * 遮罩层配置
   */
  mask?: MaskUtilConfig
  /**
   * 消息配置
   */
  message?: MessageUtilConfig
  /**
   * 请求工具配置
   */
  requestMethod?: RequestMethod
  /**
   * 请求信息配置
   */
  request?: RequestConfig
  /**
   * loadingBar配置
   */
  loading?: LoadingBarConfig
}
