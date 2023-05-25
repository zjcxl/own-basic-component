'use strict'

import type { SimpleBuriedOpModelValue, SimpleExtraInfoOpType } from '../../type'

/**
 * 数据信息
 */
let EXTRA_INFO: SimpleExtraInfoOpType = {
  actionName: '',
}

/**
 * 插入推送数据
 * @param key
 * @param value
 */
export function push<T extends string>(key: T | SimpleExtraInfoOpType, value: SimpleBuriedOpModelValue<T>): void {
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
    actionName: '',
  }
}

/**
 * 获取扩展信息
 */
export function getExtraInfo(): SimpleExtraInfoOpType {
  return EXTRA_INFO
}
