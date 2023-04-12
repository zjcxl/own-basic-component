'use strict'

import { getResultConfig, setResultConfig } from './method'
import type { MessageUtilConfig } from './types'

/**
 * 定义message的配置
 * @param config 配置信息
 */
export function defineMessageConfig<ContentType = string, ReturnType = void>(config: Partial<MessageUtilConfig<ContentType, ReturnType>>) {
  setResultConfig(config)
}

/**
 * 获取消息配置
 */
export function getMessageConfig<ContentType = string, ReturnType = void>(): Required<MessageUtilConfig<ContentType, ReturnType>> {
  return getResultConfig()
}
