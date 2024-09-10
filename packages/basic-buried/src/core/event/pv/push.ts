import type { SimpleBuriedPvModelValue, SimpleExtraInfoPvType } from '../../type'

/**
 * 数据信息
 */
let EXTRA_INFO = {} as SimpleExtraInfoPvType

/**
 * 插入推送数据
 * @param key
 * @param value
 */
export function push<T = string>(key: T | SimpleExtraInfoPvType, value?: SimpleBuriedPvModelValue<T>): void {
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
  EXTRA_INFO = {}
}

/**
 * 获取扩展信息
 */
export function getExtraInfo(): SimpleExtraInfoPvType {
  return EXTRA_INFO
}
