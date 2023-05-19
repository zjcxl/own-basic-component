'use strict'

import { EXTRA_INFO, clearExtraInfo } from './push'
import { preSend } from './util'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function pv(params: Record<string, string> = {}) {
  preSend('pv', { ...EXTRA_INFO.pv, ...params })
  clearExtraInfo('pv')
}

/**
 * action event 点击事件
 * params 事件参数
 */
export function ae(params: Record<string, string> = {}) {
  preSend('ae', { ...EXTRA_INFO.ae, ...params })
  clearExtraInfo('ae')
}

/**
 * stop time 停留时间
 * params 事件参数
 */
export function st(params: Record<string, string> = {}) {
  preSend('st', { ...EXTRA_INFO.st, ...params })
  clearExtraInfo('st')
}
