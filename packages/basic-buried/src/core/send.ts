'use strict'

import { preSend } from './util'

/**
 * page view 页面浏览
 */
export function pv() {
  preSend('pv', {})
}

/**
 * action event 点击事件
 */
export function ae() {
  preSend('ae', {})
}

/**
 * stop time 停留时间
 */
export function st() {
  preSend('st', {})
}
