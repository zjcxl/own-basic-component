'use strict'

import type { Method, QueryType, RequestConfig, RequestExtra, ResultModel } from '@own-basic-component/config'
import { getRequestConfig } from '@own-basic-component/config'

/**
 * 从配置中获取请求头信息
 * @param extra 额外数据
 * @param config 配置信息
 */
export function getHeadersFromConfig<T = any, RESPONSE_TYPE = ResultModel<T>>(extra: {
  method: Method
  api: string
  data: QueryType
}, config: RequestConfig<T, RESPONSE_TYPE>): Record<string, string> {
  const headers: Record<string, string> = {}
  if (config.header) {
    const headerMap = config.header()
    for (const item in headerMap)
      headers[item] = headerMap[item](extra)
  }
  return headers
}

/**
 * 默认的请求额外信息
 */
const defaultRequestExtra: RequestExtra = {
  method: 'GET',
  api: '',
  data: {},
}

/**
 * 获取请求头信息
 */
export function getRequestHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  const headerMap = getRequestConfig()?.header?.()
  for (const item in headerMap)
    headers[item] = headerMap[item](defaultRequestExtra)

  return headers
}
