'use strict'

import { defaultMessageConfig } from './default'
import type { MessageUtilConfig } from './types'

// 最终配置信息
let resultConfig: Required<MessageUtilConfig<any, any>> = defaultMessageConfig

/**
 * 设置最终的消息配置
 * @param config 配置信息
 */
export const setResultConfig = <ContentType = string, ReturnType = void>(config: Partial<MessageUtilConfig<ContentType, ReturnType>>) => {
  resultConfig = {
    ...defaultMessageConfig,
    ...config,
  }
}

/**
 * 获取最终的消息配置
 */
export const getResultConfig = <ContentType = string, ReturnType = void>(): Required<MessageUtilConfig<ContentType, ReturnType>> => {
  return resultConfig
}
