'use strict'

import type { SimpleBuriedStModelValue, SimpleExtraInfoStType } from '../../type'

/**
 * 数据信息
 */
let EXTRA_INFO = {
  stayTime: 0,
} as SimpleExtraInfoStType

/**
 * 插入推送数据
 * @param key
 * @param value
 */
export function push<T extends string>(key: T | SimpleExtraInfoStType, value: SimpleBuriedStModelValue<T>): void {
  if (typeof key === 'string') {
    if (value !== undefined)
      EXTRA_INFO[key] = value
  }
  else {
    EXTRA_INFO = {
      ...EXTRA_INFO,
      ...key,
    }
  }
}

/**
 * 清空扩展信息
 */
export function clear(): void {
  EXTRA_INFO = {
    stayTime: 0,
  } as SimpleExtraInfoStType
}

/**
 * 获取扩展信息
 */
export function getExtraInfo(): SimpleExtraInfoStType {
  return EXTRA_INFO
}
