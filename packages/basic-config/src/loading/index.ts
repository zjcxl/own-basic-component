import { defaultLoadingConfig } from './default'
import type { LoadingBarConfig } from './types'

let DEFAULT_CONFIG: LoadingBarConfig

/**
 * 设置默认的加载条信息
 * @param config 加载条信息
 */
export function defineLoadingBarConfig(config: LoadingBarConfig): LoadingBarConfig {
  DEFAULT_CONFIG = config
  return DEFAULT_CONFIG
}

/**
 * 获取的加载条工具
 */
export function useLoadingBar(): LoadingBarConfig {
  return DEFAULT_CONFIG || defaultLoadingConfig
}
