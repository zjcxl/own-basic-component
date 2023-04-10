'use strict'

import { getResultConfig, handleMergeExtendConfig, handleMergeRequestConfig, setResultConfig } from './method'
import type { RequestConfig, ResultModel } from './types'

/**
 * 获取请求配置
 * @param config
 */
export const getRequestConfig = <T = any, RESPONSE_TYPE = ResultModel<T>>(config?: RequestConfig<T, RESPONSE_TYPE>): RequestConfig<T, RESPONSE_TYPE> => {
  const resultConfig = getResultConfig()
  return {
    // 获取到的配置信息可能是有其他继承信息的
    ...handleMergeExtendConfig(resultConfig),
    // 最终配置
    ...handleMergeExtendConfig(config),
  } as any as RequestConfig<T, RESPONSE_TYPE>
}

/**
 * 定义请求的配置信息
 * @param config
 */
export function defineRequestConfig<T = any, RESPONSE_TYPE = ResultModel<T>>(config: RequestConfig<T, RESPONSE_TYPE>): RequestConfig<T, RESPONSE_TYPE> {
  // 获取最后的配置信息
  const lastConfig = getResultConfig() as any as RequestConfig<T, RESPONSE_TYPE>
  // 合并设置最新的信息
  const resultConfig = handleMergeRequestConfig<T, RESPONSE_TYPE, T, RESPONSE_TYPE, T, RESPONSE_TYPE>(lastConfig, config, config.mergeType || 'replace')
  // 把最新的信息设置回去
  setResultConfig(resultConfig)
  // 配置返回
  return resultConfig
}
