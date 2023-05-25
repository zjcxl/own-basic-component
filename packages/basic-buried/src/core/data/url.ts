'use strict'

import type { EventType } from '../type'

/**
 * 默认的发送地址
 */
const DEFAULT_SEND_URL_MAP: Record<EventType, string> = {
  pv: 'https://buried.base.log.dct99.com:2028/api/push/pv',
  ae: 'https://buried.base.log.dct99.com:2028/api/push/ae',
  st: 'https://buried.base.log.dct99.com:2028/api/push/st',
  op: 'https://buried.base.log.dct99.com:2028/api/push/op',
  custom: 'https://buried.base.log.dct99.com:2028/api/push/custom',
}

/**
 * 发送数据的地址
 */
const SEND_URL_MAP: Record<EventType, string[]> = {
  pv: [],
  ae: [],
  st: [],
  op: [],
  custom: [],
}

/**
 * 设置推送地址信息
 * @param type
 * @param url
 */
export function setUrl(type: EventType, ...url: string[]) {
  SEND_URL_MAP[type] = url
}

/**
 * 获取推送的地址
 * @param type
 */
export function getUrl(type: EventType): string[] {
  return SEND_URL_MAP[type] || [DEFAULT_SEND_URL_MAP[type]] || []
}
