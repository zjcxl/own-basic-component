'use strict'

import { clear as clearAe, push as pushAe } from './ae/push'
import { send as sendAe } from './ae/send'

import { clear as clearPv, push as pushPv } from './pv/push'
import { send as sendPv } from './pv/send'

import { clear as clearSt, push as pushSt } from './st/push'
import { send as sendSt } from './st/send'

import { clear as clearOp, push as pushOp } from './op/push'
import { send as sendOp } from './op/send'

import { clear as clearCustom, push as pushCustom } from './custom/push'
import { send as sendCustom } from './custom/send'

/**
 * 注入参数到所有的事件
 * @param data
 */
export function pushAll(data: Record<string, any>): void {
  pushAe(data)
  pushPv(data)
  pushSt(data)
  pushOp(data)
  pushCustom(data)
}

/**
 * 清空所有的事件参数
 */
export function clearAll(): void {
  clearAe()
  clearPv()
  clearSt()
  clearOp()
  clearCustom()
}

export {
  sendPv,
  sendAe,
  sendSt,
  sendOp,
  sendCustom,
  pushAe,
  pushPv,
  pushSt,
  pushOp,
  pushCustom,
  clearAe,
  clearPv,
  clearSt,
  clearOp,
  clearCustom,
}
