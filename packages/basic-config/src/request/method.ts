import { defaultConfig as DEFAULT_REQUEST_CONFIG } from './default'
import type { MergeType, RequestConfig, ResultModel } from './types'

/**
 * 合并配置的方法
 * <table>
 *   <tr>
 *     <th>参数</th>
 *     <th>replace</th>
 *     <th>merge</th>
 *   </tr>
 *   <tr>
 *     <td>success</td>
 *     <td>直接替换</td>
 *     <td>进行合并</td>
 *   </tr>
 *   <tr>
 *     <td>header</td>
 *     <td>直接替换</td>
 *     <td>进行合并</td>
 *   </tr>
 *   <tr>
 *     <td>after</td>
 *     <td>直接替换</td>
 *     <td>进行合并</td>
 *   </tr>
 *   <tr>
 *     <td>exceptionHandleMap</td>
 *     <td>直接替换</td>
 *     <td>进行合并</td>
 *   </tr>
 * </table>
 *
 * @param origin
 * @param config
 * @param type
 */
export function handleMergeRequestConfig<T1 = any, RESPONSE_TYPE1 = ResultModel<T1>, T2 = any, RESPONSE_TYPE2 = ResultModel<T2>, T3 = any, RESPONSE_TYPE3 = ResultModel<T3>>(origin: RequestConfig<T1, RESPONSE_TYPE1>, config: RequestConfig<T2, RESPONSE_TYPE2>, type: MergeType = 'replace'): RequestConfig<T3, RESPONSE_TYPE3> {
  if (type === 'replace') {
    return {
      ...origin,
      ...config,
    } as any as RequestConfig<T3, RESPONSE_TYPE3>
  }
  const success = [...(origin.success || []), ...(config.success || [])]
  // 请求头配置
  const header1 = origin.header?.() || {}
  const header2 = config.header?.() || {}
  // 异常处理
  const exceptionHandleMap1 = origin.exceptionHandleMap?.() || {}
  const exceptionHandleMap2 = config.exceptionHandleMap?.() || {}
  // 请求后处理
  const afterHandleArray1 = origin.after?.() || []
  const afterHandleArray2 = config.after?.() || []
  return {
    ...origin,
    ...config,
    success,
    header: () => ({ ...header1, ...header2 }),
    after: () => [...afterHandleArray1, ...afterHandleArray2],
    exceptionHandleMap: () => ({ ...exceptionHandleMap1, ...exceptionHandleMap2 }),
  } as any as RequestConfig<T3, RESPONSE_TYPE3>
}

/**
 * 合并处理继承配置信息
 * @param config
 */
export function handleMergeExtendConfig<T = any, RESPONSE_TYPE = ResultModel<T>>(config?: RequestConfig<T, RESPONSE_TYPE>): RequestConfig<T, RESPONSE_TYPE> {
  if (!config)
    return {} as any as RequestConfig<T, RESPONSE_TYPE>
  if (!config.extends || config.extends.length === 0)
    return config
  const array = [...config.extends]
  const resultConfig: RequestConfig<T, RESPONSE_TYPE> = array.reduce((value, target) => {
    return handleMergeRequestConfig<T, RESPONSE_TYPE, T, RESPONSE_TYPE, T, RESPONSE_TYPE>(value, handleMergeExtendConfig<T, RESPONSE_TYPE>(target), config.mergeType || 'replace')
  }, {} as RequestConfig<T, RESPONSE_TYPE>)
  return {
    ...resultConfig,
    // 当前的配置优先级最高
    ...config,
  }
}

/**
 * 最终的配置信息
 */
let resultConfig: RequestConfig = DEFAULT_REQUEST_CONFIG

/**
 * 设置请求配置信息
 * @param config 配置信息
 */
export function setResultConfig<T = any, RESPONSE_TYPE = ResultModel<T>>(config: RequestConfig<T, RESPONSE_TYPE>) {
  resultConfig = config as any as RequestConfig
}

/**
 * 获取请求配置信息
 */
export function getResultConfig(): RequestConfig {
  return resultConfig
}
