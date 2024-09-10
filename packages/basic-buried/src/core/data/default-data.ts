import platform from 'platform'
import type { BaseInfoModel, EventType } from '../type'
import type { BowserInfo } from './types'

/**
 * 获取客户端的平台信息
 */
const clientPlatform = platform.parse(navigator.userAgent)

export const AE: EventType = 'ae'
export const OP: EventType = 'op'
export const PV: EventType = 'pv'
export const ST: EventType = 'st'
export const CUSTOM: EventType = 'custom'

/**
 * 事件类型数组
 */
const EVENT_TYPE_ARRAY: EventType[] = [AE, OP, PV, ST, CUSTOM]

/**
 * 浏览器的基本信息
 */
const bowserInfo: BowserInfo = {
  bowserDeviceType: clientPlatform.product || '',
  bowserName: clientPlatform.name || '',
  bowserOsFamily: clientPlatform.os?.family || '',
  bowserOsVersion: clientPlatform.os?.version || '',
  bowserVersion: clientPlatform.version || '',
}

/**
 * 获取默认的参数
 */
export function getDefaultParams(): BaseInfoModel {
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
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    // 设备信息
    devicePixelRatio: `${window.devicePixelRatio}`,
    // 浏览器信息
    userAgent: window.navigator.userAgent,
    // 网络信息
    online: `${window.navigator.onLine}`,
    // 屏幕信息
    screen: `${window.screen.width}x${window.screen.height}`,
    // 浏览器信息
    ...bowserInfo,
  }
}

/**
 * 获取事件类型数组
 */
export function getEventTypeArray(): EventType[] {
  return [...EVENT_TYPE_ARRAY]
}
