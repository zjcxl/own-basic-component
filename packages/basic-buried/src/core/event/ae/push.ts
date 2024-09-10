import type { SimpleBuriedAeModelValue, SimpleExtraInfoAeType } from '../../type'

/**
 * 数据信息
 */
let EXTRA_INFO: SimpleExtraInfoAeType = {
  actionType: '',
  actionName: '',
}

/**
 * 插入推送数据
 * @param key
 * @param value
 */
export function push<T = string>(key: T | SimpleExtraInfoAeType, value?: SimpleBuriedAeModelValue<T>): void {
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
    actionType: '',
    actionName: '',
  }
}

/**
 * 获取扩展信息
 */
export function getExtraInfo(): SimpleExtraInfoAeType {
  return EXTRA_INFO
}
