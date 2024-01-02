'use strict'

import { defaultMaskConfig as DEFAULT_CONFIG } from './default'
import type { MaskConfig, MaskUtilConfig, MaskUtilMethodConfig } from './types'

const DEFAULT_MASK_KEY = 'a-mask'

// 遮罩层工具最终配置
let resultConfig: MaskUtilConfig<any> = DEFAULT_CONFIG

/**
 * 遮罩层逻辑map
 */
const NUMBER_MAP: Record<string, {
  count: number
  container?: HTMLElement | null
}> = {}

/**
 * 初始化计数键值对
 * @param key
 */
function init(key = DEFAULT_MASK_KEY) {
  if (!NUMBER_MAP[key]) {
    NUMBER_MAP[key] = {
      count: 0,
    }
  }
}

/**
 * 设置遮罩层的最终配置信息
 * @param config 遮罩层的配置信息
 */
export function setResultConfig<T = HTMLElement>(config: MaskUtilConfig<T>) {
  resultConfig = config
}

/**
 * 父级遮罩包裹层
 */
export const parentMaskConfig: MaskUtilMethodConfig = {
  open(config: MaskConfig): void {
    const key = config.key || DEFAULT_MASK_KEY
    init(key)
    if (NUMBER_MAP[key].count++ === 0) {
      resultConfig.open(config, (item: any) => {
        NUMBER_MAP[key].container = item
      })
    }
  },
  close(key: string, num = 1): void {
    const resultKey = key || DEFAULT_MASK_KEY
    NUMBER_MAP[resultKey].count -= num
    if (NUMBER_MAP[resultKey].count <= 0) {
      NUMBER_MAP[resultKey].count = 0
      resultConfig.close(NUMBER_MAP[resultKey].container)
      // 删除层数缓存
      delete NUMBER_MAP[resultKey]
    }
  },
}
