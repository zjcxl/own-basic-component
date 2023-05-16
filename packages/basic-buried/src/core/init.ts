'use strict'

import { AUTH_INFO, BASIC_INFO, SEND_URL_MAP } from './data'
import type { EventType } from './types'

/**
 * 初始化
 * @param appKey 应用key（唯一标识）
 * @param params 初始化的参数
 */
export function core(appKey: string, params?: Record<string, string>) {
  if (params) {
    for (const paramsKey in params)
      BASIC_INFO[paramsKey] = params[paramsKey]
  }
  BASIC_INFO.appKey = appKey
}

/**
 * 初始化发送数据的地址
 * @param params 发送数据的地址
 */
export function url(params: Record<EventType, string[]>) {
  SEND_URL_MAP.pv = params.pv || []
  SEND_URL_MAP.ae = params.ae || []
  SEND_URL_MAP.st = params.st || []
}

/**
 * 认证初始化
 * @param id 用户id
 * @param name 用户名
 * @param params 认证的参数
 */
export function auth(id: string, name: string, params?: Record<string, string>) {
  if (params) {
    for (const paramsKey in params)
      AUTH_INFO[paramsKey] = params[paramsKey]
  }
  AUTH_INFO.id = id
  AUTH_INFO.name = name
}
