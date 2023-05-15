'use strict'

import { EXTRA_INFO } from './data'

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function pv(key: string, value: any) {
  EXTRA_INFO[key] = value
}

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function ae(key: string, value: any) {
  EXTRA_INFO[key] = value
}

/**
 * 追加推送信息
 * @param key 推送信息的key
 * @param value 推送信息的value
 */
export function st(key: string, value: any) {
  EXTRA_INFO[key] = value
}
