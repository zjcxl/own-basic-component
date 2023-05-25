'use strict'

import { getUrl } from '../../data'
import type { SimpleExtraInfoOpType } from '../../type'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'

/**
 * page view 页面浏览
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoOpType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoOpType>('op', {
    ...getExtraInfo(),
    ...data,
  })
  // 执行发送请求
  resultSend(getUrl('op'), params.toString())
  clear()
}
