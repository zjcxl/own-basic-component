'use strict'

import type { AppInfoModel } from '../type'

/**
 * 基础数据的对象
 */
let BASIC_INFO: AppInfoModel & Record<string, string> = {
  appKey: '',
}

/**
 * 设置appKey信息
 * @param appKey
 */
export function setAppKey(appKey: string): void {
  BASIC_INFO.appKey = appKey
}

/**
 * 设置全局信息
 */
export function setGlobalInfo(data: Omit<Record<string, string>, 'appKey'>): void {
  const appKey = BASIC_INFO.appKey
  BASIC_INFO = {
    ...data,
    appKey,
  }
}

/**
 * 获取基础信息
 */
export function getBasicInfo(): AppInfoModel & Record<string, string> {
  return {
    ...BASIC_INFO,
  }
}
