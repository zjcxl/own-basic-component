import { defineLoadingBarConfig } from '../loading'
import { defineMaskUtilConfig } from '../mask'
import { defineMessageConfig } from '../message'
import { defineRequestConfig } from '../request'
import type { ProjectConfig } from './types'

/**
 * 默认的配置信息
 */
const defaultConfig: ProjectConfig = {
  baseUrl: '',
}

// 定义的配置对象
let DEFAULT_CONFIG: ProjectConfig = defaultConfig

/**
 * 定义项目的配置信息
 * @param config 配置信息
 */
export function defineProjectConfig(config: ProjectConfig): ProjectConfig {
  DEFAULT_CONFIG = config
  // 如果有配置baseUrl信息，需要先设置一次请求配置
  if (config.baseUrl) {
    defineRequestConfig({
      baseUrl: config.baseUrl,
    })
  }
  // 遮罩层配置信息
  if (config.mask)
    defineMaskUtilConfig(config.mask)
  // 消息配置信息
  if (config.message)
    defineMessageConfig(config.message)
  // 请求配置信息
  if (config.request)
    defineRequestConfig(config.request)
  // 请求配置信息
  if (config.loading)
    defineLoadingBarConfig(config.loading)
  return config
}

/**
 * 获取项目配置信息
 */
export function getProjectConfig() {
  return DEFAULT_CONFIG
}
