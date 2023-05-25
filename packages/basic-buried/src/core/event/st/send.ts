'use strict'

import { ST, getUrl } from '../../data'
import type { SimpleExtraInfoStType } from '../../type'
import { resolveToUrlSearchParams, send as resultSend } from '../../util'
import { clear, getExtraInfo } from './push'

/**
 * 页面停留
 * params 事件参数
 */
export function send(data?: Partial<SimpleExtraInfoStType>) {
  const params = resolveToUrlSearchParams<SimpleExtraInfoStType>(ST, {
    ...getExtraInfo(),
    ...data || {},
  })
  // 执行发送请求
  resultSend(getUrl(ST), params.toString())
  clear()
}
