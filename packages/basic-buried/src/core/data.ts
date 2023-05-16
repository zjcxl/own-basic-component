'use strict'

/**
 * 基础的认证信息
 */
export const AUTH_INFO: {
  id: string
  name: string
} & Record<string, string> = {
  id: '',
  name: '',
}

/**
 * 基础数据的对象
 */
export const BASIC_INFO: { appKey: string } & Record<string, string> = {
  appKey: '',
}

/**
 * 扩展数据的对象
 */
export const EXTRA_INFO: Record<string, string> = {}

/**
 * 发送数据的地址
 */
export const SEND_URLS: string[] = []

/**
 * 获取默认的参数
 */
export function getDefaultParams(): Record<string, string> {
  return {
    // 网页基础信息
    origin: window.location.origin,
    pathname: window.location.pathname,
    pageTitle: document.title,
    // 语言
    language: window.navigator.language.toLowerCase(),
    // 时区
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeZoneOffset: `${new Date().getTimezoneOffset() / 60}`,
    // 页面大小
    width: `${document.documentElement.clientWidth}`,
    height: `${document.documentElement.clientHeight}`,
  }
}

/**
 * 清空扩展信息
 */
export function clearExtraInfo() {
  for (const key in EXTRA_INFO)
    delete EXTRA_INFO[key]
}

/**
 * 清空认证信息
 */
export function clearAuthInfo() {
  for (const key in AUTH_INFO)
    delete AUTH_INFO[key]
}
