'use strict'

import { AUTH_INFO, BASIC_INFO, SEND_URLS, clearExtraInfo, getDefaultParams } from './data'

/**
 * 发送数据包
 * @param type 类型 pv ae st
 * @param extra 扩展信息
 */
export function preSend(type: string, extra: Record<string, any> = {}) {
  // 构造参数列表
  const params = toParams({
    ...extra,
    // 埋点类型
    type,
    // 认证信息
    ...AUTH_INFO,
    // 基础信息
    ...BASIC_INFO,
    // 默认基础信息
    ...getDefaultParams(),
  })
  // 清除所有的扩展信息
  clearExtraInfo()
  // 执行发送请求
  send(SEND_URLS, params.toString())
}

/**
 * 发送数据
 * @param urls 发送数据的地址
 * @param params 发送的参数
 */
function send(urls = ['/api'], params = '') {
  urls.forEach((url) => {
    // 执行发送请求
    fetch(`${url}/?${params}`, {
      mode: 'cors',
    })
      .then()
  })
}

/**
 * map转换成参数
 * @param map 参数map
 */
function toParams(map: Record<string, any>) {
  const params = new URLSearchParams()
  for (const key in map)
    params.append(key, map[key])
  return params
}
