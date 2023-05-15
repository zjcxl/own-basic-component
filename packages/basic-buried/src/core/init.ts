'use strict'

import { AUTH_INFO, BASIC_INFO, SEND_URLS } from './data'

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
 * @param urls 发送数据的地址
 */
export function urls(urls: string[]) {
  SEND_URLS.push(...urls)
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
