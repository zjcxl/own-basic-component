'use strict'

import type { BaseInfoModel } from '../type'

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
  }
}