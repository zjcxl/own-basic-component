import type { BaseRequestModel, RequestConfig, ResultModel } from '@own-basic-component/config'

/**
 * 中间处理的类型
 */
export interface MiddleRequestResult<T = any, RESPONSE_TYPE = ResultModel<T>> {
  type: 'done' | 'continue'
  model: BaseRequestModel<T, RESPONSE_TYPE>
  config: RequestConfig<T, RESPONSE_TYPE>
  response?: RESPONSE_TYPE
}

// 请求前缀
export const METHOD_TYPE_GET = 'GET'
export const METHOD_TYPE_POST = 'POST'
export const METHOD_TYPE_DELETE = 'DELETE'
export const METHOD_TYPE_PUT = 'PUT'
export const METHOD_TYPE_PATCH = 'PATCH'

export type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
