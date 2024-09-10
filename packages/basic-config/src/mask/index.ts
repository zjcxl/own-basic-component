import { parentMaskConfig as PARENT_MASK_CONFIG, setResultConfig } from './method'
import type { MaskUtilConfig, MaskUtilMethodConfig } from './types'

/**
 * 定义遮罩层的工具
 * @param config 遮罩层的配置信息
 */
export function defineMaskUtilConfig<T = HTMLElement>(config: MaskUtilConfig<T>) {
  setResultConfig(config)
}

/**
 * 使用遮罩层的方法
 */
export function useMask(): MaskUtilMethodConfig {
  return PARENT_MASK_CONFIG
}
