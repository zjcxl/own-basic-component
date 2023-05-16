'use strict'

import { EXTRA_INFO, clearExtraInfo } from './push'
import { preSend } from './util'

/**
 * page view 页面浏览
 */
export function pv() {
  preSend('pv', { ...EXTRA_INFO.pv })
  clearExtraInfo('pv')
}

/**
 * action event 点击事件
 */
export function ae() {
  preSend('ae', { ...EXTRA_INFO.ae })
  clearExtraInfo('ae')
}

/**
 * stop time 停留时间
 */
export function st() {
  preSend('st', { ...EXTRA_INFO.st })
  clearExtraInfo('st')
}
