'use strict'

import type { EventType } from './types'

/**
 * 基础的认证信息
 */
export const AUTH_INFO: {
  userId: string
  userName: string
} & Record<string, string> = {
  userId: '',
  userName: '',
}

/**
 * 基础数据的对象
 */
export const BASIC_INFO: { appKey: string } & Record<string, string> = {
  appKey: '',
}

/**
 * 发送数据的地址
 */
export const SEND_URL_MAP: Record<EventType, string[]> = {
  pv: [],
  ae: [],
  st: [],
}

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
    // 设备信息
    devicePixelRatio: `${window.devicePixelRatio}`,
    // 浏览器信息
    userAgent: window.navigator.userAgent,
    // 网络信息
    online: `${window.navigator.onLine}`,
    // 屏幕信息
    screen: `${window.screen.width}x${window.screen.height}`,
    screenColorDepth: `${window.screen.colorDepth}`,
    screenPixelDepth: `${window.screen.pixelDepth}`,
  }
}

/**
 * 清空认证信息
 */
export function clearAuthInfo() {
  for (const key in AUTH_INFO)
    delete AUTH_INFO[key]
}
