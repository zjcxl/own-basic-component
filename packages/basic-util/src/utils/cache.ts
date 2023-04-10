'use strict'

/**
 * 路由对象信息
 */
const cache: Record<string, any> = {}

/**
 * 设置信息
 * @param key 键
 * @param item 信息
 */
export const setCache = <T = any>(key: string, item: T) => {
  cache[key] = item
}

/**
 * 获取信息
 * @param key 键
 */
export const getCache = <T = any>(key: string) => cache[key] as T
