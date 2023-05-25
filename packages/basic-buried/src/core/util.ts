'use strict'

import { getAuthInfo } from './auth'
import { getBasicInfo, getDefaultParams } from './data'
import type { BuriedModelType, EventType } from './type'

/**
 * 发送数据
 * @param urls 发送数据的地址
 * @param params 发送的参数
 */
export function send(urls: string[] = [], params = '') {
  urls.forEach((url) => {
    // 执行发送请求
    fetch(`${url}?${params}`, {
      mode: 'cors',
    })
      .then()
  })
}

/**
 * map转换成参数
 * @param type 推送事件类型
 * @param extra 扩展信息
 */
export function resolveToUrlSearchParams<T>(
  type: EventType,
  extra: Partial<T>,
): URLSearchParams {
  // 合并数据
  const dataMap: BuriedModelType<Partial<T>> = {
    // 基础信息
    ...getBasicInfo(),
    // 扩展信息
    ...extra,
    // 埋点类型
    type,
    // 认证信息
    ...getAuthInfo(),
    // 默认基础信息
    ...getDefaultParams(),
  }
  // 转换信息
  const params = new URLSearchParams()
  for (const key in dataMap)
    params.append(key, dataMap[key] || '')
  return params
}
