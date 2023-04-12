'use strict'

import type { Method, QueryType, RequestConfig, ResultModel } from '@own-basic-component/config'

/**
 * 从配置中获取请求头信息
 * @param extra 额外数据
 * @param config 配置信息
 */
export function getHeadersFromConfig<T = any, RESPONSE_TYPE = ResultModel<T>>(extra: {
  method: Method
  api: string
  data: QueryType
},
config: RequestConfig<T, RESPONSE_TYPE>): Record<string, string> {
  const headers: Record<string, string> = {}
  if (config.header) {
    const headerMap = config.header()
    for (const item in headerMap)
      headers[item] = headerMap[item](extra)
  }
  return headers
}
