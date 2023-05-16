'use strict'

import type { EventType } from './types'

/**
 * 扩展数据的对象
 */
export const EXTRA_INFO: Record<EventType, Record<string, string>> = {
  pv: {},
  ae: {},
  st: {},
}

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function pv(key: string, value: any) {
  EXTRA_INFO.pv[key] = value
}

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function ae(key: string, value: any) {
  EXTRA_INFO.ae[key] = value
}

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function st(key: string, value: any) {
  EXTRA_INFO.st[key] = value
}

/**
 * 清空扩展信息
 * @param type 事件类型
 */
export function clearExtraInfo(type: EventType) {
  EXTRA_INFO[type] = {}
}
