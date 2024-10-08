import { setAuthInfo } from './auth'
import { getEventTypeArray, setAppKey, setGlobalInfo, setUrl } from './data'
import type { EventType } from './type'

/**
 * 初始化
 * @param appKey 应用key（唯一标识）
 * @param params 初始化的参数
 */
export function core(appKey: string, params?: Record<string, string>) {
  if (params)
    setGlobalInfo(params)
  setAppKey(appKey)
}

/**
 * 初始化发送数据的地址
 * @param params 发送数据的地址
 */
export function url(params: Partial<Record<EventType, string[]>>) {
  const array = getEventTypeArray()
  array.forEach(type => setUrl(type, ...params[type] || []))
}

/**
 * 认证初始化
 * @param userId 用户id
 * @param userName 用户名
 * @param params 认证的参数
 */
export function auth(userId: string, userName: string, params?: Record<string, string>) {
  setAuthInfo({
    userId,
    userName,
    ...params || {},
  })
}
